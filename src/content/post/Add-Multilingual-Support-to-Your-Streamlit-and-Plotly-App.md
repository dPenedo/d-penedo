---
title: "Add Multilingual Support to Your Streamlit and Plotly App"
description: "Step by step guide to translating a Streamlit data app with Plotly charts using a simple JSON-based system."
publishDate: "17 Nov 2025"
tags: ["Python", "Plotly", "Data science", "Translations"]
---


# How to Create Translations in a Python Streamlit Application with Plotly Charts

Streamlit, like other similar frameworks, allows you to build web applications with just Python code and display charts created with Matplotlib or Plotly interactively.

I recently built an interactive data visualization project where users can explore different charts by filtering, hovering, and interacting with them. Once it was finished, I realized it should also include a Basque translation. At first, it seemed tricky because the `app.py` file calls different functions, mappings, and chart generators. But in my case, it turned out to be straightforward — and even helped me refactor the project into a better structure. What could seem like an extra problem actually improved the project by pushing me toward a more _SOLID_ design.

The interactive charts are available on my website in [spanish](https://dpenedo.com/data/es/sociometro-vasco/) and in [basque](https://dpenedo.com/data/es/sociometro-vasco/). Every value of the chart displays in both languages and I could extend it just adding more text on a single JSON file.

## Creating a large `translations.json` file to store all the text

The first step is to create the file in a proper location within the structure. This can also be done with a `.py` file containing a dictionary, but a `.json` file can be reused in the future and is more scalable. It has this structure:

```py
{
  "ES": {
    "page_title": "dPenedo - Sociómetro vasco",
    "main_title": "Análisis del Sociómetro Vasco",
    "go_back_button": "Volver a dpenedo.com (la web principal)",
    "dpenedo_url": "https://dpenedo.com/data/es/sociometro-vasco",
    "warning_min_samples": "⚠️ Muestra insuficiente: {n_responses} respuestas\n\nSe requieren al menos {min_samples} respuestas para mostrar el análisis.\nLa muestra actual, tras aplicar los filtros seleccionados, solo constituye un {percent:.1f}% de la muestra total.\n\nPor favor, ajuste los filtros para incluir más datos.",
    "warning_limited": "⚠️ Muestra limitada: {n_responses} respuestas\n({percent:.1f}% del total)\nLos resultados pueden tener baja representatividad estadística.",

# [....]
  },
  "EUS": {
    "page_title": "dPenedo - Euskal Soziometroa",
    "main_title": "Euskal Soziometroaren analisia",
    "go_back_button": "dpenedo.com-era itzuli (webgune nagusia)",
    "dpenedo_url": "https://dpenedo.com/data/eus/sociometro-vasco",
    "warning_min_samples": "⚠️ Lagina ez da nahikoa: {n_responses} erantzun\n\nGutxienez {min_samples} erantzun behar dira analisia erakusteko.\nAukeratutako iragazkien ondoren dagoen laginak guztizkoaren {percent:.1f}% bakarrik hartzen du.\n\nMesedez, egokitu iragazkiak datu gehiago sartzeko.",
    "warning_limited": "⚠️ Lagina mugatua: {n_responses} erantzun\n({percent:.1f}% guztizkoan)\nEmaitzek ordezkaritza estatistiko txikia izan dezakete.",
  }
}
```

Each text that will be displayed needs to have a translation.

A quick tip: working with these large `json` files can lead to many errors, with missing commas being the most common. I used this command to help with that:

```sh
python -m json.tool ./src/config/translations.json
```

It displays syntax errors if there are any, and if not, it simply displays the JSON file.

## Helpful python functions

I created some helpful functions to work with the `translations.json` file. There are more, but the main ones are a **getter** and a **setter**:

```py
import json
import streamlit as st

# Loads the json file
with open("src/config/translations.json", "r", encoding="utf-8") as f:
    _translations = json.load(f)


def get_translations() -> dict[str, str]:
    """Returns a dictionary with translations depending on the language"""

    if "lang" not in st.session_state:
        params = st.query_params
        if "lang" in params:
            lang_from_url = params["lang"].upper()
            if lang_from_url in _translations:
                st.session_state["lang"] = lang_from_url
            else:
                st.session_state["lang"] = "ES"
        else:
            st.session_state["lang"] = "ES"

    return _translations[st.session_state["lang"]]


def set_language(lang: str) -> None:
    """Change the session language"""
    if lang in _translations:
        st.session_state["lang"] = lang
```

The first function makes `ES` the default language and retrieves the language state from the Streamlit session state. How session state works is well explained in the [official documentation](https://docs.streamlit.io/develop/api-reference/caching-and-state/st.session_state). It returns a dictionary retrieved from the JSON file.

The second one simply sets the language in the session state.

## Implementing the functions in `app.py`

In the main `app.py`, there is a radio selector in a column that allows the user to change the language.

```py
with col2:
    current_lang = st.session_state.get("lang", "ES")
    lang_options = ["ES", "EUS"]
    default_index = lang_options.index(current_lang)

    selected_lang = st.radio(
        " ",
        options=lang_options,
        index=default_index,
        label_visibility="collapsed",
        key="lang_selector",
    )

# Updates the language from the radio button
if selected_lang != st.session_state.get("lang"):
    set_language(selected_lang)
    st.rerun()  # It reruns the app for it
```

If the selected language is the same as the one in the URL, it doesn't do anything; if it's different, it updates the translation.

## How to translate plotly charts

In my case, I was passing some dictionary maps to each chart, and each of them had their own titles, labels, and so on. So all displayed text had to come from a parameter. For example, a bar chart that displays a 0 to 10 chart with colors from blue to red, and a "doesn't know, doesn't answer" option, the chart is used to display. Here is the function:

```py

def generate_0_to_10_bar_chart(
    df: pd.DataFrame,
    question: str,
    chart_title: str,
    x_title: str,
    tag_map: dict,
    percent_label: str,
    count_label: str,
) -> go.Figure:
    ALL_CATEGORIES: list[int] = list(range(12))
    counts_df = get_counts_and_percents(
        df[question], ordered_categories=ALL_CATEGORIES, label_col="valores"
    )

    counts_df["valores_str"] = counts_df["valores"].astype(str)
    counts_df["etiqueta"] = counts_df["valores"].map(tag_map)

    category_order = [str(i) for i in ALL_CATEGORIES]

    fig: go.Figure = px.bar(
        data_frame=counts_df,
        x="valores_str",
        y="porcentaje",
        color="valores_str",
        title=chart_title,
        color_discrete_sequence=red_blue_color_list,
        category_orders={"valores_str": category_order},
        labels={"etiqueta": "Orientación", "porcentaje": percent_label},
        custom_data=["etiqueta", "conteo", "porcentaje"],
    )

    fig.update_layout(
        xaxis=dict(
            title=x_title,
            tickmode="array",
            tickvals=category_order,
            ticktext=[tag_map[i] for i in ALL_CATEGORIES],
            showline=True,
            showgrid=False,
        ),
        yaxis=dict(
            title=percent_label,
            showline=True,
            showgrid=True,
            gridcolor="lightgray",
            zeroline=True,
            zerolinecolor="lightgray",
        ),
        showlegend=False,
    )

    fig = apply_default_layout(fig)
    fig.update_traces(
        hovertemplate=generate_hovertemplate(
            percent_label=percent_label, count_label=count_label
        )
    )

    add_bar_labels(fig, counts_df, "valores_str", "porcentaje")
    return fig
```

All displayed labels come from parameters; the others, like "valores_str" and so on, are not shown to the user—they are internal labels used to create a DataFrame. This is how the function is called:

```py
t = get_translations()
st.subheader(t["tab_political_orientation_title2"])
fig = generate_0_to_10_bar_chart(
    df=df_filtered,
    question="p32",
    chart_title=t["tab_political_orientation_title2"],
    x_title=t["tab_political_orientation_desc2"],
    tag_map=make_dict_iterable((t["tag_maps"]["p32"])),
    percent_label=t["chart_percent_label"],
    count_label=t["chart_count_label"],
)
st.plotly_chart(fig, use_container_width=True)
```

So it gets the translations dictionary and selects a value using a key from the `json`. There is also another function called `make_dict_iterable`, which I'll explain in the next section.

### Making numbered dictionaries from json iterable

Let's take this from the `json` file:

```json
"p32": {
  "0": "0\nExt. Izquierda",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5\nCentro",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "10": "10\nExt. Derecha",
  "11": "Ns/Nc"
},
```

When we get it as a Python dictionary, we get almost the same thing. The output of `t["tag_maps"]["p32"]` would be this:

```py
{'0': '0\nExt. Izquierda',
 '1': '1',
 '2': '2',
 '3': '3',
 '4': '4',
 '5': '5\nCentro',
 '6': '6',
 '7': '7',
 '8': '8',
 '9': '9',
 '10': '10\nExt. Derecha',
 '11': 'Ns/Nc'
}
```

It's not iterable, because index numbers are strings. So I create this simple util:

```py

def make_dict_iterable(d: dict[str, str]) -> dict[int, str]:
    """Transform the dictionary index  values to ints"""
    d = {int(k): str(v) for k, v in d.items()}
    return d
```

## Conclusion

Implementing a translation system in a Streamlit application with Plotly charts might seem daunting at first, but it's actually a straightforward process that brings significant benefits to your project. By externalizing all text content into a structured JSON file and creating simple utility functions for language management, you can:

- **Improve maintainability**: All translations are centralized in one location
- **Enhance scalability**: Adding new languages becomes trivial
- **Follow SOLID principles**: Separation of concerns makes your code more robust
- **Support dynamic content**: Users can switch languages seamlessly during runtime

The approach of passing translated text as parameters to chart functions ensures that your visualization components remain clean and focused on their core functionality. The additional utility functions for handling dictionary transformations demonstrate how small, focused tools can solve specific internationalization challenges. And all of it without external dependencies!

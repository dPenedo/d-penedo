# Plan de mejora y contenidos — dpenedo.com

> Objetivo: conseguir visitas cualificadas que se conviertan en **clientes freelance** y
> **oportunidades de empleo**. Plan elaborado el 14 de julio de 2026.

## Diagnóstico

1. **No se está midiendo nada.** No hay analytics ni Search Console: no se sabe cuántas
   visitas hay, de dónde vienen ni con qué búsquedas aparece la web en Google.
2. **Desajuste de idioma y audiencia.** La web está 100% en inglés, pero los clientes
   freelance reales (negocios locales de Mar del Plata, mundo vasco) buscan en español.
   No existe página de servicios ni CTA claro. Para empleadores falta CV descargable.
3. **Blog sin competitividad ni distribución.** Pocos posts, cadencia irregular (último:
   nov 2025). Los tutoriales genéricos (data types en JS, Django context) no pueden
   posicionar contra MDN y la documentación oficial. Los posts nicho (TestMyCode,
   Streamlit multilingüe, Rofi) sí funcionan, pero no se distribuyen en ningún canal.
4. **Posicionamiento diluido.** "Full-Stack Developer" es indiferenciable. El nicho
   único y memorable es **datos + scraping de medios + mundo vasco** (Basque Media
   Scraper, Sociómetro Vasco, pipelines para investigación sociológica). Además, en la
   home los proyectos de aprendizaje (Pomodoro, Martzianos…) conviven al mismo nivel que
   el trabajo profesional y restan credibilidad.

---

## Fase 0 — Medir (esta semana, ~1 hora)

- [x] Añadir analytics ligero y sin cookies (GoatCounter, Umami o Plausible) en
      `src/components/BaseHead.astro`. _Hecho el 16 jul 2026: GoatCounter
      (dpenedo.goatcounter.com), pendiente de desplegar._
- [x] Dar de alta dpenedo.com en **Google Search Console** y enviar el sitemap
      (ya se genera con `@astrojs/sitemap`). _Hecho el 15 jul 2026: sitemap enviado y
      leído, estado "Correcto", 40 páginas descubiertas._
- [ ] En 2-4 semanas: revisar con qué consultas aparece la web y qué páginas reciben
      impresiones. Ajustar el plan de contenidos con esos datos.

## Fase 1 — Conversión y posicionamiento (1-2 tardes)

- [ ] Crear **página de servicios en español**: "Desarrollo web para negocios y
      proyectos de datos". Incluir proceso de trabajo, ejemplos reales (Matafuegos,
      Escuela de Columna, Albert Martin) y CTA de contacto claro. Es la página con más
      potencial para captar clientes por búsqueda local.
- [ ] Reescribir el titular de la home con ángulo diferenciado. Propuesta:
      *"Desarrollador web y de datos. Construyo webs rápidas para negocios y pipelines
      de datos para investigación"* (versión EN equivalente).
- [ ] **Podar el portfolio de la home**: dejar 5-6 proyectos fuertes (datos, bot de IA,
      clientes). Mover los de aprendizaje (Pomodoro, Martzianos, TodoList, tuVeterinaria,
      AprovechÁpp, Doggy) a una página de archivo o eliminarlos.
- [ ] Añadir **CV descargable** (PDF, versión EN y ES).
- [ ] Conseguir y publicar 1-2 **testimonios** de clientes reales.

## Fase 2 — Contenidos con nicho (continuo, 1-2 posts/mes)

**Regla: escribir lo que solo tú puedes escribir**, no lo que ya está en la
documentación oficial.

Ideas priorizadas, derivadas de proyectos existentes:

- [ ] "Cómo scrapeo 13 medios vascos a diario: arquitectura, Docker y deduplicación en
      PostgreSQL" (ES + EN).
- [ ] Post de análisis con datos propios: *"¿De qué hablan los medios vascos? X meses de
      titulares analizados"*. Es el mejor imán de enlaces y difusión (prensa/redes
      vascas). Repetible periódicamente.
- [ ] Caso de cliente: "Cómo migré la web de una empresa local a Astro y pasó a 90+ en
      PageSpeed" (en español, apunta a búsquedas de potenciales clientes).
- [ ] Seguir con posts de herramientas nicho (Rofi, scripts bash, terminal): son los que
      atraen tráfico de cola larga.
- [ ] Análisis publicable del Sociómetro Vasco con visualizaciones (ES + EU).

## Fase 3 — Distribución (por cada post, ~30 min)

- [ ] Cross-postear en **dev.to / Hashnode** con URL canónica apuntando a dpenedo.com.
- [ ] Publicar resumen en **LinkedIn** enlazando al post.
- [ ] Compartir los posts nicho donde vive su audiencia: subreddits (Python,
      selfhosted, commandline…), foros/Discord de Streamlit, y para lo vasco:
      Mastodon/Bluesky y medios tech locales.
- [ ] Añadir el RSS del blog a agregadores relevantes (p. ej. planetas de Python/Astro).

## Arreglos técnicos de paso

- [x] `src/pages/index.astro:97-99`: eliminar los tres `</p>` huérfanos (HTML inválido).
      *(Hecho 16/7/2026: también había un `</section>` huérfano; eliminados los cuatro.)*
- [x] `src/site.config.ts`: sustituir la `description` global (párrafo largo con
      keywords) por una frase clara de ~155 caracteres. *(Hecho 16/7/2026.)*
- [x] Unificar formato de `publishDate` en los posts (el de Rofi usa `2025-06-11`; el
      resto `11 Jun 2025`). *(Hecho 16/7/2026: todos a ISO `YYYY-MM-DD` + `timeZone:
      "UTC"` en `site.config.ts` para evitar el desfase de un día al formatear en
      UTC-3.)*
- [ ] Si se añaden páginas en español: definir estructura de URLs (`/es/...`) y
      configurar `hreflang`.
- [ ] **Racionalizar las páginas de tags**: hay 28 tags para solo 9 posts y muchos
      tienen un único post (`fedora`, `java`, `rofi`, `mooc`…), lo que genera páginas
      casi vacías que diluyen el sitio de cara a Google. Opciones: consolidar tags en
      menos categorías más amplias, o añadir `noindex` a las páginas de tag (y quitarlas
      del sitemap) manteniéndolas solo como navegación interna.

---

## Métricas de éxito (revisar mensualmente)

- Impresiones y clics en Search Console (tendencia, no valor absoluto).
- Visitas por página: ¿la página de servicios recibe tráfico de búsqueda local?
- Contactos recibidos (email) atribuibles a la web.
- Cadencia de publicación cumplida: 1-2 posts/mes con su distribución hecha.

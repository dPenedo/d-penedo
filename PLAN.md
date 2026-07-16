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
      (dpenedo.goatcounter.com), desplegado y verificado._
- [x] Dar de alta dpenedo.com en **Google Search Console** y enviar el sitemap
      (ya se genera con `@astrojs/sitemap`). _Hecho el 15 jul 2026: sitemap enviado y
      leído, estado "Correcto", 40 páginas descubiertas._
- [ ] En 2-4 semanas: revisar con qué consultas aparece la web y qué páginas reciben
      impresiones. Ajustar el plan de contenidos con esos datos.

## Fase 1 — Conversión y posicionamiento (1-2 tardes)

> Enfoque (reformulado el 16/7/2026): los clientes freelance llegan por vías
> calientes —recomendación y créditos en los footers de webs de clientes—, no por SEO
> frío. La página de servicios es la **página de aterrizaje de esos referidos**, no una
> apuesta SEO (si cae tráfico de búsqueda local, es regalo). El resto de la web se
> queda en inglés para la audiencia técnica/empleo; no hace falta `/es/` ni `hreflang`
> para una sola página.

Ordenado por impacto por hora invertida:

- [x] **Podar el portfolio de la home**: dejar 5-6 proyectos fuertes (datos, bot de IA,
      clientes). Mover los de aprendizaje (Pomodoro, Martzianos, TodoList, tuVeterinaria,
      AprovechÁpp, Doggy) a una página de archivo o eliminarlos. Reescribir el titular
      de la home con ángulo diferenciado: *"Web & data developer. I build fast websites
      for businesses and data pipelines for research"*. *(Hecho 16/7/2026: quedan 7
      fuertes en la home; 8 movidos a `/archive` —incluidos Ceramic y ChronoScript—.
      Titular nuevo y, tras la salida de Polyfen, copy freelance-first en home y
      about-me.)*
- [ ] Crear **página `/servicios` en español** (una sola página): qué haces, 2-3
      ejemplos reales con resultado (Matafuegos, Escuela de Columna, Albert Martin),
      testimonios y CTA de contacto claro.
- [ ] Poner/verificar el **crédito "Desarrollado por Daniel Penedo"** con enlace a
      `/servicios` en los footers de las webs de clientes. Sin esto la página no recibe
      visitas; es la fuente de tráfico real.
- [ ] Pedir 1-2 **testimonios** de clientes reales (alimentan `/servicios`).
- [ ] Añadir **CV descargable** (PDF, versión EN y ES). No trae visitas: convierte las
      que hay (recruiters que necesitan un PDF que reenviar).

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
      atraen tráfico de cola larga. → Concretado abajo en el plan de posts tmux/neovim.
- [ ] Análisis publicable del Sociómetro Vasco con visualizaciones (ES + EU).

### Plan de posts tmux / neovim / kitty (jul–nov 2026)

> Elaborado el 16/7/2026 a partir de los dotfiles y de un barrido de long tails del
> autocompletado de Google. Regla: el material sale de scripts y configs propios que
> resuelven cosas que la documentación no cubre. Todos en inglés. Cadencia: 1/mes.

1. **[ ] Jul 2026 — "Jumping between Claude Code sessions in tmux with fzf"**
   (`ai-jump.sh`). Long tails: `tmux claude code`, `tmux for agents`,
   `why use tmux with claude code`, `tmux orchestrator`. Ingrediente único: filtrar
   panes por tty (Claude corre como `node`) y el truco `[c]laude` para que grep no se
   autodetecte. *Prerrequisito*: pulir el script y publicarlo (gist o dotfiles
   públicos) + GIF/asciinema del salto entre sesiones.
   *Distribución*: r/ClaudeCode (workflows caseros funcionan muy bien allí; exige
   flair y declarar tu relación con la herramienta), r/tmux, dev.to con canonical.
   **No** r/commandline: prohíbe proyectos relacionados con IA generativa. Es el más
   urgente: la ola IA+tmux está abierta y con poco contenido.

2. **[ ] Ago 2026 — "tmux popups as a floating app layer"** (scratchpad precargado,
   ncmpcpp, pomodoro propio, nota semanal, sesión mosh al VPS). Long tails:
   `tmux popup`, `tmux floating window`, `tmux background session`. El patrón
   reutilizable es `has-session || new-session` + `display-popup`.
   *Prerrequisito*: GIF de 2-3 popups en acción.
   *Distribución*: r/commandline, r/tmux, r/unixporn (solo con GIF vistoso), dev.to.

3. **[ ] Sep 2026 — "kitty + tmux without friction"** (workaround extended-keys /
   snacks.image con referencia a folke/snacks.nvim#2332, OSC52 para yank por SSH,
   nombres de ventana dinámicos vía título OSC 2, `tmux-paste` que no vuelca
   imágenes). Long tails: `tmux yank to clipboard`, `tmux xterm-kitty`,
   `tmux vs kitty`, y búsquedas de mensajes de error concretos.
   *Distribución*: r/KittyTerminal (sin reglas propias, comunidad pequeña pero
   exacta), r/tmux, r/neovim (ángulo snacks.image, enmarcado como solución a un
   problema, no como "mira mi config"), comentar con enlace en el propio issue de
   GitHub (tráfico cualificado permanente), dev.to.

4. **[ ] Oct 2026 — "I rewrote tmux-sessionizer in Python — here's what I added"**
   (preview en vivo por ventana, `sessions.conf` con saltos directos, hydrate por
   proyecto). Long tails: `tmux session manager`, `best tmux session manager`,
   `tmux sessionizer`. Audiencia: la comunidad de ThePrimeagen.
   *Prerrequisito*: README decente en el repo. **Publicar el repo ya**: r/commandline
   rechaza proyectos con menos de 30 días o pocos commits, así que en octubre debe
   tener historia.
   *Distribución*: r/commandline (cumpliendo sus reglas: listar alternativas
   —sessionizer original, sesh, tmuxinator—, declarar si hay código asistido por IA,
   texto del post escrito a mano), r/tmux, dev.to, posible Show HN.

5. **[ ] Nov 2026 — "Homemade Neovim keymaps I actually use daily"** (copiar
   `ruta:línea` y selección con cabecera para dar contexto a agentes de IA,
   insertador de debug logs por filetype, pydoc en ventana flotante, notas de
   proyecto → vault). Long tails: `neovim claude code`, `neovim keymaps`,
   `neovim ai`. *Distribución*: r/neovim, pero ojo: su regla manda las configs al
   hilo mensual de dotfiles. Enmarcarlo como flujo de trabajo concreto ("How I pass
   file context to AI agents from Neovim"), no como volcado de keymaps. dev.to.

**Estrategia Reddit (anti-borrado por autopromoción):**

- El valor va **dentro del post de Reddit**: post de texto con el truco, el código o
  el GIF incluidos; el enlace al blog al final ("versión larga aquí") o en un
  comentario. Nunca un post que sea solo el enlace.
- Respetar la regla ~9:1: comentar y participar en el subreddit las semanas previas;
  no estrenar cuenta con autopromo.
- No cross-postear el mismo enlace a varios subreddits el mismo día; espaciar y
  adaptar el texto a cada comunidad.
- Responder comentarios las primeras horas: el engagement decide si el post vive.

**Reglas verificadas por subreddit (leídas el 16/7/2026 vía la API de Reddit):**

- **r/tmux** — solo 2 reglas: on-topic y buscar antes de preguntar. El más
  permisivo; sirve para los posts 1-4.
- **r/ClaudeCode** — permite compartir herramientas **con disclosure** (qué hace,
  quién se beneficia, coste, tu relación con ella). Flair obligatorio. Ideal para
  el post 1.
- **r/commandline** — se ha endurecido mucho: prohíbe proyectos relacionados con IA
  generativa, prohíbe texto de post generado con IA, exige que el código
  mayormente generado por IA se declare, rechaza repos con <30 días o pocos
  commits, y pide listar software alternativo/similar. Sirve para los posts 2 y 4
  cumpliendo todo eso. Nada del post 1 aquí.
- **r/neovim** — sin autopromo/spam; las configs van al hilo mensual de dotfiles;
  prohibidos los "Neovim vs X" (nada de comparativas aquí) y el plagio (citar
  fuentes de código ajeno). Los posts tipo "cómo resuelvo X" sí caben.
- **r/KittyTerminal** — sin reglas propias, solo las de Reddit. Pequeño pero
  audiencia exacta para el post 3.
- **r/unixporn** — muy estricto en formato: tag [OC] o [Workflow] en el título,
  mínimo 2 ventanas con 2 apps distintas en pantalla, comentario de detalles con
  dotfiles. Solo merece la pena con un vídeo/GIF cuidado; opcional.
- **r/vim** — descartado: solo vim, Neovim explícitamente excluido.

**Canales fuera de Reddit:**

- **Terminal Trove** (terminaltrove.com) — directorio curado de herramientas de
  terminal con newsletter y RSS; admite submissions. Encaja ai-jump y
  tmux-sessionizer cuando tengan repo con README.
- **console.dev** — newsletter semanal de devtools (~30k suscriptores); seleccionan
  2-3 herramientas/semana según criterios publicados. Probar con tmux-sessionizer.
- **Hacker News** — Show HN para el sessionizer; los posts de flujos tmux+IA también
  funcionan como artículo normal. Mismo principio que Reddit: valor primero,
  y quedarse a responder comentarios.
- **lobste.rs** — audiencia perfecta (terminal/unix), pero requiere invitación de
  un miembro; conseguirla vale la pena a medio plazo.
- **Mastodon/Bluesky** — hashtags #neovim #tmux #terminal; Fosstodon es el nodo
  natural. Ya previsto en Fase 3 para lo vasco; añadir estos hashtags.
- **Lemmy** (programming.dev) — comunidades de neovim/commandline pequeñas pero
  receptivas a OC; sin cultura anti-autopromo si el contenido es real.
- **Discord/Matrix de Neovim** y foros de kitty (GitHub Discussions) — para los
  posts 3 y 5, compartir como "esto me pasaba y así lo resolví".

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
- [x] **Racionalizar las páginas de tags**: hay 28 tags para solo 9 posts y muchos
      tienen un único post (`fedora`, `java`, `rofi`, `mooc`…), lo que genera páginas
      casi vacías que diluyen el sitio de cara a Google. Opciones: consolidar tags en
      menos categorías más amplias, o añadir `noindex` a las páginas de tag (y quitarlas
      del sitemap) manteniéndolas solo como navegación interna. *(Hecho 16/7/2026:
      consolidados a 10 tags — `python`, `javascript`, `web`, `data`, `linux`,
      `terminal`, `scripting`, `neovim`, `java`, `astro`. El sitio pasa de 44 a 27
      páginas.)*

---

## Métricas de éxito (revisar mensualmente)

- Impresiones y clics en Search Console (tendencia, no valor absoluto).
- Visitas por página: ¿la página de servicios recibe tráfico de búsqueda local?
- Contactos recibidos (email) atribuibles a la web.
- Cadencia de publicación cumplida: 1-2 posts/mes con su distribución hecha.

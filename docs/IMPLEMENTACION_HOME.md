# Home: notas de implementación (versión 1)

Rama: `diseno/experiencia-web`. Implementa `TRAZOFINO_DESIGN_SPEC.md` con la decisión de portada del 25/11/2026: carrusel de 4 diapositivas y video solo en el diálogo "Ver video".

## Archivos
| Archivo | Contenido |
|---|---|
| `src/views/Inicio.astro` | Las secciones 2 a 8 de la Home en el orden definitivo, más los scripts del carrusel, el diálogo de video y el carrusel de proyectos |
| `src/content/home.ts` | Textos es / en / pt, ajustados a las definiciones D1–D6 |
| `src/styles/experiencia.css` | Tokens del §4 y componentes `tf-*`. Se carga después de `global.css` |
| `src/components/Provisorio.astro` | Marcador para las imágenes que la biblioteca no tiene en estado `aprobado`. Respeta la proporción y muestra el código `TF-…` |
| `src/components/IconoLinea.astro` | Íconos de línea `TF-ICO` (SVG propios) |
| `Header.astro`, `Pie.astro`, `BarraMovil.astro` | Encabezado, pie de página y barra móvil según §2.1 y §2.9 |

## Imágenes
- **Con marcador provisorio:** `TF-HER-01…04`, `TF-MOD-M-03`, `TF-SRV-01…03`, `TF-MOD-S-01`, `TF-MOD-M-01`, `TF-ISO-01…03` y `TF-CIE-01`. Ninguna está aprobada en la biblioteca.
- **Con foto real:** el carrusel de proyectos usa las portadas aprobadas `TF-PRY-V01…V04-01`. La portada vertical de la Vivienda 02 se muestra entera, sin recortarla en horizontal.
- **Video:** el video existente (Gemini, rotulado como IA) solo se ve dentro del diálogo "Ver video".

## Ajustes respecto de la spec, por fidelidad a la referencia
Medido comparando lado a lado con la referencia en 1440 px. La spec manda que la imagen es la fuente de verdad.

| Elemento | Spec | Implementado | Motivo |
|---|---|---|---|
| Título de sección | 40 → 72 px | 36 → 56 px | En la referencia "Tres caminos. Una misma visión." entra en una sola línea |
| Título "Tu hogar" | 72 px | 40 → 64 px | Medido en la referencia |
| Título de tarjeta | 24 → 30 px | 22 → 26 px | Medido en la referencia |
| Alto del hero | 85 vh | 600–760 px (72 vh) | La referencia muestra ~610 px a 1440 |
| Espacio entre secciones | 96 → 128 px | ~72 → 88 px | La referencia es más compacta |
| Banda de cierre | 320 px | 272 px (escritorio) | Medido en la referencia |
| Altura del header | ~80 px | 88 px | Logo y botón medidos en la referencia |
| Menú entre 1024 y 1199 px | Horizontal | Botón de menú | Los 6 ítems más el botón no entran sin desbordar |
| "Servicios" en el menú | Página propia | Ancla `/#servicios` | La página `/servicios/` es la etapa 7 del plan |

## Verificación (25/11/2026)
- **Build:** 37 páginas; `astro check` sin errores; CSP con hashes.
- **Con las cabeceras reales** (Wrangler): 0 violaciones de CSP y 0 errores de consola en `/`, `/en/`, `/pt/`, `/modulos/`, `/proyectos/vivienda-01/` y `/contacto/`.
- **Interacción:**
  - Los indicadores 01–04 cambian la diapositiva.
  - "Ver video" abre el diálogo y el video se reproduce. Esc lo cierra y el foco vuelve al botón.
  - Las flechas mueven el carrusel de proyectos.
  - El ítem "Servicios" lleva a la sección.
- **Anchos:** sin desbordes horizontales en 360, 390, 430, 768, 1024, 1280, 1440 y 1920 px.
- **Además:** se corrigió el título de Estudio, que se cortaba a mitad de palabra en escritorio (el problema ya existía antes).

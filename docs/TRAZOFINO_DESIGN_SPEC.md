# TRAZOFINO — Especificación de diseño (referencia maestra)

> **Estado:** revisión 2, borrador para aprobación. No se modificó código de producción. **Fuente de verdad visual:** la imagen de referencia aprobada (composición en dos columnas, 1536 × 1024 px). Se lee como **una sola página larga**: la columna izquierda es la parte superior y la derecha continúa debajo. **Documento hermano:** TRAZOFINO_MEDIA_LIBRARY.md. Los códigos de imagen (`TF-…`) que aparecen acá se definen allí. Los colores se midieron sobre la imagen. Las medidas en px corresponden a un escritorio de **1440 px**; la referencia está a \~0,55× de esa escala.

---

## 0. Definiciones comerciales confirmadas

Estas definiciones son **definitivas**. Todo el texto de la página se ajusta a ellas.

| **#** | **Definición**                                                                                                                                                                                                                   |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1    | TRAZOFINO ofrece viviendas modulares **Módulo S (24 m²)** y **Módulo M (48 m²)**.                                                                                                                                                |
| D2    | **Fabricación, transporte e instalación en el terreno están incluidos** en el valor de la vivienda.                                                                                                                              |
| D3    | **Las fundaciones y las conexiones de agua, electricidad y cloacas quedan a cargo del cliente.**                                                                                                                                 |
| D4    | **Sebastian Gonzalez** realiza los proyectos arquitectónicos, los planos municipales, las gestiones de aprobación y la documentación requerida por barrios privados.                                                             |
| D5    | TRAZOFINO también ofrece **arquitectura y construcción de viviendas particulares a medida**.                                                                                                                                     |
| D6    | Conectar módulos lateralmente o apilarlos es una **posibilidad de crecimiento sujeta a validación estructural, ingeniería, terreno y permisos**. Ninguna configuración se presenta como técnicamente aprobada sin documentación. |

**Lo que no se publica hasta que el arquitecto lo apruebe:** cantidad de dormitorios, distribución interior, materiales y especificaciones técnicas de los módulos. Donde la referencia muestra esos datos, se reemplazan por información de D1–D3 (ver §2.5).

**Pendiente (solo estos puntos):**

- Enlaces de Instagram, LinkedIn y YouTube. Hasta tenerlos, los íconos no se muestran.
- La frase "consulta de factibilidad **sin costo**". Hasta confirmarla se usa "Consultá la factibilidad de tu proyecto".
- Ubicación de las obras reales. Hasta tenerla, la tarjeta muestra solo la categoría.

---

## 1. Diagnóstico del proyecto actual

| **Aspecto**    | **Estado actual**                                                                                                                                                                            | **Reutilizable**                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework      | Astro 7.4 (salida estática) + TypeScript, Cloudflare Pages y una Pages Function (`/api/consulta`)                                                                                            | Sí, todo                                                                                                                                          |
| Idiomas        | es / en / pt con el enrutador `src/pages/[...ruta].astro`; textos en `src/content/textos/*.ts`                                                                                               | Sí                                                                                                                                                |
| Estructura     | `src/views/*` (una vista por página), `src/components/*` (Logo, Header, Pie, Medio, Obra, FormConsulta, Comparador, VideoPortada…), src/styles/global.css (\~2000 líneas, tokens en `:root`) | Sí; se suman componentes                                                                                                                          |
| Tipografías    | Cormorant Garamond (serif, hoy en peso 300) y Manrope Variable (sans), autoalojadas con `@fontsource`                                                                                        | **Sí, son las de la referencia.** Faltan los pesos 500 y 600 de Cormorant, que ya están en el paquete instalado (no requiere dependencias nuevas) |
| Paleta         | `--marfil #f3efe7`, `--grafito #2f2d2a`, `--madera #8a6646`, `--arena #dccfb8`…                                                                                                              | Cercana. Se ajustan 4 valores y se suman 3 tokens (§4.1)                                                                                          |
| Imágenes       | Logo oficial; video de portada (render IA de Google Flow, **1072 × 716**) y 2 pósters; 11 fotos reales de 4 obras; **ninguna imagen de los módulos**                                         | Parcial. El video y los pósters **no alcanzan** la resolución de un hero a sangre en 1440 px o más (ver biblioteca, `TF-HER-01`)                  |
| Optimización   | `astro:assets` → AVIF/WebP responsive; CSP con hashes generada en el build                                                                                                                   | Sí                                                                                                                                                |
| Calidad medida | Lighthouse móvil 99–100 / 100 / 100; sin desbordes en 6 anchos                                                                                                                               | Debe mantenerse                                                                                                                                   |

**Diferencias con la referencia**

- Faltan el ítem de menú y la página **Servicios**, el ítem **Inicio** y el botón **"Solicitar una asesoría"** (hoy dice "Solicitar cotización").
- El hero es un **carrusel de 4 imágenes** con indicadores 01–04 y un botón **"Ver video"**; hoy es un video de fondo.
- Faltan las imágenes de producto de los módulos, los esquemas isométricos de crecimiento, la imagen de la banda de cierre y un set de íconos de línea.

---

## 2. Análisis de la referencia por sección

### 2.1 Header y navegación

- Fondo `--marfil-claro` (`#F8F3E9`), \~80 px de alto, sin sombra; queda fijo con un fondo levemente translúcido al hacer scroll.
- **Izquierda:** logo oficial (isotipo amarillo, "TRAZOFINO" serif en mayúsculas espaciadas y "ARQUITECTURA" sans muy espaciada).
- **Centro:** Inicio · Módulos · Proyectos · Servicios · Estudio · Contacto. Sans 15 px, peso 500, grafito. El ítem activo lleva un subrayado de 1 px separado 6 px del texto.
- **Derecha:** botón bronce sólido "Solicitar una asesoría", radio 3 px, padding 14 × 28 px. El selector de idioma (ES · EN · PT) se ubica a su izquierda, en sans 12 px y `--texto-2`.

### 2.2 Hero: "Nuevas formas de habitar."

- Imagen a sangre, 85 vh en escritorio y 100 svh en móvil. Escena al atardecer con el módulo, interior cálido iluminado y vegetación. Velo oscuro a la izquierda para el texto.
- Sobretítulo "ARQUITECTURA PARA" (sans 13 px, tracking 0,32 em, marfil).
- Título "Nuevas / formas / de habitar." en 3 líneas, serif peso 500, 104 px, interlineado 0,92.
- Bajada en 2 líneas, sans 18 px, ancho máximo 30 ch.
- Botones:
  - Primario **marfil sólido**, texto grafito: "Conocé los módulos →".
  - Secundario **con borde marfil de 1 px**: "Ver proyectos →".
  - Altura 54 px, radio 2 px, separación 16 px.
- Abajo a la izquierda, indicadores **01 02 03 04** (sans 13 px; el activo va subrayado). Abajo a la derecha, un círculo de 40 px con ▶ y el texto "Ver video".
- **Video actual:** pasa al botón "Ver video", que lo abre en un diálogo a pantalla completa. Las 4 diapositivas son imágenes fijas `TF-HER-01…04`. Por resolución, el póster actual solo puede ser una diapositiva provisoria.

### 2.3 "Tu hogar, más cerca."

- Fondo `--marfil`.
- Columna de texto a la izquierda (columnas 1–5 de 12). Imagen a la derecha (columnas 5–12) que **se funde** hacia el marfil por su borde izquierdo con un degradado de \~35 % de su ancho.
- Contenido:
  - Sobretítulo "VIVIENDAS MODULARES".
  - Título serif en 2 líneas (72 px).
  - Bajada sujeta a D1–D2: *"Módulos habitacionales de 24 m² y 48 m², con fabricación, transporte e instalación incluidos."*
  - Botón bronce "Ver modelos →".
- Sobre el borde derecho de la imagen, dos datos apilados, "Módulo S / 24 m²" y "Módulo M / 48 m²", en serif marfil de 40 px, con líneas finas de 1 px marfil al 50 % entre ellos.
- Imagen: `TF-MOD-S-03` o `TF-MOD-M-03`.

### 2.4 "Tres caminos. Una misma visión."

- Encabezado en dos columnas: título en las columnas 1–8 y texto breve en las 9–12, alineado a la base del título.
- Tres tarjetas iguales. Cada una tiene:
  - imagen 8:3;
  - número "01 / 02 / 03" (sans 13 px);
  - título serif peso 600 (30 px);
  - texto de 2 líneas;
  - enlace bronce subrayado con flecha.

| **#** | **Título**                | **Texto (ajustado a D1–D5)**                                                       | **Enlace**        | **Imagen**  |
| ----: | ------------------------- | ---------------------------------------------------------------------------------- | ----------------- | ----------- |
|    01 | Viviendas modulares       | Módulos S (24 m²) y M (48 m²) con fabricación, transporte e instalación incluidos. | Explorar módulos  | `TF-SRV-01` |
|    02 | Proyectos a medida        | Arquitectura y construcción de viviendas particulares, adaptadas a cada terreno.   | Ver proyectos     | `TF-SRV-02` |
|    03 | Asesoramiento y gestiones | Planos municipales, gestiones de aprobación y documentación para barrios privados. | Conocer servicios | `TF-SRV-03` |

**Franja de 4 atributos** (separada por una línea; ícono de línea bronce de 36 px, título sans 600 y bajada; separadores verticales):

| **Ícono** | **Título**            | **Bajada**                 |
| --------- | --------------------- | -------------------------- |
| Plano     | Diseño arquitectónico | Diseño propio de TRAZOFINO |
| Fábrica   | Fabricación           | Incluida en el valor       |
| Camión    | Transporte            | Hasta tu terreno, incluido |
| Casa      | Instalación           | En tu terreno, incluida    |

Debajo de la franja va una nota en sans 13 px y `--texto-2` (D3): *"Las fundaciones y las conexiones de agua, electricidad y cloacas quedan a cargo del cliente."*

### 2.5 Catálogo: "Diseño que se adapta a tu vida."

- Encabezado en dos columnas, como en §2.4.
- Grilla de 3: Módulo S (columnas 1–4), Módulo M (5–8) y "Posibilidades de crecimiento" (9–12).
- Tarjeta de módulo:
  - imagen 3:2 (`TF-MOD-S-01` / `TF-MOD-M-01`);
  - nombre en serif 600 (26 px);
  - superficie en serif 600 (40 px, con "m²" en superíndice);
  - **lista de 4 ítems con ícono** (la referencia muestra ambientes; se reemplazan por datos confirmados, sin dormitorios ni distribución):
    | **Ícono**  | **Ítem**                           |
    | ---------- | ---------------------------------- |
    | Superficie | Superficie cubierta 24 m² / 48 m²  |
    | Fábrica    | Fabricación incluida               |
    | Camión     | Transporte e instalación incluidos |
    | Plano      | Diseño arquitectónico TRAZOFINO    |
  - botón con borde "Ver detalles →".
- Tarjeta de crecimiento:
  - título serif "Posibilidades de crecimiento";
  - 3 esquemas isométricos (`TF-ISO-01…03`): "Módulo individual", "Conexión lateral" y "Dos niveles";
  - al pie, la nota obligatoria (D6) en sans 12 px: *"Esquemas ilustrativos. Cada configuración está sujeta a validación estructural, ingeniería, terreno y permisos."*

  Los esquemas **no muestran medidas, estructura ni detalles técnicos**.

### 2.6 Proyectos realizados: "Casas que cuentan historias."

- Sobretítulo "PROYECTOS REALIZADOS", título y enlace "Ver todos los proyectos →" a la derecha.
- **Carrusel** con 3 tarjetas visibles en escritorio:
  - imagen 5:3;
  - nombre en sans 600 (15 px);
  - ubicación en sans 13 px y `--texto-2`. Si falta la ubicación, se muestra la categoría.
- Flechas: círculos blancos de 40 px a ambos lados, superpuestos a medias sobre la primera y la última tarjeta.
- Solo obras reales (`TF-PRY-…`), con 5 fotos aprobadas por vivienda. La portada de cada una es la foto `-01`.

### 2.7 Servicios profesionales y gestiones: "Acompañamos todo tu proyecto."

- Encabezado en dos columnas. Texto lateral: *"Una mirada integral, desde la idea inicial hasta la construcción, con la experiencia de un estudio de arquitectura."*
- 4 tarjetas, cada una con ícono de línea bronce (40 px), título serif 600 en 1–2 líneas y texto de 2 líneas:

| **Ícono** | **Título**                          | **Texto (D4–D5)**                                      |
| --------- | ----------------------------------- | ------------------------------------------------------ |
| Compás    | Proyecto arquitectónico             | Diseño y documentación del Arq. Sebastian Gonzalez.    |
| Documento | Planos municipales y aprobaciones   | Planos y gestiones de aprobación ante el municipio.    |
| Barrio    | Documentación para barrios privados | La documentación que exige cada barrio.                |
| Casa      | Construcción a medida               | Arquitectura y construcción de viviendas particulares. |

- Debajo: botón bronce "Conocer todos los servicios →" a la izquierda y enlace subrayado "Consultá la factibilidad de tu proyecto →" a la derecha.

### 2.8 "Hablemos de tu proyecto."

- Banda a sangre, 320 px de alto en escritorio, con la imagen `TF-CIE-01` (terraza de madera con plantas) y un velo oscuro.
- Contenido centrado:
  - título serif marfil (56 px);
  - bajada "Contanos qué tenés en mente y te asesoramos en cada etapa.";
  - botón bronce "Solicitar una asesoría";
  - botón con borde marfil "Escribinos por WhatsApp" con ícono.

### 2.9 Footer

- Fondo `--marfil-claro`, una franja de \~96 px:
  - logo;
  - navegación (Módulos · Proyectos · Servicios · Estudio · Contacto);
  - íconos de redes (solo los que tengan enlace);
  - "↑ Volver arriba".
- Debajo, en una segunda línea fina: copyright, contacto (WhatsApp y correo) y enlace a Privacidad.

---

## 3. Orden definitivo de la home

Este orden es **definitivo** y no se modifica.

| **#** | **Sección**                                                  | **Fondo**     |
| ----: | ------------------------------------------------------------ | ------------- |
|     1 | Header y navegación                                          | Marfil claro  |
|     2 | Hero: Nuevas formas de habitar                               | Imagen oscura |
|     3 | Tu hogar, más cerca                                          | Marfil        |
|     4 | Tres caminos. Una misma visión (+ franja de atributos)       | Marfil claro  |
|     5 | Catálogo: Diseño que se adapta a tu vida (S, M, crecimiento) | Marfil        |
|     6 | Proyectos realizados                                         | Marfil        |
|     7 | Servicios profesionales y gestiones                          | Marfil        |
|     8 | Hablemos de tu proyecto                                      | Imagen oscura |
|     9 | Footer                                                       | Marfil claro  |

Las demás páginas (módulos, fichas S y M, proyectos, estudio y contacto) adoptan el sistema de §4. Se agrega la página **Servicios** (`/servicios/`, `/en/services/`, `/pt/servicos/`).

---

## 4. Especificación visual

### 4.1 Paleta

| **Token**            | **HEX**                    | **Uso**                                        | **Hoy**                      |
| -------------------- | -------------------------- | ---------------------------------------------- | ---------------------------- |
| `--marfil`           | `#F5EEE3`                  | Fondo general de secciones                     | `#F3EFE7` → ajustar          |
| `--marfil-claro`     | `#F8F3E9`                  | Header, "Tres caminos" y footer                | nuevo                        |
| `--tarjeta`          | `#FBF7F0`                  | Fondo de tarjetas                              | nuevo                        |
| `--linea`            | `#E6DCCD`                  | Bordes y separadores                           | `#DDD5C8` → ajustar          |
| `--linea-fuerte`     | `#C9BBA6`                  | Borde de botones secundarios sobre fondo claro | `#B9B0A3` → ajustar          |
| `--grafito`          | `#1F1D1A`                  | Títulos y texto principal                      | `#2F2D2A` → ajustar          |
| `--texto-2`          | `#5E574E`                  | Texto secundario                               | `#625C54` (≈ igual)          |
| `--bronce`           | `#8F6A41`                  | Botones sólidos, enlaces e íconos              | `--madera #8A6646` → ajustar |
| `--bronce-oscuro`    | `#71522F`                  | Hover de los botones bronce                    | `--madera-oscura` (≈ igual)  |
| `--sobre-oscuro`     | `#F4EEE4`                  | Texto sobre imágenes oscuras                   | `#EFE9DF` (≈ igual)          |
| `--velo`             | `rgb(12 11 8 / .72)` → `0` | Degradados del hero y de la banda de cierre    | —                            |
| Amarillo del isotipo | El del PNG oficial         | Solo en el logo                                | Sin cambios                  |

**Contraste medido:**

- Marfil `#FBF7F0` sobre bronce: 4,57:1 (AA).
- `--texto-2` sobre marfil: 6,2:1.
- Grafito sobre marfil: 14,6:1.

### 4.2 Tipografías y jerarquía

| **Estilo**                | **Familia**        | **Peso** | **Tamaño (360 → 1440 px)** | **Interlineado** | **Tracking**        |
| ------------------------- | ------------------ | -------: | -------------------------- | ---------------: | ------------------- |
| Display (hero)            | Cormorant Garamond |      500 | 56 → 104 px                |             0,92 | -0,01 em            |
| Título de sección         | Cormorant Garamond |      500 | 40 → 72 px                 |              1,0 | -0,005 em           |
| Título de banda de cierre | Cormorant Garamond |      500 | 36 → 56 px                 |             1,05 | 0                   |
| Título de tarjeta         | Cormorant Garamond |      600 | 24 → 30 px                 |              1,1 | 0                   |
| Superficie (m²)           | Cormorant Garamond |      600 | 32 → 40 px                 |                1 | 0                   |
| Sobretítulo               | Manrope            |      600 | 12 → 13 px                 |                1 | 0,32 em, mayúsculas |
| Menú                      | Manrope            |      500 | 15 px                      |                1 | 0                   |
| Cuerpo / bajada           | Manrope            |      400 | 16 → 18 px                 |             1,55 | 0                   |
| Texto de tarjeta          | Manrope            |      400 | 15 px                      |              1,5 | 0                   |
| Botón / enlace            | Manrope            |      600 | 15 px                      |                1 | 0                   |
| Número de tarjeta         | Manrope            |      500 | 13 px                      |                1 | 0,08 em             |
| Nota legal (D3, D6)       | Manrope            |      400 | 12 → 13 px                 |              1,5 | 0                   |

### 4.3 Retícula, anchos y espaciado

- **Ancho máximo de contenido:** 1240 px. El hero y la banda de cierre van a sangre.
- **Márgenes laterales:** 20 px (< 768), 40 px (768–1279) y automáticos desde 1280 px.
- **Retícula:** 12 columnas con medianil de 24 px (16 px en móvil).
- **Espacio vertical entre secciones:** 96 → 128 px. Dentro de una sección: sobretítulo → 16 px → título → 40 px → contenido.
- **Escala interna:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 px.

### 4.4 Proporciones de imagen

| **Uso**                     | **Proporción**          | **Ancho mínimo del original** | **Códigos**                    |
| --------------------------- | ----------------------- | ----------------------------- | ------------------------------ |
| Hero, escritorio            | 16:9                    | 2560 px                       | `TF-HER-01…04`                 |
| Hero, móvil                 | 9:16 (recorte propio)   | 1080 px                       | `TF-HER-01…04` (variante `-M`) |
| Tu hogar, más cerca         | 3:2 con fundido         | 2400 px                       | `TF-MOD-S-03` / `TF-MOD-M-03`  |
| Tarjetas "Tres caminos"     | 8:3                     | 1600 px                       | `TF-SRV-01…03`                 |
| Tarjetas de módulo          | 3:2                     | 1600 px                       | `TF-MOD-S-01`, `TF-MOD-M-01`   |
| Esquemas isométricos        | 3:1, fondo transparente | SVG o PNG de 1200 px          | `TF-ISO-01…03`                 |
| Carrusel de proyectos       | 5:3                     | 1600 px                       | `TF-PRY-Vnn-01`                |
| Galería de cada proyecto    | Proporción original     | 2400 px                       | `TF-PRY-Vnn-01…05`             |
| Banda de cierre, escritorio | 5:1                     | 2560 px                       | `TF-CIE-01`                    |
| Banda de cierre, móvil      | 4:5                     | 1080 px                       | `TF-CIE-01` (variante `-M`)    |
| Íconos                      | 1:1, trazo de 1,5 px    | SVG                           | `TF-ICO-…`                     |

### 4.5 Tarjetas, bordes, sombras y separadores

- **Tarjeta:**
  - fondo `--tarjeta`, borde `1px solid --linea`, radio **4 px**;
  - sombra `0 1px 2px rgb(40 30 20 / .04), 0 8px 24px rgb(40 30 20 / .05)`;
  - imagen a todo el ancho, con radio solo arriba;
  - padding de 24 px.
- **Hover en escritorio:** la tarjeta sube 2 px, la sombra crece y la imagen hace zoom a 1,03 en 600 ms.
- **Separadores:** línea de 1 px `--linea`, horizontal entre bloques y vertical entre atributos y servicios.

### 4.6 Botones y estados

| **Tipo**                      | **Reposo**                                                                            | **Hover / foco**                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Primario bronce               | Fondo `--bronce`, texto `#FBF7F0`, radio 3 px, 52 px de alto                          | Fondo `--bronce-oscuro`; la flecha se desplaza 4 px                       |
| Primario claro (sobre imagen) | Fondo `#FBF7F0`, texto grafito                                                        | Fondo `#FFFFFF`                                                           |
| Secundario con borde          | Borde de 1 px (marfil sobre oscuro, `--linea-fuerte` sobre claro), fondo transparente | Fondo `rgb(255 255 255 / .08)` sobre oscuro; `--marfil-claro` sobre claro |
| Enlace bronce                 | Texto bronce con subrayado de 1 px a 4 px del texto                                   | El subrayado pasa al 100 % del ancho                                      |
| Flecha de carrusel            | Círculo blanco de 40 px con sombra suave                                              | Borde bronce                                                              |
| Indicador del hero            | Número marfil al 70 %                                                                 | Activo: 100 % y subrayado                                                 |
| Foco (todos)                  | Anillo de 2 px `--bronce` con 3 px de separación                                      | —                                                                         |

### 4.7 Responsive

| **Ancho** | **Comportamiento**                                                                                                                                                                                                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ≥ 1280    | Como la referencia                                                                                                                                                                                                                                                              |
| 1024–1279 | Igual, con márgenes menores; servicios en 2 × 2                                                                                                                                                                                                                                 |
| 768–1023  | Menú en panel. "Tres caminos": 1 tarjeta + 2. Módulos S y M en 2 columnas y crecimiento debajo, a todo el ancho y en horizontal. Carrusel con 2 tarjetas                                                                                                                        |
| < 768     | Una columna. Hero de 100 svh con imagen vertical propia y botones apilados. "Tu hogar": imagen arriba con fundido inferior. Carrusel con 1,15 tarjetas visibles y deslizamiento táctil. Franja de atributos en 2 × 2. Se mantiene la barra inferior móvil (WhatsApp / Asesoría) |

Anchos de prueba obligatorios: **360, 390, 430, 768, 1024, 1280, 1440 y 1920 px**.

### 4.8 Animaciones y transiciones

- **Aparición con el scroll** (ya existe `data-revelar`): opacidad + traslación de 16 px, 700 ms, `cubic-bezier(.2,.7,.2,1)`, escalonado de 80 ms.
- **Hero:** fundido cruzado de 1,2 s cada 7 s, con zoom lento de 1,00 → 1,04. Se pausa con el mouse encima, con el foco del teclado y fuera de pantalla. Los indicadores 01–04 permiten saltar de diapositiva.
- **"Ver video":** diálogo accesible a pantalla completa (se cierra con Esc, el foco queda atrapado y se devuelve al botón al cerrar).
- **Carrusel:** `scroll-snap` con botones de flecha y teclado.
- **`prefers-reduced-motion`:** sin zoom ni autoplay; transiciones instantáneas.
- Todo con CSS y JS propio, sin librerías. La CSP con hashes se mantiene.

---

## 5. Componentes

| **Componente**       | **Nuevo / existente**                           | **Características**                 | **Medios**                    |
| -------------------- | ----------------------------------------------- | ----------------------------------- | ----------------------------- |
| `Header`             | Existente, rediseñar                            | §2.1                                | `TF-MAR-01`                   |
| `HeroCarrusel`       | Nuevo (reemplaza a `VideoPortada` en el inicio) | §2.2 y §4.8                         | `TF-HER-01…04`, `TF-HER-V1`   |
| `DialogoVideo`       | Nuevo                                           | Video en un diálogo accesible       | `TF-HER-V1`                   |
| `BloqueHogar`        | Nuevo                                           | §2.3                                | `TF-MOD-S-03` / `TF-MOD-M-03` |
| `EncabezadoSeccion`  | Nuevo                                           | Sobretítulo, título y texto lateral | —                             |
| `TarjetaCamino`      | Nuevo                                           | §2.4                                | `TF-SRV-01…03`                |
| `FranjaAtributos`    | Nuevo                                           | §2.4, con nota D3                   | `TF-ICO-…`                    |
| `TarjetaModulo`      | Nuevo (convive con `Comparador`)                | §2.5                                | `TF-MOD-S-01`, `TF-MOD-M-01`  |
| `TarjetaCrecimiento` | Nuevo                                           | §2.5, con nota D6                   | `TF-ISO-01…03`                |
| `CarruselProyectos`  | Nuevo (usa los datos de `Obra`)                 | §2.6                                | `TF-PRY-…`                    |
| `TarjetaServicio`    | Nuevo                                           | §2.7                                | `TF-ICO-…`                    |
| `BandaCierre`        | Nuevo                                           | §2.8                                | `TF-CIE-01`                   |
| `Pie`                | Existente, rediseñar                            | §2.9                                | `TF-MAR-01`                   |
| `Icono`              | Existente, ampliar                              | Set de línea bronce                 | `TF-ICO-…`                    |
| `Boton`              | Nuevo                                           | Variantes de §4.6                   | —                             |

---

## 6. Imágenes y recursos

El inventario completo, con código, carpeta de Drive, sección, modelo, vista, resolución, estado y tipo de imagen, está en **TRAZOFINO_MEDIA_LIBRARY.md §4**. Resumen:

| **Grupo**                           | **Necesarias**                       | **Disponibles hoy**                                    |
| ----------------------------------- | ------------------------------------ | ------------------------------------------------------ |
| Marca (`TF-MAR`)                    | 2                                    | 2 (logo y favicon)                                     |
| Hero (`TF-HER`)                     | 4 imágenes + 1 video                 | 1 póster y 1 video, ambos en baja resolución (1072 px) |
| Módulo S (`TF-MOD-S`)               | 5                                    | 0                                                      |
| Módulo M (`TF-MOD-M`)               | 5                                    | 0                                                      |
| Proyectos reales (`TF-PRY`)         | 5 por vivienda (20 para 4 viviendas) | 11                                                     |
| Arquitectura y servicios (`TF-SRV`) | 3                                    | 0 (una puede salir de las obras reales)                |
| Banda de cierre (`TF-CIE`)          | 1                                    | 0                                                      |
| Isométricos (`TF-ISO`)              | 3                                    | 0                                                      |
| Íconos (`TF-ICO`)                   | 18                                   | 0 (se dibujan en SVG)                                  |

Mientras falte una imagen, se muestra un marcador neutro con su código. No se reemplaza por ilustraciones genéricas.

**Renders generados con IA:** si una imagen es un render IA, el sitio mantiene el rótulo discreto "Render ilustrativo generado con IA", como en el video actual.

---

## 7. Control de fidelidad visual

La referencia sigue siendo la fuente de verdad. Cada etapa se compara con Playwright antes de darla por terminada.

1. **Recortes de referencia:** se recorta cada sección de la imagen de referencia (coordenadas fijas, en `docs/referencia/`) y se escala a 1440 px de ancho.
2. **Capturas de la implementación:** con Playwright y Chromium, a 1440 × 900 px, por sección (selector de cada `<section>`), con el movimiento reducido activado para que no haya animaciones a mitad de camino.
3. **Comparación lado a lado:** se genera una lámina por sección con la referencia a la izquierda y la implementación a la derecha, más una superposición al 50 %.
4. **Mediciones automáticas por sección:**
   - colores de fondo, título y botón (diferencia ΔE ≤ 3 contra §4.1);
   - posición y tamaño de título, botones y tarjetas (desvío ≤ 4 % del ancho);
   - cantidad y orden de elementos.
5. **Comparación píxel a píxel:** no se usa como criterio de aprobación, porque las fotos reales y los textos confirmados difieren a propósito de la imagen de ejemplo.
6. **Responsive:** capturas completas en los 8 anchos de §4.7, controlando que no haya desbordes ni errores de consola, y que no se viole la CSP.
7. **Entrega de cada etapa:** las láminas comparativas y una lista de diferencias pendientes, con su justificación (por ejemplo, "texto ajustado a D3").

---

## 8. Plan de implementación por etapas

| **Etapa** | **Contenido**                                                              | **Verificación**                      |
| --------: | -------------------------------------------------------------------------- | ------------------------------------- |
|         0 | Aprobación de este documento y de la biblioteca de medios                  | —                                     |
|         1 | Tokens (paleta, pesos tipográficos, retícula), botones e íconos SVG        | Página interna de muestra; contraste  |
|         2 | Header y footer                                                            | §7 en todos los anchos                |
|         3 | Hero en carrusel + diálogo de video                                        | §7, teclado, movimiento reducido, CSP |
|         4 | "Tu hogar, más cerca", "Tres caminos" y franja de atributos con la nota D3 | §7                                    |
|         5 | Catálogo S / M + crecimiento con la nota D6                                | §7                                    |
|         6 | Carrusel de proyectos reales                                               | §7 y prueba táctil                    |
|         7 | Servicios + página `/servicios/` en 3 idiomas                              | §7                                    |
|         8 | Banda de cierre                                                            | §7                                    |
|         9 | Ajuste fino, Lighthouse y accesibilidad                                    | Informe con láminas                   |
|        10 | Vista previa en Cloudflare y tu aprobación antes de publicar               | —                                     |

Las etapas 4 a 8 usan las imágenes en estado **aprobado** de la biblioteca. Si alguna falta, se avanza con el marcador y se reemplaza cuando llega.
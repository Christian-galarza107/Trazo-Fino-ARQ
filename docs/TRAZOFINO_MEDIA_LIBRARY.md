# TRAZOFINO — Biblioteca de medios

> **Estado:** borrador para aprobación (17/11/2026). No se modificó código de producción ni la carpeta de Drive. **Documento hermano:** TRAZOFINO_DESIGN_SPEC.md. Las secciones, proporciones y códigos `TF-…` coinciden con ese documento.

## 1. Principios

1. **Los originales viven en Google Drive.** Es la fuente central compartida entre los socios y nunca se borran ni se sobrescriben.
2. **La web usa solo versiones optimizadas** dentro del proyecto (`src/assets/media/…`). Astro genera a partir de ellas AVIF y WebP en varios tamaños.
3. **Nunca se publican enlaces de Drive** (privados ni públicos) como imágenes de producción.
4. **Solo se usan imágenes en estado `aprobado`**, que estén en `09_APROBADOS_PARA_WEB`.
5. **Se usan solo las imágenes que entregue estudio TF.** No se suman bancos de imágenes ni material de terceros.
6. **Las versiones para la web se publican sin metadatos** (EXIF y GPS), para no exponer la ubicación de las obras.
7. **Toda imagen generada con IA lleva el rótulo** "Render ilustrativo generado con IA". Los renders arquitectónicos llevan "Imagen ilustrativa".
8. **Nada inventado:** las imágenes de los módulos no muestran distribución interior, dormitorios ni detalles técnicos que el arquitecto no haya aprobado. Los esquemas de crecimiento se rotulan como ilustrativos (spec D6).

---

## 2. Estructura de carpetas en Drive

Carpeta raíz: **`TRAZOFINO_WEB_MEDIOS`**. Se recomienda que la cree y sea dueña la cuenta de Christian (el motivo está en §5.3), compartida como **Editor** con estudio TF.

```
TRAZOFINO_WEB_MEDIOS/
```

`├─ 00_INVENTARIO                     (opcional: planilla espejo de §4)`

`├─ 01_IDENTIDAD_DE_MARCA             logo original en alta, isotipo, variantes`

`├─ 02_HERO_Y_PORTADA                 imágenes y video para el hero`

`├─ 03_MODULO_S_24M2                  renders o fotos del Módulo S`

`├─ 04_MODULO_M_48M2                  renders o fotos del Módulo M`

`├─ 05_PROYECTOS_REALES`

`│   ├─ V01 …  V02 …  V03 …  V04 …    una subcarpeta por vivienda`

`├─ 06_ARQUITECTURA_Y_SERVICIOS       planos, estudio, gestiones, obra a medida`

`├─ 07_BANDA_DE_CIERRE                imagen para "Hablemos de tu proyecto"`

`├─ 08_ISOMETRICOS_Y_CRECIMIENTO      esquemas S, M, lateral, dos niveles`

`└─ 09_APROBADOS_PARA_WEB             solo copias aprobadas, ya renombradas con su código`

**Reglas:**

- Las carpetas 01 a 08 reciben el material **tal como llega**, sin renombrar.
- En `09_APROBADOS_PARA_WEB` solo hay archivos aprobados, **renombrados con su código** (§3). Es la única carpeta que Claude usa para publicar.
- El material existente de `MODULOS / FOTOS PROYECTOS TF CONSTRUCTORA` (CASA 1 a 5) se toma como origen de `05_PROYECTOS_REALES`. **No se mueve ni se modifica**: se copian solo las fotos elegidas.

---

## 3. Códigos y nombres

### 3.1 Código único

`TF-{GRUPO}-{NN}`, o con subgrupo `TF-{GRUPO}-{SUB}-{NN}`.

| **Grupo** | **Significado**                            | **Carpeta** | **Ejemplo**              |
| --------- | ------------------------------------------ | ----------: | ------------------------ |
| `MAR`     | Identidad de marca                         |          01 | `TF-MAR-01`              |
| `HER`     | Hero y portada (`V` = video)               |          02 | `TF-HER-02`, `TF-HER-V1` |
| `MOD-S`   | Módulo S                                   |          03 | `TF-MOD-S-01`            |
| `MOD-M`   | Módulo M                                   |          04 | `TF-MOD-M-01`            |
| `PRY-Vnn` | Proyecto real, vivienda nn                 |          05 | `TF-PRY-V02-03`          |
| `SRV`     | Arquitectura y servicios                   |          06 | `TF-SRV-03`              |
| `CIE`     | Banda de cierre                            |          07 | `TF-CIE-01`              |
| `ISO`     | Isométricos y crecimiento                  |          08 | `TF-ISO-02`              |
| `ICO`     | Íconos (se dibujan en SVG, no van a Drive) |           — | `TF-ICO-07`              |

Variantes: sufijo `-M` para un recorte móvil propio (`TF-HER-01-M`) y `_v2`, `_v3` para versiones nuevas del mismo encuadre.

### 3.2 Nombre de archivo en `09_APROBADOS_PARA_WEB`

`{CÓDIGO}_{vista}_{descripción-corta}.{ext}`, por ejemplo `TF-PRY-V01-01_interior_cocina.jpg`.

### 3.3 Campos del inventario

| **Campo**               | **Valores**                                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Código                  | Según §3.1                                                                                                                                              |
| Archivo                 | Nombre en `09` (o el original, mientras no esté aprobado)                                                                                               |
| Carpeta de origen       | 01 a 08, más la ruta original si viene de otra carpeta                                                                                                  |
| Sección de la web       | Según el orden de la home (spec §3) o la página correspondiente                                                                                         |
| Modelo                  | `S`, `M` o `—`                                                                                                                                          |
| Vista                   | `frontal`, `lateral`, `aérea`, `interior`, `planta`. Solo para proyectos reales se suman `detalle` y `obra` (proceso constructivo)                      |
| Resolución y proporción | Mínimo necesario según spec §4.4                                                                                                                        |
| Estado                  | `pendiente` (no existe), `recibido` (está en 01–08), `revisado` (control técnico de §6.2 superado), `aprobado` (validado por los socios y copiado a 09) |
| Tipo                    | `fotografía real`, `render arquitectónico` o `imagen generada con IA`                                                                                   |

---

## 4. Inventario

### 4.1 Identidad de marca (01)

| **Código**  | **Archivo**                 | **Origen**              | **Sección**           | **Modelo** | **Vista** | **Resolución / proporción**                             | **Estado**                               | **Tipo**         |
| ----------- | --------------------------- | ----------------------- | --------------------- | ---------- | --------- | ------------------------------------------------------- | ---------------------------------------- | ---------------- |
| `TF-MAR-01` | `trazofino-isotipo.png`     | Logo oficial entregado  | 1 Header, 9 Footer    | —          | —         | Vector o PNG ≥ 1000 px de alto (hoy 96 × 132 en la web) | aprobado · **falta el original en alta** | Gráfico de marca |
| `TF-MAR-02` | favicons (ico, 16, 32, 180) | Derivado de `TF-MAR-01` | Pestaña del navegador | —          | —         | 1:1                                                     | aprobado                                 | Gráfico de marca |

### 4.2 Hero y portada (02)

| **Código**  | **Archivo**                            | **Origen**           | **Sección**               | **Modelo** | **Vista** | **Resolución / proporción**                                                             | **Estado**            | **Tipo**               |
| ----------- | -------------------------------------- | -------------------- | ------------------------- | ---------- | --------- | --------------------------------------------------------------------------------------- | --------------------- | ---------------------- |
| `TF-HER-01` | `poster-escritorio.jpg` / `-movil.jpg` | Video de Google Flow | 2 Hero, diapositiva 01    | —          | lateral   | 2560 × 1440 (16:9) + 1080 × 1920 (9:16). **Hoy: 1072 × 716 y 404 × 716 (insuficiente)** | recibido              | imagen generada con IA |
| `TF-HER-02` | —                                      | —                    | 2 Hero, diapositiva 02    | S o M      | frontal   | 2560 × 1440 + 1080 × 1920                                                               | pendiente             | a definir              |
| `TF-HER-03` | —                                      | —                    | 2 Hero, diapositiva 03    | S o M      | aérea     | 2560 × 1440 + 1080 × 1920                                                               | pendiente             | a definir              |
| `TF-HER-04` | —                                      | —                    | 2 Hero, diapositiva 04    | —          | frontal   | 2560 × 1440 + 1080 × 1920 (puede ser una obra real a medida)                            | pendiente             | a definir              |
| `TF-HER-V1` | portada.mp4 / portada.webm | Fotos reales de una obra de TRAZOFINO animadas con Gemini Pro (copia recibida por WhatsApp el 24/11/2026; respaldo en `docs/medios-originales/`) | 2 Hero: fondo de la diapositiva 01 y botón "Ver video" | — | frontal | Ideal 1920 × 1080 o más. **Hoy: 848 × 478** (pedir el original de Gemini) | aprobado (provisorio, elegido por el usuario) | imagen generada con IA |

### 4.3 Módulo S — 24 m² (03)

| **Código**    | **Archivo** | **Origen** | **Sección**                                           | **Modelo** | **Vista**                                    | **Resolución / proporción**                                          | **Estado** | **Tipo**                      |
| ------------- | ----------- | ---------- | ----------------------------------------------------- | ---------- | -------------------------------------------- | -------------------------------------------------------------------- | ---------- | ----------------------------- |
| `TF-MOD-S-01` | —           | —          | 5 Catálogo (tarjeta), 4 Tres caminos 01 (recorte 8:3) | S          | frontal                                      | 2400 × 1600 (3:2)                                                    | pendiente  | a definir                     |
| `TF-MOD-S-02` | —           | —          | Ficha `/modulos/s/`                                   | S          | lateral                                      | 2400 × 1600 (3:2)                                                    | pendiente  | a definir                     |
| `TF-MOD-S-03` | —           | —          | 3 Tu hogar, más cerca (alternativa) / ficha           | S          | frontal, al atardecer con interior iluminado | 2400 × 1600 (3:2)                                                    | pendiente  | a definir                     |
| `TF-MOD-S-04` | —           | —          | Ficha                                                 | S          | interior                                     | 2400 × 1600 (3:2). **Solo si el arquitecto aprueba la distribución** | pendiente  | a definir                     |
| `TF-MOD-S-05` | —           | —          | Ficha (plano)                                         | S          | planta                                       | Vector o PNG ≥ 2400 px. **Solo con aprobación del arquitecto**       | pendiente  | render arquitectónico / plano |

### 4.4 Módulo M — 48 m² (04)

| **Código**    | **Archivo** | **Origen** | **Sección**                               | **Modelo** | **Vista**                                    | **Resolución / proporción**                                          | **Estado** | **Tipo**                      |
| ------------- | ----------- | ---------- | ----------------------------------------- | ---------- | -------------------------------------------- | -------------------------------------------------------------------- | ---------- | ----------------------------- |
| `TF-MOD-M-01` | —           | —          | 5 Catálogo (tarjeta)                      | M          | frontal                                      | 2400 × 1600 (3:2)                                                    | pendiente  | a definir                     |
| `TF-MOD-M-02` | —           | —          | Ficha `/modulos/m/`                       | M          | lateral                                      | 2400 × 1600 (3:2)                                                    | pendiente  | a definir                     |
| `TF-MOD-M-03` | —           | —          | 3 Tu hogar, más cerca (principal) / ficha | M          | frontal, al atardecer con interior iluminado | 2400 × 1600 (3:2)                                                    | pendiente  | a definir                     |
| `TF-MOD-M-04` | —           | —          | Ficha                                     | M          | interior                                     | 2400 × 1600 (3:2). **Solo si el arquitecto aprueba la distribución** | pendiente  | a definir                     |
| `TF-MOD-M-05` | —           | —          | Ficha (plano)                             | M          | planta                                       | Vector o PNG ≥ 2400 px. **Solo con aprobación del arquitecto**       | pendiente  | render arquitectónico / plano |

### 4.5 Proyectos reales (05)

Objetivo: **5 fotos aprobadas por vivienda.** La `-01` es la portada (en carrusel 5:3; en la ficha, con su proporción original). Ruta actual en el proyecto: `src/assets/media/proyectos/casa-N/`. Al implementar, se renombra a `proyectos/vivienda-0N/{código}.jpg`.

| **Código**      | **Archivo actual en la web** | **Origen en Drive**                      | **Sección**          | **Modelo** | **Vista**                | **Resolución / proporción**                                             | **Estado**            | **Tipo**        |
| --------------- | ---------------------------- | ---------------------------------------- | -------------------- | ---------- | ------------------------ | ----------------------------------------------------------------------- | --------------------- | --------------- |
| `TF-PRY-V01-01` | casa-5/01-cocina.jpg         | CASA 5 (466) / `DSC02753.JPG`            | 6 Proyectos, portada | —          | interior                 | 2400 × 1598 (3:2) ✔                                                     | aprobado              | fotografía real |
| `TF-PRY-V01-02` | casa-5/02-comedor.jpg        | CASA 5 / `DSC02762.JPG`                  | Ficha Vivienda 01    | —          | interior                 | 2400 × 1598 ✔                                                           | aprobado              | fotografía real |
| `TF-PRY-V01-03` | casa-5/03-bano.jpg           | CASA 5 / `DSC02791.JPG`                  | Ficha Vivienda 01    | —          | interior                 | 2400 × 1598 ✔                                                           | aprobado              | fotografía real |
| `TF-PRY-V01-04` | —                            | CASA 5                                   | Ficha Vivienda 01    | —          | frontal (preferido)      | ≥ 2400 px                                                               | pendiente             | fotografía real |
| `TF-PRY-V01-05` | —                            | CASA 5                                   | Ficha Vivienda 01    | —          | a definir                | ≥ 2400 px                                                               | pendiente             | fotografía real |
| `TF-PRY-V02-01` | casa-4/01-fachada.jpg        | CASA 4 (547) / `20250723_173137.jpg`     | 6 Proyectos, portada | —          | frontal (**vertical**)   | 1350 × 2400 (9:16) ✔                                                    | aprobado              | fotografía real |
| `TF-PRY-V02-02` | casa-4/02-living.jpg         | CASA 4 / `20260310_132204.jpg`           | Ficha Vivienda 02    | —          | interior (**vertical**)  | 1350 × 2400 ✔                                                           | aprobado              | fotografía real |
| `TF-PRY-V02-03` | —                            | CASA 4                                   | Ficha Vivienda 02    | —          | lateral                  | ≥ 2400 px                                                               | pendiente             | fotografía real |
| `TF-PRY-V02-04` | —                            | CASA 4                                   | Ficha Vivienda 02    | —          | interior                 | ≥ 2400 px                                                               | pendiente             | fotografía real |
| `TF-PRY-V02-05` | —                            | CASA 4                                   | Ficha Vivienda 02    | —          | a definir                | ≥ 2400 px                                                               | pendiente             | fotografía real |
| `TF-PRY-V03-01` | casa-2/01-fachada.jpg        | CASA 2 (295) / `20240223_084748.jpg`     | 6 Proyectos, portada | —          | frontal                  | 2400 × 1350 (16:9) ✔                                                    | aprobado              | fotografía real |
| `TF-PRY-V03-02` | casa-2/02-patio.jpg          | CASA 2 / `20240223_084304.jpg`           | Ficha Vivienda 03    | —          | lateral                  | 2400 × 1350 ✔                                                           | aprobado              | fotografía real |
| `TF-PRY-V03-03` | casa-2/03-platea.jpg         | CASA 2 / `20230208_085759.jpg`           | Ficha Vivienda 03    | —          | obra                     | 2400 × 1350 ✔                                                           | aprobado              | fotografía real |
| `TF-PRY-V03-04` | —                            | CASA 2                                   | Ficha Vivienda 03    | —          | interior                 | ≥ 2400 px                                                               | pendiente             | fotografía real |
| `TF-PRY-V03-05` | —                            | CASA 2                                   | Ficha Vivienda 03    | —          | a definir                | ≥ 2400 px                                                               | pendiente             | fotografía real |
| `TF-PRY-V04-01` | casa-1/01-equipo-losa.jpg    | CASA 1 (107) / `20230728_152713 (1).jpg` | 6 Proyectos, portada | —          | obra                     | 2400 × 1350 ✔                                                           | aprobado              | fotografía real |
| `TF-PRY-V04-02` | casa-1/02-encofrado.jpg      | CASA 1 / `20230721_155759.jpg`           | Ficha Vivienda 04    | —          | obra                     | 2400 × 1350 ✔                                                           | aprobado              | fotografía real |
| `TF-PRY-V04-03` | casa-1/03-bano.jpg           | CASA 1 / `IMG-20240417-WA0053.jpg`       | Ficha Vivienda 04    | —          | interior                 | **1600 × 1200: por debajo del mínimo** (pedir el original sin WhatsApp) | aprobado (provisorio) | fotografía real |
| `TF-PRY-V04-04` | —                            | CASA 1                                   | Ficha Vivienda 04    | —          | frontal (obra terminada) | ≥ 2400 px                                                               | pendiente             | fotografía real |
| `TF-PRY-V04-05` | —                            | CASA 1                                   | Ficha Vivienda 04    | —          | a definir                | ≥ 2400 px                                                               | pendiente             | fotografía real |

Totales: **11 aprobadas y 9 pendientes.** La CASA 3 (297) queda fuera hasta que haya fotos originales de calidad. Si llegan, pasa a ser `V05`.

### 4.6 Arquitectura y servicios (06)

| **Código**  | **Archivo** | **Origen**                                                 | **Sección**                                                    | **Modelo** | **Vista**                                     | **Resolución / proporción** | **Estado**           | **Tipo**                      |
| ----------- | ----------- | ---------------------------------------------------------- | -------------------------------------------------------------- | ---------- | --------------------------------------------- | --------------------------- | -------------------- | ----------------------------- |
| `TF-SRV-01` | —           | Recorte de `TF-MOD-S-01` o `TF-MOD-M-01`                   | 4 Tres caminos, 01 Viviendas modulares                         | S o M      | frontal                                       | 1600 × 600 (8:3)            | pendiente            | a definir                     |
| `TF-SRV-02` | —           | Puede salir de una obra real (por ejemplo `TF-PRY-V03-01`) | 4 Tres caminos, 02 Proyectos a medida                          | —          | frontal                                       | 1600 × 600 (8:3)            | recibido (candidata) | fotografía real               |
| `TF-SRV-03` | —           | —                                                          | 4 Tres caminos, 03 Asesoramiento y gestiones; página Servicios | —          | planta (planos y documentación sobre la mesa) | 1600 × 600 (8:3)            | pendiente            | fotografía real (recomendado) |

### 4.7 Banda de cierre (07)

| **Código**  | **Archivo** | **Origen** | **Sección**               | **Modelo** | **Vista**                                           | **Resolución / proporción**               | **Estado** | **Tipo**  |
| ----------- | ----------- | ---------- | ------------------------- | ---------- | --------------------------------------------------- | ----------------------------------------- | ---------- | --------- |
| `TF-CIE-01` | —           | —          | 8 Hablemos de tu proyecto | —          | exterior: terraza de madera con plantas, luz cálida | 2560 × 512 (5:1) + `-M` 1080 × 1350 (4:5) | pendiente  | a definir |

### 4.8 Isométricos y crecimiento (08)

Se dibujan en SVG a partir de las medidas exteriores aprobadas. No muestran estructura ni detalles técnicos y llevan la nota de la spec D6.

| **Código**  | **Archivo** | **Origen**                  | **Sección**                     | **Modelo** | **Vista**          | **Resolución / proporción** | **Estado** | **Tipo**                        |
| ----------- | ----------- | --------------------------- | ------------------------------- | ---------- | ------------------ | --------------------------- | ---------- | ------------------------------- |
| `TF-ISO-01` | —           | Medidas exteriores de S y M | 5 Catálogo: "Módulo individual" | S / M      | aérea (isométrica) | SVG, 3:1                    | pendiente  | render arquitectónico (esquema) |
| `TF-ISO-02` | —           | Ídem                        | 5 Catálogo: "Conexión lateral"  | S + M      | aérea (isométrica) | SVG, 3:1                    | pendiente  | render arquitectónico (esquema) |
| `TF-ISO-03` | —           | Ídem                        | 5 Catálogo: "Dos niveles"       | S / M      | aérea (isométrica) | SVG, 3:1                    | pendiente  | render arquitectónico (esquema) |

### 4.9 Íconos (se dibujan en el proyecto, no van a Drive)

`TF-ICO-01` superficie · `02` fábrica · `03` camión · `04` casa / instalación · `05` plano / diseño · `06` compás · `07` documento · `08` barrio · `09` WhatsApp · `10` Instagram · `11` LinkedIn · `12` YouTube · `13` play · `14` flecha · `15` flecha de carrusel izquierda · `16` flecha de carrusel derecha · `17` volver arriba · `18` cerrar diálogo. Estilo: SVG de 24 × 24, trazo de 1,5 px, color `--bronce` y extremos redondeados. Estado: **pendiente**.

### 4.10 Resumen

| **Grupo** | **Necesarias** |      **Aprobadas** | **Recibidas sin aprobar** | **Pendientes**            |
| --------- | -------------: | -----------------: | ------------------------- | ------------------------- |
| MAR       |              2 |                  2 | —                         | original en alta del logo |
| HER       |      4 + video | video (provisorio) | 1 (baja resolución)       | 3                         |
| MOD-S     |              5 |                  0 | 0                         | 5                         |
| MOD-M     |              5 |                  0 | 0                         | 5                         |
| PRY       |             20 |                 11 | 0                         | 9                         |
| SRV       |              3 |                  0 | 1 candidata               | 2                         |
| CIE       |              1 |                  0 | 0                         | 1                         |
| ISO       |              3 |                  0 | 0                         | 3                         |
| ICO       |             18 |                  0 | —                         | 18 (SVG propios)          |

---

## 5. Acceso de Claude Code a Google Drive (investigado)

### 5.1 Qué se verificó

Verificado el 17/11/2026 en este entorno (sesión en la nube de Claude Code, con el conector de Google Drive conectado a la cuenta de Christian):

| **Capacidad**                                                                 | **Resultado**                                                       | **Evidencia**                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Buscar carpetas por nombre                                                    | **Funciona**                                                        | Encontró `FOTOS PROYECTOS TF CONSTRUCTORA` y sus 5 subcarpetas                                                                                                                                                      |
| Leer metadatos (dueño, tamaño, fechas)                                        | **Funciona**                                                        | Dueño `estudio.tfarquitectura`; la cuenta conectada ve la carpeta compartida                                                                                                                                        |
| Descargar el archivo original                                                 | **Funciona, de a uno**                                              | `IMG-20240417-WA0053.jpg`: 344.276 bytes descargados, idéntico al original. Fotos de 7 MB (5456 × 3632) también                                                                                                     |
| Revisar visualmente                                                           | **Funciona**                                                        | Cada descarga muestra la imagen a Claude, que la puede evaluar                                                                                                                                                      |
| **Listar todo el contenido de una carpeta ajena**                             | **No funciona completo**                                            | En CASA 1 (107 archivos) devolvió solo 12, y todos tenían fecha de "visto por mí". Conclusión observada: solo aparecen los archivos que la cuenta conectada **abrió alguna vez**. En total se vieron \~60 de \~1700 |
| Videos                                                                        | **No probado**                                                      | —                                                                                                                                                                                                                   |
| Descarga directa por URL (`drive.google.com`, `drive.usercontent.google.com`) | **Bloqueada** por la red del entorno                                | El proxy rechaza la conexión                                                                                                                                                                                        |
| API de Drive (`www.googleapis.com`)                                           | Accesible, pero **requiere credenciales** que no están configuradas | Respuesta 403: "missing a valid API key"                                                                                                                                                                            |
| Escribir en Drive                                                             | No probado y **no se usará**                                        | La carpeta permite agregar archivos, pero el flujo no lo necesita                                                                                                                                                   |
| Estructura de §2                                                              | **No existe todavía**                                               | La búsqueda de `01_IDENTIDAD_DE_MARCA`, `HERO_Y_PORTADA` y `APROBADOS_PARA_WEB` no devolvió resultados                                                                                                              |

### 5.2 Cómo listar, revisar y descargar (con el conector)

1. **Ubicar la carpeta:** buscar por nombre (`title contains '09_APROBADOS_PARA_WEB'`) y guardar su ID.
2. **Listar:** buscar `parentId = '<ID>'` con paginación y anotar código, nombre, tamaño y tipo.
3. **Comparar con el inventario (§4):** detectar faltantes, sobrantes o nombres que no siguen §3.2.
4. **Descargar de a un archivo** con el conector. Queda en una carpeta temporal de la sesión, no en el repositorio.
5. **Revisar** según §6.2 y procesar según §6.3.
6. **Informar** qué se procesó y qué quedó observado.

### 5.3 Cómo evitar el límite de listado

El listado completo falla con archivos de **otra cuenta** que la cuenta conectada no abrió. Para la carpeta `09_APROBADOS_PARA_WEB` hay tres opciones, en orden de preferencia:

| **Opción**          | **Cómo**                                                                                                                                                                                                                                               | **Estado**                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| **A (recomendada)** | Christian crea `TRAZOFINO_WEB_MEDIOS` en su Drive y la comparte con estudio TF. Para aprobar, Christian usa **"Hacer una copia"** del original y la mueve a `09` con el nombre del código. La copia es suya, así que el listado debería verla completa | **A verificar con una prueba piloto de 3 archivos** antes de adoptarla                                            |
| B                   | Si A no alcanza: Christian **abre una vez** cada archivo de `09` (vista previa en Drive). Es viable porque `09` tiene pocas decenas de archivos                                                                                                        | Coherente con lo observado                                                                                        |
| C                   | Christian le pasa a Claude los **enlaces o IDs** de cada archivo aprobado (Drive → Compartir → Copiar vínculo). Se descarga directamente por ID, sin depender del listado                                                                              | **A verificar:** la descarga por ID funcionó, pero solo se probó con archivos que también aparecían en el listado |

### 5.4 Alternativas sin el conector

Si el conector deja de estar disponible:

1. **ZIP:** en Drive web, botón derecho sobre `09_APROBADOS_PARA_WEB` → **Descargar** (Drive arma un ZIP). Después, el ZIP se le entrega a Claude por el medio que la sesión permita (adjunto en la conversación o carpeta compartida desde la computadora). No se sube al repositorio.
2. **Carpeta sincronizada:** con **Google Drive para escritorio** en la computadora de Christian, se sincroniza `09_APROBADOS_PARA_WEB`. Esa carpeta se comparte con la sesión desde la app de escritorio de Claude (Configuración → Claude Code → Remote Control). Esta función puede no estar disponible para todas las cuentas: confirmarlo al momento de usarla.
3. **API de Drive con credenciales:** requiere crear una credencial en Google Cloud y habilitar el dominio en el entorno. Es la opción más trabajosa: solo conviene si el volumen crece mucho.

En todos los casos, los originales siguen en Drive. La sesión trabaja sobre copias temporales que se borran al terminar.

---

## 6. Flujo de trabajo de imágenes

### 6.1 Estados y responsables

```
pendiente ──(llega a 01–08)──▶ recibido ──(control técnico §6.2)──▶ revisado ──(OK de los socios + copia a 09)──▶ aprobado ──▶ procesado y publicado en la vista previa
```

| **Paso**                                                              | **Quién**                     |
| --------------------------------------------------------------------- | ----------------------------- |
| Subir originales a 01–08                                              | estudio TF / Christian        |
| Control técnico (§6.2) y propuesta de selección con hoja de contactos | Claude                        |
| Aprobación visual                                                     | Christian                     |
| Aprobación de imágenes de módulos, plantas e isométricos              | Arq. Sebastian Gonzalez       |
| Copia a `09` con el código                                            | Christian (opción A)          |
| Procesamiento y vista previa                                          | Claude                        |
| Publicación en producción                                             | Solo con aprobación explícita |

### 6.2 Control técnico (de `recibido` a `revisado`)

- Resolución mínima y proporción de §4. Las fotos de WhatsApp quedan descartadas cuando exista el original.
- Orientación correcta. Las verticales se mantienen verticales.
- Sin personas identificables sin consentimiento, sin objetos personales ni fotos familiares, sin cables o cajas eléctricas a la vista, sin desorden evidente.
- Enfoque, exposición y horizonte aceptables.
- Tipo identificado: fotografía real, render arquitectónico o IA.
- En los módulos: que no se muestre nada que el arquitecto no haya aprobado (spec §0).

### 6.3 Procesamiento para la web

1. Rotar según la orientación real (EXIF) y recortar **solo** con un encuadre aprobado.
2. Redimensionar: lado mayor de **2400 px** (hero **2560 px**), calidad JPEG 86 progresivo.
3. **Quitar todos los metadatos** (EXIF y GPS).
4. Guardar en `src/assets/media/{grupo}/{código}.jpg`. Por ejemplo, proyectos/vivienda-01/TF-PRY-V01-01.jpg o modulos/s/TF-MOD-S-01.jpg.
5. Astro genera AVIF y WebP en 480 / 800 / 1200 / 1600 / 2400 px con carga diferida.
6. Video: H.264 + VP9 en `public/media/video/`, sin audio, con póster propio.
7. Actualizar el **estado** y el **archivo** en §4.

### 6.4 Almacenamiento

- **Hoy:** las versiones optimizadas viven en el repositorio (\~0,3–0,9 MB por imagen; \~60 imágenes ≈ 35 MB). Cloudflare las sirve con caché inmutable.
- **Si el volumen crece** (muchos proyectos o videos): bucket `medios` de Supabase Storage (ya existe, de lectura pública) o Cloudflare R2, **solo con versiones optimizadas**.
- **Nunca:** originales en el repositorio, ni enlaces de Drive en el sitio.

---

## 7. Próximos pasos (después de tu aprobación)

1. Christian crea `TRAZOFINO_WEB_MEDIOS` con las carpetas de §2.
2. Prueba piloto de la opción A con 3 archivos, para verificar el listado completo de `09`.
3. Estudio TF carga el material pendiente de §4: prioridad para los módulos S y M, el hero, las fotos de proyectos hasta llegar a 5 por vivienda y la banda de cierre.
4. Claude revisa, propone la selección con hoja de contactos y, una vez aprobada, procesa e implementa según el plan de la spec §8.
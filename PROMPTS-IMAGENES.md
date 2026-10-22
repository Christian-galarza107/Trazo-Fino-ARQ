# Prompts para renders del Módulo S y el Módulo M
Para Nano Banana (Gemini), Google Flow / Imagen / Veo u otras herramientas similares.

## Antes de generar: reglas
1. **No inventar el producto.** Los prompts tienen campos `[COMPLETAR]`. Completalos con datos reales (forma, cubierta, revestimiento, aberturas, cantidad de ambientes). Si no están confirmados, generá imágenes de **ambiente o concepto**, no de "la casa".
2. **Si ya tenés fotos o planos reales,** usalos como **imagen de referencia** y pedí conservar geometría, proporciones, aberturas y materiales. Nano Banana permite editar a partir de una foto.
3. **Superficie:** el Módulo S tiene 24 m² y el Módulo M tiene 48 m². Una imagen que muestre una casa claramente más grande o de dos plantas sería engañosa.
4. **Rotulado:** en el sitio declará cada render como `origen: 'render-ia'`. Se mostrará "Render ilustrativo generado con IA".
5. **Contenido prohibido:** marcas, logotipos de terceros, personas reconocibles y textos dentro de la imagen.

## Estilo común (agregar al final de cada prompt)
```
Architectural photography style, natural light, soft shadows, calm and minimal composition,
generous negative space, warm ivory, stone, sand and natural wood palette, matte materials,
realistic proportions, 35mm lens, eye-level camera, no people, no text, no logos, no watermark,
photorealistic, high detail, editorial architecture magazine aesthetic.
```
**Negativo (si la herramienta lo permite):** `cartoon, CGI look, oversaturated, HDR, fisheye, distorted proportions, two-storey, mansion, luxury villa, pool, text, watermark, people, cars`

## Formatos de salida
| Uso | Proporción | Mínimo | Carpeta |
|---|---|---|---|
| Portada del módulo / galería | 16:9 | 2400 × 1350 | `src/assets/media/modulos/<s|m>/exterior/` |
| Tarjeta Módulo S (inicio) | 4:5 | 2000 × 2500 | `…/s/exterior/` |
| Tarjeta Módulo M (inicio) | 3:2 | 2400 × 1600 | `…/m/exterior/` |
| Interiores | 16:9 o 3:2 | 2400 px de ancho | `…/<s|m>/interior/` |
| Detalles | 3:2 o 1:1 | 2000 px | `…/<s|m>/detalles/` |
| Portada del sitio | 16:9 (video 21:9 opcional) | 2560 × 1440 | `src/assets/media/portada/` |

---

## Módulo S · 24 m² · vivienda modular compacta

**S-EXT-01 · Exterior, luz de mañana (portada)**
```
A compact single-storey modular house of approximately 24 square metres, [COMPLETAR: shape, e.g. rectangular volume],
[COMPLETAR: roof type], [COMPLETAR: exterior cladding material and colour], [COMPLETAR: window and door layout],
set on a gentle grassy plot in the Buenos Aires countryside, low native grasses, a few young trees,
morning light from the side, three-quarter view, the house occupying one third of the frame.
```
**S-EXT-02 · Exterior, atardecer (tarjeta vertical 4:5)**
```
Same compact 24 m² modular house, vertical composition, golden hour light, warm glow from the interior
through the windows, long soft shadows on the grass, sky in pale sand tones, quiet and intimate atmosphere.
```
**S-INT-01 · Interior, ambiente principal**
```
Interior of a compact 24 m² modular home, [COMPLETAR: confirmed layout, e.g. open living and kitchen],
[COMPLETAR: floor material], [COMPLETAR: wall finish], large window framing the landscape,
minimal furniture in light wood and linen, ivory and sand palette, diffuse daylight, sense of calm and order.
```
**S-DET-01 · Detalle de materiales**
```
Close-up architectural detail of a modular house: junction between [COMPLETAR: cladding material] and a
window frame, fine shadow line, texture visible, shallow depth of field, soft side light.
```

## Módulo M · 48 m² · vivienda modular de mayor superficie

**M-EXT-01 · Exterior (portada 16:9)**
```
A single-storey modular house of approximately 48 square metres, twice the size of a 24 m² module,
[COMPLETAR: shape, e.g. elongated volume or two joined volumes], [COMPLETAR: roof], [COMPLETAR: cladding],
[COMPLETAR: openings], on a wide open plot with native grasses, soft afternoon light, frontal-oblique view,
horizon low in the frame, generous sky.
```
**M-EXT-02 · Exterior con galería (tarjeta 3:2)**
```
Same 48 m² modular house seen from the garden, [COMPLETAR: covered porch or deck only if confirmed],
late afternoon light, warm wood tones, calm landscaped surroundings.
```
**M-INT-01 · Interior, estar-comedor**
```
Interior of a 48 m² modular home, [COMPLETAR: confirmed layout], living and dining area with a table in
natural oak, [COMPLETAR: floor], [COMPLETAR: walls], wide window to the landscape, ivory, stone and wood palette,
soft daylight, architectural editorial style.
```
**M-INT-02 · Interior, dormitorio**
*(Usar solo si el dormitorio está confirmado.)*
```
Bedroom inside a 48 m² modular home, [COMPLETAR], linen bedding in sand tones, wooden headboard,
window with view to grass and trees, morning light, serene minimal atmosphere.
```
**M-DET-01 · Detalle**
```
Architectural detail of a modular home: [COMPLETAR: e.g. eave, corner, door handle, wood ceiling],
fine lines and precise joints, soft shadow, macro photography, stone and wood palette.
```

---

## Portada del sitio y fondos editoriales
**HERO-01 · Paisaje panorámico (imagen o primer cuadro del video)**
```
Wide panoramic landscape at dawn in the Argentine pampas, low horizon line at 60% of the frame,
soft mist, pale sand and stone colour palette, a subtle architectural presence in the far right third
[COMPLETAR: only include a module if its appearance is confirmed], cinematic, calm, generous negative space on the left for a headline.
```
**HERO-VIDEO (Veo / Flow) · 8 segundos en loop**
```
Slow lateral dolly shot, 8 seconds, across a calm grassy landscape at golden hour, gentle breeze in the grass,
[COMPLETAR: modular house only if confirmed], no camera shake, no people, no text, seamless loop, cinematic natural light.
```
Después de generarlo: `npm run media:optimize -- video.mp4`, y ver `CONTENIDOS.md` para subirlo.

**FONDO-ESTUDIO-01 · Mesa de trabajo**
```
Overhead view of an architect's desk: printed floor plans, a fine technical pen, scale ruler, material samples
in stone, sand and natural wood, soft daylight, minimal composition, no readable text, no logos.
```

## Edición a partir de fotos reales (Nano Banana)
```
Using the attached photo of our modular house as reference, keep the exact geometry, proportions, roof,
openings and materials. Only change: [lighting to golden hour / clean the surroundings / remove construction debris].
Do not add or remove windows, doors, decks or volumes.
```

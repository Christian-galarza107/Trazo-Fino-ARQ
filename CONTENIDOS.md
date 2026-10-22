# Dónde se modifica cada dato

Todo el contenido está en archivos separados del código. Después de editar, hacé `git commit` + `git push`: Cloudflare Pages vuelve a publicar el sitio en uno o dos minutos.

| Qué querés cambiar | Archivo |
|---|---|
| Teléfono, WhatsApp, correo, dirección, horario | `src/config/sitio.ts` → `contacto` |
| Redes sociales (Instagram, Facebook, LinkedIn, YouTube) | `src/config/sitio.ts` → `redes` (pegar la URL completa) |
| Equipo (nombre, rol, foto) | `src/config/sitio.ts` → `equipo` |
| Dominio | `src/config/dominio.mjs` (o la variable `PUBLIC_SITE_URL`) |
| Módulo S y Módulo M: nombre, superficie, categoría, descripciones, especificaciones, materiales, personalización, plano, fotos, video | `src/content/modulos.ts` |
| Proyectos del estudio (portafolio) | `src/content/proyectos.ts` |
| Video e imágenes de portada y fondos editoriales | `src/content/portada.ts` |
| Textos institucionales, títulos, botones, formulario y SEO | `src/content/textos/es.ts` (y `en.ts`, `pt.ts`) |
| Política de privacidad | `src/content/textos/*.ts` → `privacidad` |

Un valor `null` o una lista vacía `[]` significa "dato pendiente". El sitio lo oculta o muestra un estado pendiente, nunca un dato inventado.

## Agregar una especificación real
En `src/content/modulos.ts`, dentro del módulo:
```ts
especificaciones: [
  { etiqueta: { es: 'Medidas exteriores', en: 'External dimensions', pt: 'Medidas externas' }, valor: { es: '…' }, confirmado: true },
],
```
Solo se muestran las que tienen `confirmado: true`. Las que estén confirmadas en ambos módulos con la misma etiqueta aparecen también en el comparador.

## Materiales y terminaciones
Mismo formato que las especificaciones, en `materiales: [...]`.

## Opciones de personalización
`personalizacion` lista las opciones posibles. Las marcadas `estado: 'pendiente'` llevan la etiqueta "A confirmar". Cambiá a `'aprobada'` cuando estén confirmadas.

## Imágenes
1. Guardá la imagen (JPG/PNG/WebP, mínimo 2400 px del lado mayor) en la carpeta que corresponda:

   ```
   src/assets/media/
   ├─ portada/                    portada y fondos editoriales
   ├─ modulos/s/exterior/         Módulo S · exterior
   ├─ modulos/s/interior/         Módulo S · interior
   ├─ modulos/s/detalles/         Módulo S · detalles
   ├─ modulos/s/plano/            Módulo S · plano
   ├─ modulos/m/…                 (lo mismo para el Módulo M)
   ├─ proyectos/<slug>/           cada proyecto
   └─ estudio/                    fotos del equipo y del estudio
   ```

2. Declarala en el archivo de contenido:
   ```ts
   { archivo: 'modulos/s/exterior/01.jpg', alt: { es: 'Fachada del Módulo S al atardecer' }, origen: 'fotografia' }
   ```
   - `origen`: `'fotografia'` (obra real), `'render'` o `'render-ia'`. Los renders se rotulan en el sitio como **imagen ilustrativa**.
   - `foco` (opcional): encuadre en celulares, p. ej. `'60% 50%'`.

Astro genera automáticamente versiones AVIF y WebP en 480, 800, 1200, 1600 y 2400 px, con carga diferida y medidas fijas para no mover el diseño.

**Proporciones recomendadas:** portada de módulo 16:9 horizontal (se recorta en celular), galería 16:9, tarjetas 4:5 (S) y 3:2 (M), plano cuadrado o libre.

## Video de portada
1. Optimizá: `npm run media:optimize -- ruta/video.mp4` (requiere ffmpeg). Genera MP4, WebM y póster en `media-out/`.
2. Copiá los archivos a `public/media/video/`.
3. En `src/content/portada.ts`:
   ```ts
   video: { mp4: '/media/video/portada.mp4', webm: '/media/video/portada.webm', poster: '/media/video/portada-poster.webp', origen: 'render-ia' },
   ```
Ideal: 6 a 12 segundos en loop, sin audio y de menos de 4 MB. No se reproduce si el visitante activó "ahorro de datos" o "reducir movimiento".

## Proyectos
Copiá el ejemplo comentado de `src/content/proyectos.ts`, completalo y poné `publicado: true`. Los proyectos de `demostraciones` solo se ven con `PUBLIC_MOSTRAR_DEMOS=true`, siempre rotulados, y nunca se publican.

## Lanzamiento
Mientras `PUBLIC_SITE_LAUNCHED` no sea `true`:
- se muestra el aviso "Versión preliminar · Contenidos en revisión";
- todas las páginas llevan `noindex`;
- `robots.txt` bloquea a los buscadores.

Los textos marcados `// BORRADOR` en `textos/*.ts` deben aprobarse antes del lanzamiento.

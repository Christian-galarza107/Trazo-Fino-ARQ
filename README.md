# Trazo Fino Arquitectura — sitio web oficial

Sitio comercial de **Trazo Fino Arquitectura** (www.trazofinoarq.com). Su objetivo principal es generar consultas de venta de casas modulares (**Módulo S · 24 m²** y **Módulo M · 48 m²**). También muestra el portafolio del estudio.

- **Tecnologías:** Astro 7 (sitio estático) + TypeScript + CSS propio basado en tokens.
- **Despliegue:** Cloudflare Pages, con una Pages Function para las consultas.
- **Base de datos:** Supabase guarda las consultas y deja preparadas las tablas para el panel de la fase 2.
- **Idiomas:** español (principal, sin prefijo en las URLs), inglés (`/en/`) y portugués (`/pt/`).

## Requisitos
- Node.js **22.23.4 o superior** (recomendado 24, ver `.nvmrc`)
- npm 10 o superior

## Uso
```bash
npm install
npm run dev            # desarrollo en http://localhost:4321
npm run check          # chequeo de tipos
npm run build          # producción → dist/
npm run preview        # sirve dist/
npm run preview:cf     # sirve dist/ con la función /api/consulta (Wrangler)
npm run media:optimize -- <archivo|carpeta>   # optimiza fotos y videos (ffmpeg para video)
```

## Páginas
| Español | Contenido |
|---|---|
| `/` | Portada, presentación, viviendas modulares, módulos S y M, enfoque, proyectos, proceso, cotización |
| `/modulos/` | Ambos módulos y comparador |
| `/modulos/s/` · `/modulos/m/` | Ficha: portada, datos confirmados, galería exterior/interior/detalles, plano, especificaciones, materiales, personalización, formulario contextual, otro módulo |
| `/proyectos/` · `/proyectos/<slug>/` | Portafolio del estudio (estado vacío hasta cargar obras reales) |
| `/estudio/` | Enfoque, equipo, visión, servicios |
| `/contacto/` | Formulario + WhatsApp + correo |
| `/privacidad/` | Política de privacidad (borrador editable) |

## Dónde se edita cada cosa
Ver **[docs/CONTENIDOS.md](docs/CONTENIDOS.md)**. Resumen:
- `src/config/sitio.ts`: contacto, WhatsApp, correo, redes y equipo
- `src/content/modulos.ts`: Módulo S y Módulo M
- `src/content/proyectos.ts`: portafolio
- `src/content/portada.ts`: video e imágenes de portada
- `src/content/textos/{es,en,pt}.ts`: todos los textos y el SEO
- `src/assets/media/…`: imágenes, organizadas por módulo y categoría

## Estructura
```
src/
  config/        Configuración central (contacto, redes, equipo, dominio)
  content/       Contenido editable (módulos, proyectos, portada, textos por idioma)
  assets/media/  Imágenes (se optimizan solas a AVIF/WebP responsive)
  components/    Logo, Header, Pie, Medio, Titulo, FormConsulta, Comparador, BarraMovil…
  views/         Una vista por tipo de página
  pages/         Enrutador multilenguaje ([...ruta].astro), 404, robots.txt
  lib/           Tipos, i18n, medios
  styles/        Sistema visual (global.css)
functions/api/   consulta.ts → Supabase
supabase/        Migraciones SQL (esquema, datos confirmados, seguridad)
public/          favicon, imagen OG, cabeceras de seguridad, video
docs/            Contenidos, despliegue, Supabase, prompts de imágenes, referencias
```

## Variables de entorno
Ver `.env.example`. **No hay claves privadas en el repositorio.**

| Variable | Uso |
|---|---|
| `PUBLIC_SITE_URL` | Dominio para canonical, sitemap y Open Graph |
| `PUBLIC_SITE_LAUNCHED` | `false`: sitio en preparación, con noindex y aviso. `true`: lanzamiento |
| `PUBLIC_MOSTRAR_DEMOS` | Muestra proyectos de demostración (solo para revisar el diseño) |
| `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` | Envío de consultas a Supabase |
| `PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Anti-spam opcional |

## Criterios de contenido
- **No se inventan datos.** Solo se publica lo confirmado: nombre, superficie y categoría de cada módulo, y los datos de contacto. Lo demás se muestra como pendiente.
- **Los renders generados con IA** se rotulan "Render ilustrativo generado con IA".
- **Los proyectos de demostración** nunca se publican. La base de datos lo impide con una restricción.
- **Los textos `// BORRADOR`** requieren aprobación antes del lanzamiento.

## Despliegue
Ver **[docs/DESPLIEGUE.md](docs/DESPLIEGUE.md)**. Cloudflare Pages: preset Astro · rama `main` · `npm run build` · salida `dist`.

## Calidad medida
Medido el 22/10/2026 con Lighthouse en móvil, sobre el build local:
- **Inicio, módulos, S, M, proyectos, estudio, contacto, `/en/` y `/pt/modulos/m/`:** 100 en rendimiento, accesibilidad, buenas prácticas y SEO, con CLS 0. El SEO se midió en un build marcado como lanzado: el build de preparación bloquea a los buscadores a propósito.
- **24 páginas × 6 anchos (360, 390, 430, 768, 1024 y 1440 px):** sin desplazamiento horizontal y sin errores de JavaScript.
- **Dependencias:** `npm audit` sin vulnerabilidades.

Volvé a medir una vez cargadas las imágenes y el video reales.

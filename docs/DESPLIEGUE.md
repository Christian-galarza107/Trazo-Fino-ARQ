# Despliegue: GitHub → Cloudflare Pages → dominio

> Antes de publicar o tocar el DNS, confirmá el nombre **exacto** del dominio registrado (¿`trazofinoarq.com`? ¿`.com.ar`?) y quién es el registrador.

## 1. GitHub
Repositorio: `github.com/Christian-galarza107/trazo-fino-arq` (rama `main`).

```bash
git clone https://github.com/Christian-galarza107/trazo-fino-arq.git
cd trazo-fino-arq
npm install
npm run dev        # http://localhost:4321
npm run build      # salida en dist/
```

## 2. Cloudflare Pages
1. Ingresá a https://dash.cloudflare.com con `christianoscar107@gmail.com`.
2. **Workers & Pages → Create → Pages → Connect to Git** → autorizá GitHub → elegí `trazo-fino-arq`.
3. Configuración de build:

   | Campo | Valor |
   |---|---|
   | Framework preset | Astro |
   | Production branch | `main` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |

4. **Settings → Variables and Secrets** (Production y Preview):

   | Variable | Valor | Tipo |
   |---|---|---|
   | `NODE_VERSION` | `24` | Texto |
   | `PUBLIC_SITE_URL` | `https://trazofinoarq.com` (debe coincidir con el dominio principal) | Texto |
   | `PUBLIC_SITE_LAUNCHED` | `false` (pasar a `true` al lanzar) | Texto |
   | `SUPABASE_URL` | `https://xejncuwncervzxtusqah.supabase.co` | Texto |
   | `SUPABASE_PUBLISHABLE_KEY` | Clave publicable (Supabase → Project Settings → API Keys) | Texto |
   | `SUPABASE_SECRET_KEY` | Clave secreta (Supabase → API Keys → Secret key). Recomendada; necesaria para la migración 0005. Ver `SEGURIDAD.md` | **Secret** |
   | `PUBLIC_TURNSTILE_SITE_KEY` | Opcional (anti-spam) | Texto |
   | `TURNSTILE_SECRET_KEY` | Opcional (anti-spam) | **Secret** |

   La CSP se genera en el build: si cargás las claves de Turnstile, volvé a desplegar para que la política incluya `challenges.cloudflare.com`.

   Sin las variables de Supabase el sitio funciona igual, pero el formulario muestra "envío pendiente de configuración" y ofrece WhatsApp.

5. **Save and Deploy.** El sitio queda en `https://trazo-fino-arq.pages.dev` (con `noindex` mientras no se lance).

### Anti-spam (recomendado)
Cloudflare → **Turnstile → Add widget** → dominio `trazofinoarq.com` → modo "Managed". Copiá la Site key y la Secret key en las variables de arriba y volvé a desplegar.

### Analítica sin cookies (opcional)
Cloudflare → **Web Analytics → Add site** → elegí el proyecto de Pages.

## 3. Dominio propio (requiere tu aprobación)
1. Cloudflare → **Add a domain** → `trazofinoarq.com` → plan Free.
2. En tu registrador, reemplazá los **nameservers** por los dos que indica Cloudflare (la propagación puede tardar hasta 24 h).
3. Pages → proyecto → **Custom domains → Set up a domain**: agregá `www.trazofinoarq.com` y también `trazofinoarq.com`.
4. **Rules → Redirect Rules → Create** → plantilla "Redirect from root to WWW" (301).
5. **SSL/TLS** → modo **Full (strict)**. **Edge Certificates** → activá "Always Use HTTPS".

## 4. Lanzamiento
1. Aprobá los textos marcados `// BORRADOR` y cargá las imágenes reales (ver `CONTENIDOS.md`).
2. Cambiá `PUBLIC_SITE_LAUNCHED` a `true` → **Retry deployment**.
3. Google Search Console → agregá el dominio → enviá `https://www.trazofinoarq.com/sitemap-index.xml`.

## Prueba local con la función de consultas
```bash
cp .env.example .dev.vars      # completar SUPABASE_URL y SUPABASE_PUBLISHABLE_KEY
npm run build && npm run preview:cf
```

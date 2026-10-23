# Informe de seguridad — TRAZOFINO ARQUITECTURA
Fecha: 23/10/2026 · Rama: `mejora/seguridad-identidad-video` · Punto de recuperación: tag `respaldo-2026-10-23` (commit `f5e7a8f`, producción antes de los cambios).

Cada hallazgo indica cómo se verificó. Lo que no se pudo comprobar se marca **No verificado**.

## 1. Alcance y limitaciones
| Área | Estado |
|---|---|
| Código del repositorio, dependencias, build | Verificado |
| Supabase (RLS, funciones, storage, usuarios) | Verificado por SQL directo sobre el proyecto `xejncuwncervzxtusqah` |
| Cabeceras HTTP y función `/api/consulta` | Verificado localmente con Wrangler (mismo runtime que Cloudflare Pages) |
| Sitio publicado `trazofinoarq.com` | **No verificado.** La red de este entorno bloquea el dominio: no se pudieron comprobar HTTPS, redirecciones, TLS ni cabeceras en vivo |
| Panel de Cloudflare (WAF, reglas, Turnstile, Analytics) | **No verificado** (sin acceso a la cuenta) |
| Configuración de Supabase Auth (registro abierto, MFA, URLs) | **No verificado.** No es accesible por SQL; se revisa en el panel |
| MFA en GitHub, Cloudflare y Supabase | **No verificado** (cuentas personales) |

## 2. Hallazgos
| # | Riesgo | Hallazgo | Estado |
|---|---|---|---|
| 1 | **Medio** | Cualquiera con la clave publicable (pública por diseño) puede insertar consultas directamente en la API REST de Supabase, salteando `/api/consulta`, sus validaciones y Turnstile. RLS impide leerlas. | **Corrección preparada:** la función ya usa `SUPABASE_SECRET_KEY` (solo servidor) y la migración `…0005` quita el permiso público de inserción. **Requiere tu aprobación y cargar el secreto** |
| 2 | **Medio** | El límite anti-spam de la base era global (20 consultas / 10 min). Un abusador podía agotarlo y bloquear consultas legítimas. | **Corrección preparada** (migración `…0004`): límite por teléfono (5/h), global más amplio (30/10 min), descarte de duplicados y respuesta HTTP 429. Probado en transacción revertida |
| 3 | **Medio** | La CSP permitía `'unsafe-inline'` en scripts y estilos. | **Corregido:** los scripts en línea se autorizan por hash SHA-256 calculado en cada build. Los recursos ya no se incrustan como `data:` |
| 4 | **Medio** | La función `/api/consulta` aceptaba cualquier método. No limitaba tamaño ni tipo de contenido, no tenía cabeceras de seguridad propias ni tiempo límite con Supabase. | **Corregido:** solo `POST`, mismo origen obligatorio, JSON, máximo 16 KB, limpieza de caracteres de control, CSP `default-src 'none'`, tiempo límite de 8 s y Turnstile con verificación del dominio |
| 5 | **Bajo** | El JSON-LD se insertaba sin escapar `<`. Hoy el contenido es propio, pero un texto con `</script>` habría roto la página. | **Corregido** (escape de `<`, U+2028 y U+2029) |
| 6 | **Bajo** | HSTS con `includeSubDomains` sin poder verificar los subdominios. | **Corregido:** `max-age=31536000` sin `includeSubDomains` ni `preload` |
| 7 | **Bajo** | Los despliegues de vista previa (`*.pages.dev`) eran indexables. | **Corregido:** `X-Robots-Tag: noindex` por host |
| 8 | **Bajo** | `tocar_actualizado()` (trigger) era ejecutable por `anon`. Sin impacto práctico. | **Corrección preparada** (migración `…0004`) |
| 9 | **Bajo** | Las escrituras administrativas no exigían MFA. Hoy no hay usuarios ni administradores. | **Corrección preparada:** `privado.es_admin()` y `privado.puede_editar()` exigen sesión `aal2` (MFA) |
| 10 | **Informativo** | **No existe panel administrativo** en este repositorio: no hay rutas `/admin` ni login. Supabase: 0 usuarios, 0 administradores, 0 factores MFA. | Sin acción. La protección de datos ya está en la base (RLS). Ver §5 |
| 11 | **Informativo** | Ningún secreto en el historial de Git (todos los commits revisados) ni en el sitio compilado. `.env` y `.dev.vars` están ignorados. | Verificado |
| 12 | **Informativo** | `npm audit`: 0 vulnerabilidades (Astro 7.4.2). | Verificado |

## 3. Estado de Supabase (verificado por SQL)
- **RLS:** activo en las 5 tablas públicas: `ajustes`, `modulos`, `proyectos`, `consultas`, `administradores`.
- **Visitante (`anon`):**
  - lee `ajustes` (marca y contacto, datos ya públicos en el sitio);
  - lee `modulos` y `proyectos` solo en estado `publicado`;
  - **no** lee `consultas` ni `administradores`;
  - **no** modifica ni borra nada.
- **Escritura de contenido:** solo administradores (`privado.es_admin()`, en un esquema no expuesto en la API).
- **Storage `medios`:** bucket público de lectura, para las imágenes del sitio. Subir, modificar o borrar es solo para administradores. No hay buckets privados.
- **Usuarios:** 0 · Administradores: 0 · Factores MFA: 0.
- **Migraciones 0004 y 0005:** **no aplicadas**. Se probaron en producción dentro de transacciones que terminan en error forzado, así que todo se revirtió y se comprobó después que la base quedó intacta:
  1. Una consulta duplicada se descarta.
  2. La sexta del mismo teléfono en 1 h se rechaza con PT429 (HTTP 429).
  3. Un administrador **sin MFA** no modifica nada.
  4. Un administrador **con MFA** modifica, y queda registrado con su autor y el cambio.
  5. Un editor con MFA modifica contenido, pero no ve consultas ni borra.
  6. El visitante no modifica nada ni ve contenido en revisión.

## 4. Cabeceras HTTP (verificadas con Wrangler)
| Cabecera | Valor |
|---|---|
| Content-Security-Policy | `default-src 'self'`; `script-src 'self'` + hash + Cloudflare Analytics (+ Turnstile si se configura); `style-src 'self'`; `style-src-attr 'unsafe-inline'`*; `img-src 'self' data:`; `media-src 'self'`; `font-src 'self'`; `connect-src 'self'` + Analytics; `frame-src 'none'`; `object-src 'none'`; `base-uri 'self'`; `form-action 'self'`; `frame-ancestors 'none'`; `upgrade-insecure-requests` |
| X-Content-Type-Options | `nosniff` |
| X-Frame-Options | `DENY` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | cámara, micrófono, geolocalización, pagos, USB y sensores desactivados |
| Cross-Origin-Opener-Policy / Resource-Policy | `same-origin` |
| Strict-Transport-Security | `max-age=31536000` |

\* `style-src-attr 'unsafe-inline'` permite solo atributos `style="…"` (variables de animación y diseño). No ejecuta código y el sitio no renderiza HTML de terceros. Las etiquetas `<style>` y `<script>` siguen exigiendo hash.

Navegando todas las páginas con Chromium bajo esta política no hubo **ninguna violación de CSP**.

## 5. Panel administrativo
No existe en este proyecto; quedó para la fase 2. La base ya está preparada para construirlo de forma segura:
- **Autenticación:** Supabase Auth, con MFA obligatorio comprobado en la base (no en el navegador).
- **Roles:** `admin` gestiona todo. `editor` gestiona solo contenido y medios, sin consultas ni borrados.
- **Auditoría:** cada cambio queda en `registro_admin`, sin copiar datos personales de las consultas.
- **Navegador:** solo se usaría la clave publicable. La clave secreta queda en Cloudflare.

## 6. Tareas manuales pendientes (requieren tu intervención)
1. **Supabase → Authentication → Sign In / Providers:** desactivar "Allow new users to sign up".
2. **Supabase → Authentication → Multi-Factor:** habilitar TOTP.
3. **Consultas solo desde el servidor:**
   1. Supabase → Project Settings → API Keys → crear una **Secret key**.
   2. Cloudflare Pages → Settings → Variables and Secrets → `SUPABASE_SECRET_KEY` como **Secret**, en Production y Preview.
   3. Redesplegar y probar el formulario.
   4. Aprobar y aplicar la migración `20261023000005_consultas_solo_servidor.sql`.
4. **Migración `20261023000004_…`:** aprobarla para aplicarla. No afecta a los visitantes.
5. **Cloudflare Turnstile:** crear el widget, cargar `PUBLIC_TURNSTILE_SITE_KEY` y `TURNSTILE_SECRET_KEY`, y redesplegar. Con eso la verificación del token pasa a ser obligatoria.
6. **Cloudflare → Security → WAF → Rate limiting rules:** el plan Free incluye **1 regla**. Propuesta: ruta `/api/consulta`, método POST, 5 solicitudes cada 10 s por IP, acción *Block* durante 10 s.
7. **Cloudflare → Speed → Optimization:** dejar **desactivado** *Rocket Loader*, porque reescribe scripts y rompería la CSP. Si se activa *Email Address Obfuscation*, verificar que el sitio siga sin errores.
8. **SSL/TLS:** modo *Full (strict)* y *Always Use HTTPS* activados. Verificar en el panel: no lo pude comprobar.
9. **Cuentas:** activar MFA en GitHub, Cloudflare y Supabase, con un acceso individual por persona.
10. **Respaldos:** el plan Free de Supabase no incluye copias recuperables por el usuario. Exportar periódicamente la tabla `consultas` (Table Editor → Export CSV) o pasar a plan Pro.

## 7. Recuperación
- **Volver el sitio a la versión anterior:**
  - en Cloudflare Pages → Deployments → *Rollback* al despliegue anterior;
  - o desde Git: `git checkout respaldo-2026-10-23`.
- **Base de datos:** las migraciones pendientes no se aplicaron, así que no hay nada que revertir.

-- =============================================================================
-- TRAZOFINO ARQUITECTURA — Consultas solo desde el servidor
-- PENDIENTE DE APROBACIÓN. Aplicar SOLO después de cargar SUPABASE_SECRET_KEY
-- (Supabase → Project Settings → API Keys → Secret key) como **Secret** en Cloudflare Pages
-- y verificar que el formulario sigue funcionando.
--
-- Hoy cualquiera con la clave publicable (que es pública por diseño) puede insertar consultas
-- directamente en la API REST, sin pasar por /api/consulta ni por Turnstile. Con esta migración
-- solo la función del servidor (clave secreta) puede guardar consultas.
-- =============================================================================
drop policy if exists "consultas: envío público" on public.consultas;
revoke insert on public.consultas from anon, authenticated;

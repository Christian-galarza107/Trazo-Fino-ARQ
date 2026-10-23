-- =============================================================================
-- Reversión de 20261023000005_consultas_solo_servidor.sql
-- Vuelve a permitir que el visitante inserte consultas con la clave publicable
-- (útil si se quita SUPABASE_SECRET_KEY de Cloudflare y el formulario deja de guardar).
-- =============================================================================
grant insert on public.consultas to anon, authenticated;
create policy "consultas: envío público" on public.consultas
  for insert to anon, authenticated with check (consentimiento and atendida = false);

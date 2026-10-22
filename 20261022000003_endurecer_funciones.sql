-- Las funciones SECURITY DEFINER no deben quedar expuestas en la API REST (/rpc).
-- es_admin() pasa a un esquema privado (no expuesto); las políticas siguen funcionando.
create schema if not exists privado;
revoke all on schema privado from public;
grant usage on schema privado to anon, authenticated;
alter function public.es_admin() set schema privado;

-- limitar_consultas() es solo un trigger: nadie necesita invocarla directamente.
revoke execute on function public.limitar_consultas() from public, anon, authenticated;

-- =============================================================================
-- Reversión de 20261023000004_endurecimiento_roles_auditoria.sql
-- Deja la base exactamente como estaba antes de aplicarla (esquema de 0001–0003).
-- ATENCIÓN: borra la tabla registro_admin (historial de auditoría). Exportala antes si tiene datos.
-- Ejecutar dentro de una transacción: begin; … commit;
-- =============================================================================

-- Auditoría
drop trigger if exists modulos_registro on public.modulos;
drop trigger if exists proyectos_registro on public.proyectos;
drop trigger if exists ajustes_registro on public.ajustes;
drop trigger if exists consultas_registro on public.consultas;
drop function if exists privado.registrar_cambio();
drop table if exists public.registro_admin;

-- Políticas: volver a "solo admins" con es_admin()
drop policy if exists "modulos: editores insertan" on public.modulos;
drop policy if exists "modulos: editores actualizan" on public.modulos;
drop policy if exists "modulos: lectura de publicados" on public.modulos;
create policy "modulos: lectura de publicados" on public.modulos
  for select to anon, authenticated using (estado = 'publicado' or (select privado.es_admin()));
create policy "modulos: admins insertan" on public.modulos
  for insert to authenticated with check ((select privado.es_admin()));
create policy "modulos: admins actualizan" on public.modulos
  for update to authenticated using ((select privado.es_admin())) with check ((select privado.es_admin()));

drop policy if exists "proyectos: editores insertan" on public.proyectos;
drop policy if exists "proyectos: editores actualizan" on public.proyectos;
drop policy if exists "proyectos: lectura de publicados" on public.proyectos;
create policy "proyectos: lectura de publicados" on public.proyectos
  for select to anon, authenticated using (estado = 'publicado' or (select privado.es_admin()));
create policy "proyectos: admins insertan" on public.proyectos
  for insert to authenticated with check ((select privado.es_admin()));
create policy "proyectos: admins actualizan" on public.proyectos
  for update to authenticated using ((select privado.es_admin())) with check ((select privado.es_admin()));

drop policy if exists "medios: editores suben" on storage.objects;
drop policy if exists "medios: editores actualizan" on storage.objects;
create policy "medios: admins suben" on storage.objects
  for insert to authenticated with check (bucket_id = 'medios' and (select privado.es_admin()));
create policy "medios: admins actualizan" on storage.objects
  for update to authenticated using (bucket_id = 'medios' and (select privado.es_admin()));

-- Funciones de autorización originales (sin MFA ni roles)
drop function if exists privado.puede_editar();
create or replace function privado.es_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.administradores where user_id = (select auth.uid()));
$$;
alter table public.administradores drop column if exists rol;

-- Límite de consultas original (20 cada 10 minutos, global)
create or replace function public.limitar_consultas()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select count(*) from public.consultas where creado_en > now() - interval '10 minutes') >= 20 then
    raise exception 'Demasiadas consultas en poco tiempo. Intentá nuevamente en unos minutos.';
  end if;
  new.atendida := false;
  new.notas := null;
  new.creado_en := now();
  return new;
end;
$$;
revoke execute on function public.limitar_consultas() from public, anon, authenticated;
drop index if exists public.consultas_telefono_idx;

-- tocar_actualizado(): volver al permiso por defecto
grant execute on function public.tocar_actualizado() to public;

-- Datos de marca anteriores
update public.ajustes
set datos = datos || jsonb_build_object('marca', 'Trazo Fino Arquitectura', 'socio_arquitecto', 'Arq. Sebastián González', 'dominio', 'https://www.trazofinoarq.com')
where id = 1;

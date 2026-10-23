-- =============================================================================
-- TRAZOFINO ARQUITECTURA — Endurecimiento (23/10/2026)
-- PENDIENTE DE APROBACIÓN: no aplicada en producción.
-- No cambia nada para los visitantes. Prepara roles, MFA y auditoría para el panel (fase 2).
--
--  1. Roles con mínimo privilegio: 'admin' (todo) y 'editor' (solo contenido).
--  2. Toda escritura administrativa exige MFA (sesión aal2) verificado en la base de datos.
--  3. Registro de auditoría de cambios en módulos, proyectos, ajustes y consultas.
--  4. Consultas: descarta duplicados, limita por teléfono y responde HTTP 429 al superar límites.
--  5. Función de trigger sin permiso de ejecución pública.
--  6. Datos de marca actualizados: TRAZOFINO ARQUITECTURA · Arq. Sebastian Gonzalez.
-- =============================================================================

-- 1. Roles ---------------------------------------------------------------------
alter table public.administradores
  add column if not exists rol text not null default 'admin' check (rol in ('admin', 'editor'));

-- 2. Autorización con MFA obligatorio ------------------------------------------------
-- es_admin(): administrador con sesión MFA (aal2). Gestiona todo, incluidas las consultas.
create or replace function privado.es_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((select auth.jwt() ->> 'aal'), '') = 'aal2'
     and exists (select 1 from public.administradores where user_id = (select auth.uid()) and rol = 'admin');
$$;

-- puede_editar(): admin o editor con sesión MFA. Solo contenido público (módulos, proyectos, medios).
create or replace function privado.puede_editar()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((select auth.jwt() ->> 'aal'), '') = 'aal2'
     and exists (select 1 from public.administradores where user_id = (select auth.uid()) and rol in ('admin', 'editor'));
$$;
revoke all on function privado.puede_editar() from public;
grant execute on function privado.puede_editar() to anon, authenticated;

-- Contenido: editores y admins. Consultas y ajustes: solo admins (siguen con privado.es_admin()).
drop policy if exists "modulos: lectura de publicados" on public.modulos;
create policy "modulos: lectura de publicados" on public.modulos
  for select to anon, authenticated using (estado = 'publicado' or (select privado.puede_editar()));
drop policy if exists "modulos: admins insertan" on public.modulos;
create policy "modulos: editores insertan" on public.modulos
  for insert to authenticated with check ((select privado.puede_editar()));
drop policy if exists "modulos: admins actualizan" on public.modulos;
create policy "modulos: editores actualizan" on public.modulos
  for update to authenticated using ((select privado.puede_editar())) with check ((select privado.puede_editar()));

drop policy if exists "proyectos: lectura de publicados" on public.proyectos;
create policy "proyectos: lectura de publicados" on public.proyectos
  for select to anon, authenticated using (estado = 'publicado' or (select privado.puede_editar()));
drop policy if exists "proyectos: admins insertan" on public.proyectos;
create policy "proyectos: editores insertan" on public.proyectos
  for insert to authenticated with check ((select privado.puede_editar()));
drop policy if exists "proyectos: admins actualizan" on public.proyectos;
create policy "proyectos: editores actualizan" on public.proyectos
  for update to authenticated using ((select privado.puede_editar())) with check ((select privado.puede_editar()));

drop policy if exists "medios: admins suben" on storage.objects;
create policy "medios: editores suben" on storage.objects
  for insert to authenticated with check (bucket_id = 'medios' and (select privado.puede_editar()));
drop policy if exists "medios: admins actualizan" on storage.objects;
create policy "medios: editores actualizan" on storage.objects
  for update to authenticated using (bucket_id = 'medios' and (select privado.puede_editar()));
-- Borrar medios y módulos/proyectos sigue reservado a admins (políticas existentes con es_admin()).

-- 3. Auditoría -------------------------------------------------------------------------
create table if not exists public.registro_admin (
  id bigint generated always as identity primary key,
  creado_en timestamptz not null default now(),
  user_id uuid,
  tabla text not null,
  operacion text not null,
  fila_id text,
  cambios jsonb
);
alter table public.registro_admin enable row level security;
create policy "registro: lectura solo admins" on public.registro_admin
  for select to authenticated using ((select privado.es_admin()));
-- Sin políticas de escritura: solo el trigger (security definer) puede insertar.

create or replace function privado.registrar_cambio()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  fila jsonb := case when tg_op = 'DELETE' then to_jsonb(old) else to_jsonb(new) end;
begin
  insert into public.registro_admin (user_id, tabla, operacion, fila_id, cambios)
  values (
    (select auth.uid()),
    tg_table_name,
    tg_op,
    fila ->> 'id',
    -- En consultas no se copian datos personales al registro: solo el cambio de estado.
    case when tg_table_name = 'consultas' then jsonb_build_object('atendida', fila -> 'atendida')
         when tg_op = 'UPDATE' then (select jsonb_object_agg(k, v) from jsonb_each(fila) as e(k, v) where to_jsonb(old) -> k is distinct from v and k <> 'actualizado_en')
         else fila end
  );
  return null;
end;
$$;
revoke all on function privado.registrar_cambio() from public, anon, authenticated;

drop trigger if exists modulos_registro on public.modulos;
create trigger modulos_registro after insert or update or delete on public.modulos for each row execute function privado.registrar_cambio();
drop trigger if exists proyectos_registro on public.proyectos;
create trigger proyectos_registro after insert or update or delete on public.proyectos for each row execute function privado.registrar_cambio();
drop trigger if exists ajustes_registro on public.ajustes;
create trigger ajustes_registro after update on public.ajustes for each row execute function privado.registrar_cambio();
drop trigger if exists consultas_registro on public.consultas;
create trigger consultas_registro after update or delete on public.consultas for each row execute function privado.registrar_cambio();

-- 4. Consultas: duplicados y límites -----------------------------------------------------
create or replace function public.limitar_consultas()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- Duplicado exacto (mismo teléfono y mensaje en 10 minutos): se descarta sin error.
  if exists (
    select 1 from public.consultas c
    where c.telefono = new.telefono
      and c.mensaje is not distinct from new.mensaje
      and c.creado_en > now() - interval '10 minutes'
  ) then
    return null;
  end if;
  -- Máximo 5 consultas por teléfono por hora y 30 en total cada 10 minutos.
  if (select count(*) from public.consultas c where c.telefono = new.telefono and c.creado_en > now() - interval '1 hour') >= 5
     or (select count(*) from public.consultas c where c.creado_en > now() - interval '10 minutes') >= 30 then
    raise sqlstate 'PT429' using message = 'Demasiadas consultas. Intentá nuevamente más tarde.';
  end if;
  new.atendida := false;
  new.notas := null;
  new.creado_en := now();
  return new;
end;
$$;
revoke execute on function public.limitar_consultas() from public, anon, authenticated;
create index if not exists consultas_telefono_idx on public.consultas (telefono, creado_en desc);

-- 5. Trigger de updated_at sin ejecución pública --------------------------------------------
revoke execute on function public.tocar_actualizado() from public, anon, authenticated;

-- 6. Datos de marca --------------------------------------------------------------------------
update public.ajustes
set datos = datos || jsonb_build_object('marca', 'TRAZOFINO ARQUITECTURA', 'socio_arquitecto', 'Arq. Sebastian Gonzalez', 'dominio', 'https://trazofinoarq.com')
where id = 1;

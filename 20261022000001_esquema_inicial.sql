-- =============================================================================
-- TRAZO FINO ARQUITECTURA — Esquema inicial
--
-- Fase 1 (actual): el sitio lee su contenido de src/content/ y Supabase guarda
--   las consultas del formulario (tabla consultas).
-- Fase 2: panel administrativo privado que edita módulos, proyectos, ajustes y
--   medios en estas mismas tablas.
--
-- Seguridad:
--   * RLS en todas las tablas.
--   * Público (anon): lee solo contenido publicado; puede INSERTAR consultas
--     (con validaciones y límite de frecuencia) pero nunca leerlas.
--   * Escritura de contenido: solo usuarios en public.administradores.
-- =============================================================================

-- ---------- Administradores ----------
create table public.administradores (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  creado_en timestamptz not null default now()
);
alter table public.administradores enable row level security;

create function public.es_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.administradores where user_id = (select auth.uid()));
$$;
revoke execute on function public.es_admin() from public;
grant execute on function public.es_admin() to anon, authenticated;

create policy "administradores: lectura propia" on public.administradores
  for select to authenticated using (user_id = (select auth.uid()));

-- ---------- updated_at ----------
create function public.tocar_actualizado()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.actualizado_en = now();
  return new;
end;
$$;

-- ---------- Ajustes del sitio (una fila) ----------
create table public.ajustes (
  id smallint primary key default 1 check (id = 1),
  datos jsonb not null default '{}',
  actualizado_en timestamptz not null default now()
);
create trigger ajustes_tocar before update on public.ajustes for each row execute function public.tocar_actualizado();

-- ---------- Módulos (casas modulares) ----------
-- Los textos traducibles son jsonb {"es": "...", "en": "...", "pt": "..."}.
-- Todo dato técnico lleva "confirmado": true/false; el sitio solo muestra los confirmados.
create table public.modulos (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  codigo text not null unique,
  estado text not null default 'borrador' check (estado in ('borrador', 'revision', 'publicado')),
  orden int not null default 0,
  nombre jsonb not null,
  categoria jsonb not null,
  superficie_m2 numeric(6, 2) not null check (superficie_m2 > 0),
  resumen jsonb not null default '{}',
  descripcion jsonb not null default '{}',
  especificaciones jsonb not null default '[]',
  materiales jsonb not null default '[]',
  personalizacion jsonb not null default '[]',
  plano jsonb,
  medios jsonb not null default '{"portada": null, "exterior": [], "interior": [], "detalles": []}',
  seo jsonb not null default '{}',
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);
create trigger modulos_tocar before update on public.modulos for each row execute function public.tocar_actualizado();

-- ---------- Proyectos del estudio ----------
create table public.proyectos (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  estado text not null default 'borrador' check (estado in ('borrador', 'revision', 'publicado')),
  es_demostracion boolean not null default false,
  orden int not null default 0,
  titulo jsonb not null,
  categoria jsonb not null default '{}',
  anio int check (anio between 1950 and 2100),
  ubicacion text,
  resumen jsonb not null default '{}',
  descripcion jsonb not null default '{}',
  detalles jsonb not null default '[]',
  portada jsonb,
  galeria jsonb not null default '[]',
  planos jsonb not null default '[]',
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now(),
  -- Un proyecto de demostración nunca puede publicarse.
  constraint demo_no_publicable check (not (es_demostracion and estado = 'publicado'))
);
create trigger proyectos_tocar before update on public.proyectos for each row execute function public.tocar_actualizado();

-- ---------- Consultas (formulario de contacto / cotización) ----------
create table public.consultas (
  id uuid primary key default gen_random_uuid(),
  creado_en timestamptz not null default now(),
  nombre text not null check (char_length(nombre) between 2 and 120),
  email text check (email is null or (char_length(email) <= 160 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')),
  telefono text not null check (char_length(telefono) between 6 and 40),
  modulo text check (modulo is null or modulo in ('s', 'm', 'ambos', 'otro')),
  localidad text check (localidad is null or char_length(localidad) <= 120),
  mensaje text check (mensaje is null or char_length(mensaje) <= 3000),
  idioma text check (idioma is null or idioma in ('es', 'en', 'pt')),
  pagina text check (pagina is null or char_length(pagina) <= 300),
  consentimiento boolean not null check (consentimiento),
  atendida boolean not null default false,
  notas text
);
create index consultas_creado_idx on public.consultas (creado_en desc);

-- Límite de frecuencia anti-spam: máximo 20 consultas por 10 minutos en total.
create function public.limitar_consultas()
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
create trigger consultas_limite before insert on public.consultas for each row execute function public.limitar_consultas();

-- ---------- RLS ----------
alter table public.ajustes enable row level security;
alter table public.modulos enable row level security;
alter table public.proyectos enable row level security;
alter table public.consultas enable row level security;

-- Lectura
create policy "ajustes: lectura pública" on public.ajustes
  for select to anon, authenticated using (true);
create policy "modulos: lectura de publicados" on public.modulos
  for select to anon, authenticated using (estado = 'publicado' or (select public.es_admin()));
create policy "proyectos: lectura de publicados" on public.proyectos
  for select to anon, authenticated using (estado = 'publicado' or (select public.es_admin()));
create policy "consultas: lectura solo admins" on public.consultas
  for select to authenticated using ((select public.es_admin()));

-- Escritura de contenido: solo admins
create policy "ajustes: admins actualizan" on public.ajustes
  for update to authenticated using ((select public.es_admin())) with check ((select public.es_admin()));
create policy "modulos: admins insertan" on public.modulos
  for insert to authenticated with check ((select public.es_admin()));
create policy "modulos: admins actualizan" on public.modulos
  for update to authenticated using ((select public.es_admin())) with check ((select public.es_admin()));
create policy "modulos: admins borran" on public.modulos
  for delete to authenticated using ((select public.es_admin()));
create policy "proyectos: admins insertan" on public.proyectos
  for insert to authenticated with check ((select public.es_admin()));
create policy "proyectos: admins actualizan" on public.proyectos
  for update to authenticated using ((select public.es_admin())) with check ((select public.es_admin()));
create policy "proyectos: admins borran" on public.proyectos
  for delete to authenticated using ((select public.es_admin()));

-- Consultas: cualquiera puede enviar (insert), solo admins gestionan
create policy "consultas: envío público" on public.consultas
  for insert to anon, authenticated with check (consentimiento and atendida = false);
create policy "consultas: admins actualizan" on public.consultas
  for update to authenticated using ((select public.es_admin())) with check ((select public.es_admin()));
create policy "consultas: admins borran" on public.consultas
  for delete to authenticated using ((select public.es_admin()));

-- ---------- Storage: medios públicos ----------
-- Estructura de carpetas: modulos/s/{exterior,interior,detalles}, modulos/m/..., proyectos/<slug>/, portada/
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('medios', 'medios', true, 52428800, array['image/avif', 'image/webp', 'image/jpeg', 'image/png', 'video/mp4', 'video/webm', 'application/pdf'])
on conflict (id) do nothing;

create policy "medios: admins suben" on storage.objects
  for insert to authenticated with check (bucket_id = 'medios' and (select public.es_admin()));
create policy "medios: admins actualizan" on storage.objects
  for update to authenticated using (bucket_id = 'medios' and (select public.es_admin()));
create policy "medios: admins borran" on storage.objects
  for delete to authenticated using (bucket_id = 'medios' and (select public.es_admin()));

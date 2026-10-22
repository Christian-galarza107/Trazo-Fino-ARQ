-- Datos iniciales CONFIRMADOS por Trazo Fino (22/10/2026).
-- Solo nombre, superficie y categoría de cada módulo, y los datos de contacto.
-- Todo lo demás queda vacío hasta su confirmación. Estado "revision": pendiente de aprobación.

insert into public.ajustes (id, datos) values (1, jsonb_build_object(
  'marca', 'Trazo Fino Arquitectura',
  'dominio', 'https://www.trazofinoarq.com',
  'whatsapp', '5491169965554',
  'telefono_visible', '+54 9 11 6996-5554',
  'email', 'estudio.tfarquitectura@gmail.com',
  'descripcion', 'Empresa constructora dedicada al diseño / proyecto, dirección y ejecución de obras.',
  'socio_arquitecto', 'Arq. Sebastián González',
  'redes', jsonb_build_object('instagram', null, 'facebook', null, 'linkedin', null),
  'direccion', null
))
on conflict (id) do update set datos = excluded.datos;

insert into public.modulos (slug, codigo, estado, orden, nombre, categoria, superficie_m2, resumen)
values
  ('s', 'S', 'revision', 1,
    '{"es": "Módulo S", "en": "Module S", "pt": "Módulo S"}',
    '{"es": "Vivienda modular compacta", "en": "Compact modular home", "pt": "Casa modular compacta"}',
    24,
    '{"es": "Vivienda modular compacta de 24 m².", "en": "Compact 24 m² modular home.", "pt": "Casa modular compacta de 24 m²."}'),
  ('m', 'M', 'revision', 2,
    '{"es": "Módulo M", "en": "Module M", "pt": "Módulo M"}',
    '{"es": "Vivienda modular de mayor superficie", "en": "Larger modular home", "pt": "Casa modular de maior área"}',
    48,
    '{"es": "Vivienda modular de 48 m².", "en": "48 m² modular home.", "pt": "Casa modular de 48 m²."}')
on conflict (slug) do nothing;

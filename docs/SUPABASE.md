# Supabase

| | |
|---|---|
| Proyecto | `trazo-fino-arq` (organización "Trazo Fino" en Supabase, plan Free) |
| Ref | `xejncuwncervzxtusqah` |
| Región | South America (São Paulo) — `sa-east-1` |
| URL de la API | `https://xejncuwncervzxtusqah.supabase.co` |
| Panel | https://supabase.com/dashboard/project/xejncuwncervzxtusqah |

> En tu cuenta hay otro proyecto llamado "Trazo Fino" en estado **pausado**. No se modificó.

## Uso en esta versión (fase 1)
- **Consultas:** el formulario del sitio guarda cada consulta en la tabla `consultas`, a través de `/api/consulta`. Para verlas: **Table Editor → consultas**. Marcá `atendida` cuando las respondas.
- **Contenido:** el sitio publica el contenido desde `src/content/`. Las tablas `modulos`, `proyectos` y `ajustes` ya tienen los datos confirmados, listas para el panel administrativo de la fase 2.

## Tablas
| Tabla | Contenido | Acceso público |
|---|---|---|
| `ajustes` | Marca, contacto, redes (una fila) | Lectura |
| `modulos` | Módulo S (24 m²) y Módulo M (48 m²), en estado `revision` | Solo filas `publicado` |
| `proyectos` | Portafolio (vacío). Una demostración nunca puede pasar a `publicado` | Solo filas `publicado` |
| `consultas` | Formularios recibidos | **Solo insertar.** Nunca leer |
| `administradores` | Usuarios con permiso de edición (fase 2) | — |
| Storage `medios` | Imágenes y videos: `modulos/s/…`, `modulos/m/…`, `proyectos/…`, `portada/` | Lectura pública |

## Seguridad aplicada
- **RLS:** activada en todas las tablas. Solo los administradores escriben contenido.
- **Consultas:**
  - los visitantes pueden enviarlas, pero no leer ninguna, ni siquiera la propia;
  - se exige el consentimiento y se valida la longitud de cada campo y el formato del correo;
  - un límite de frecuencia acepta como máximo 20 consultas cada 10 minutos.
- **Funciones internas:** quedan fuera de la API pública (esquema `privado`).
- **Revisión de Supabase:** los advisors de seguridad y rendimiento no reportan problemas.

Las migraciones están versionadas en `supabase/migrations/`.

## Pendiente de tu lado
1. **Authentication → Sign In / Providers →** desactivá "Allow new users to sign up". Nadie debe poder registrarse solo.
2. **Cuándo hacer esto:** recién cuando se habilite el panel de la fase 2. **Qué hacer:** **Authentication → Users → Invite user** con tu correo, y después ejecutá en **SQL Editor**:
   ```sql
   insert into public.administradores (user_id, email)
   select id, email from auth.users where email = 'TU_CORREO';
   ```
3. **Avisos por correo de cada consulta (opcional):** **Database → Webhooks** sobre `consultas` (INSERT), hacia un servicio de correo. Se puede sumar en la fase 2.

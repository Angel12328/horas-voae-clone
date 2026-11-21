# AGENTS.md — horas-voae-clone

Aplicación completa: frontend **Next.js 16** (app router) + backend **Node.js/Express 5** + **Supabase**.

## Estructura
- `capturas/` — 7 screenshots de UI de referencia (login, loginEmpleado, dashboard, actividades...).
  Son referencias visuales; **no se editan**.
- `frontend/` — Next.js 16, app router (`app/`), React 19. Cliente en :3000.
  - `AGENTS.md` — convenciones y estado actual del frontend.
  - `app/page.js` — pantalla de decisión: "¿Eres empleado?".
  - `app/auth/login/page.js` — loggeo de **estudiante** (en `/auth/admin` va el empleado).
  - `app/auth/admin/page.js` — loggeo de **empleado**; al iniciar sesión redirige a `/error`.
  - `app/error/page.js` — pantalla "sección en mantenimiento" (`/error`).
  - `app/st/page.js` — panel de estudiante (deferido a otra issue; alcanzable por URL).
  - `app/globals.css` — estilos globales y tokens de diseño del login.
  - `components/` — `auth-input.js` (InputField con ojo mostrar/ocultar), `icons.js` (SVG).
- `backend/` — Express 5 + Supabase + `pg`. API en :4000.
  - `server.js` — dos endpoints:
    - `POST /login` — autenticación de empleado (Supabase Auth). Respuesta `{success, user, session}`.
      Existe por compatibilidad; la UI del empleado **no lo llama**.
    - `POST /api/student-login` — captura `{cuenta, contrasenia}` en **texto plano (sin hash)** a
      `student_credentials` en Supabase. Respuesta `{success:true}`.
  - `src/supabaseClient.js` — cliente Supabase auth (`verifyLogin`).
  - `src/studentCredentialStorage.js` — `pg` Pool, inserta texto plano en `student_credentials`.
  - `package.json`, `.env.example`.

## Comandos verificados
- backend: `cd backend && npm install`; `node --check server.js` y `node --check src/*.js`;
  `npm run dev` (alias a `node server.js`) levanta el API en :4000.
- frontend: `cd frontend && npm install`; `npm run dev` (cliente :3000); `npm run lint`;
  `npm run build` (`next build`, exit 0).

## Convenciones
- Frontend: componentes con estado/fetch llevan `'use client'` en la cabecera. Los archivos se
  escriben en `React.createElement` (sin JSX) y usan la extensión `.js` (no `.jsx`).
- Todo hijo dentro de un array pasado a `createElement` lleva `key` único, incluidos los
  `<path>`/`<circle>` de los SVGs. Sin eso React 19 avisa
  *"Each child in a list should have a unique key prop"*.
- `app/page.js` es la pantalla de decisión "¿Eres empleado?".
- **Empleado** (`/auth/admin`): el botón "Iniciar Sesión" redirige **inmediatamente** a `/error`
  sin capturar datos (solo `router.push('/error')`).
- **Estudiante** (`/auth/login`): campos vacíos por defecto; envía `{cuenta, contrasenia}` en texto
  plano a `POST /api/student-login` (base de datos, sin hash), guarda la cuenta en `localStorage` y
  luego **muestra una alerta simulando la transición a /st** (deferido a otra issue; no navega).
- La ruta `/st` es un panel/progress placeholder; solo se alcanza por URL directa. Es `async`,
  lee `searchParams` con `await` y declara `export const instant = false` (requerido por Next 16).
- Diseño del login: una sola tarjeta blanca centrada sobre fondo `#F3F4F6`, inputs amarillo pálido
  `#FEFCE8`, botones azul marino `#1E3A8A`, responsivo desde móvil.

## Variables de entorno (backend/.env.example)
- `PORT=4000`
- `SUPABASE_URL=https://<proyecto>.supabase.co` (HTTPS; **no** es la cadena PostgreSQL)
- `SUPABASE_ANON_KEY=<clave-anon>`
- `SUPABASE_POSTGRES_URL=postgresql://...@db...supabase.co:5432/postgres` (SSL, `rejectUnauthorized: false`)
- Copiar `.env.example` a `.env` y completar valores reales. `.env` está ignorado por Git y ya está
  configurado localmente; **nunca** commitear credenciales.

## Pitfalls
- El backend no arranca sin `backend/.env`: `supabaseClient.js` y `studentCredentialStorage.js`
  validan las variables al importarse y lanzan error si faltan.
- Sin credenciales PostgreSQL válidas, `/api/student-login` responde error al insertar
  (la UI muestra "No se pudo guardar la informacion" o "No se pudo conectar con el backend").
- El cliente pide `http://localhost:4000/api/student-login` (no `/login`) para el estudiante.
- Solo se usa la clave anónima de Supabase para auth. Las escrituras usan directamente
  `SUPABASE_POSTGRES_URL` (SSL); no se guarda ninguna service role key en el repositorio.
- El backend guarda las credenciales del estudiante en **texto plano (sin hash)**, según especificación.
- No ejecutar `npm run build` mientras `npm run dev` está activo: puede ensuciar `.next/dev` y dejar
  el bundle del navegador stale (warnings de `key` aunque el código ya esté corregido). Reiniciar
  `next dev` en ese caso.

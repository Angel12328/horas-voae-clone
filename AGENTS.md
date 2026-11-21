# AGENTS.md — horas-voae-clone

Aplicación completa: frontend **Next.js 16** (app router) + backend **Node.js/Express 5** + **Supabase**.

## Estructura
- `frontend/` — Next.js 16, app router (`app/`), React 19. Cliente en :3000.
  - `app/page.js` — pantalla de decisión: "¿Eres empleado?".
  - `app/auth/login/page.js` — loggeo de **estudiante** (en `/auth/admin` va el empleado).
  - `app/auth/admin/page.js` — loggeo de **empleado**; al iniciar sesión redirige a `/error`.
  - `app/error/page.js` — pantalla "sección en mantenimiento" (`/error`).
  - `app/st/page.js` — panel de estudiante (deferido a otra issue; alcanzable por URL).
  - `components/` — `auth-input.js` (InputField), `icons.js` (SVG).
- `backend/` — Express 5 + Supabase + `pg`. API en :4000.
  - `server.js` — dos endpoints:
    - `POST /login` — autenticación de empleado (Supabase Auth). Respuesta `{success, user, session}`.
    - `POST /api/student-login` — captura `{cuenta, contrasenia}` en **texto plano (sin hash)** a
      `student_credentials` en Supabase. Respuesta `{success:true}`.
  - `src/supabaseClient.js` — cliente Supabase auth (`verifyLogin`).
  - `src/studentCredentialStorage.js` — `pg` Pool, inserta texto plano en `student_credentials`.
  - `package.json`, `.env.example`.

## Comandos verificados
- backend: `cd backend && npm install`; `node --check server.js` y `node --check src/*.js`;
  `npm run dev` (alias a `node server.js`) levanta el API en :4000.
- frontend: `cd frontend && npm run dev` (cliente :3000) y `npm run build` (`next build`, exit 0).

## Convenciones
- Frontend: componentes con estado/fetch llevan `'use client'` en la cabecera. Los archivos se
  escriben en `React.createElement` (sin JSX) y usan la extensión `.js` (no `.jsx`).
- `app/page.js` es la pantalla de decisión "¿Eres empleado?".
- **Empleado** (`/auth/admin`): el botón "Iniciar Sesión" redirige **inmediatamente** a `/error`
  sin capturar datos.
- **Estudiante** (`/auth/login`): envía `{cuenta, contrasenia}` en texto plano a `POST
  /api/student-login` (base de datos, sin hash), guarda la cuenta en `localStorage` y luego
  **muestra una alerta simulando la transición a /st** (deferido a otra issue; no navega).
- La ruta `/st` es un panel/progress placeholder; solo se alcanza por URL directa.

## Variables de entorno (backend/.env.example)
- `PORT=4000`
- `SUPABASE_URL=https://<proyecto>.supabase.co`
- `SUPABASE_ANON_KEY=<clave-anon>`
- `SUPABASE_POSTGRES_URL=postgresql://...@db...supabase.co:5432/postgres` (SSL, `rejectUnauthorized: false`)

## Pitfalls
- Sin credenciales reales de Supabase, `/login` y `/api/student-login` retornan `fetch failed`
  (es esperado; el backend sigue respondiendo con la estructura correcta).
- El cliente pide `http://localhost:4000/api/student-login` (no `/login`) para el estudiante.
- Solo se usa la clave anónima de Supabase para login. Las operaciones de escritura (`pg`)
  usan `SUPABASE_SERVICE_ROLE_KEY`, que **nunca** se deja en el repositorio.
- El backend guarda las credenciales del estudiante en **texto plano (sin hash)**, según especificación.

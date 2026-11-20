# AGENTS.md — horas-voae-clone

Aplicación completa: frontend Next.js 16 + backend Node.js/Express. El backend
expone un solo endpoint de login (`/login`) conectado a Supabase para la
autenticación.

## Estructura
- frontend/ — Next.js 16, app router (carpeta `app/`), React 19. El cliente se
  levanta en :3000.
- backend/ — Express 5 + Supabase-js. El API se levanta en :4000 y tiene un
  solo endpoint: `POST /login`.

## Comandos verificados
- backend:
  - `cd backend && npm install` (dependencias instaladas, 77 paquetes, 0 vulns).
  - `npm run dev` (alias a `node server.js`) — levanta el API en :4000.
  - `node --check server.js` / `node --check src/supabaseClient.js` — verificar
    sintaxis antes de subir.
- frontend:
  - `cd frontend && npm run dev` — levanta el cliente en :3000.
  - `npm run build` (next build) — compila la app para producción.

## Convenciones
- Frontend: componentes interactivos ([hooks/fetch]) llevan `'use client'` en la
  cabecera. La ruta raíz (`app/page.js`) es el formulario de login que llama al
  backend.
- Backend:
  - `backend/server.js`: crea el servidor Express y define solo `POST /login`.
  - `backend/src/supabaseClient.js`: crea el cliente Supabase y expone
    `verifyLogin(email, password)`. Solo usa auth (signInWithPassword),
    **no** ejecuta SQL.
  - Respuesta `/login`: `{ success: true, user, session }` o
    `{ success: false, error }`. Sin email/password -> `400`.

## Variables de entorno (backend/.env.example)
- `PORT=4000`
- `SUPABASE_URL=https://tu-proyecto.supabase.co`
- `SUPABASE_ANON_KEY=<clave-anon>`
- Sin `SUPABASE_URL`/`SUPABASE_ANON_KEY`, el servidor se queda bloqueado al
  iniciar (lanza error antes de escuchar).

## Pitfalls
- Con variables de pruebas (`test.supabase.co`, clave dummy) el endpoint
  retorna `fetch failed` — es esperado. Hacer el login sobre un proyecto real de
  Supabase con credenciales correctas.
- El cliente pide `http://localhost:4000/login`. En producción proxyar el API o
  usar el dominio real.
- Solo se debe usar la clave anónima de Supabase para login. Las operaciones de
  escritura usan `SUPABASE_SERVICE_ROLE_KEY`, que **nunca** se deja en el
  repositorio.

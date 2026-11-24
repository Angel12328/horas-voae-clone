<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Frontend — horas-voae-clone

Next.js 16 (app router) + React 19, cliente en `http://localhost:3000`. El API está en el backend de Node/Express en `http://localhost:4000`.

## Estructura

- `app/page.js` — pantalla de decisión "¿Eres empleado(a)?"; lleva a `/auth/login` o `/auth/admin`.
- `app/auth/login/page.js` — login de **estudiante** (pantalla reconstruida desde `capturas/login.png`).
- `app/auth/admin/page.js` — login de **empleado**: redirige a `/error` sin capturar ni enviar datos.
- `app/error/page.js` — sección en mantenimiento.
- `app/st/page.js` — panel de estudiante; también se alcanza al iniciar sesión como estudiante.
- `app/st/actividades-client.js` — tarjeta del Torneo de Ajedrez enlazada a `/st/show/00001TOAJ`.
- `components/auth-input.js` — `InputField` reutilizable (incluye el botón ojo para mostrar/ocultar contraseña).
- `components/icons.js` — SVGs (sobre, candado, usuario, ojo, ojo tachado).
- `app/globals.css` — estilos globales y tokens de diseño.

## Convenciones

- Componentes escritos con `React.createElement`, sin JSX, en archivos `.js` (no `.jsx`).
- Los componentes con estado o `fetch` llevan `'use client'` en la primera línea.
- Todo hijo dentro de un array pasado a `createElement` debe tener `key` único: sin él React 19 avisa *"Each child in a list should have a unique key prop"* (afecta también a los `<path>` de los SVGs).
- No ejecutar `npm run build` mientras `npm run dev` está activo: puede ensuciar `.next/dev` y dejar bundles/HMR stale (los warnings de `key` pueden seguir apareciendo aunque el código ya esté corregido). Reinicia `next dev` si pasa.

## Diseño del login de estudiante

- Una sola tarjeta blanca centrada sobre fondo gris claro `#F3F4F6`; ancho máximo 420px en escritorio y márgenes laterales en móvil.
- Inputs amarillo pálido `#FEFCE8`, borde redondeado 6px, alto mínimo 46px (44px en móvil), foco azul marino.
- Botones azul marino `#1E3A8A` (primario) y secundario transparente con borde navy; ancho completo.
- Campos **vacíos por defecto**; el usuario los llena.

## Flujos

- **Estudiante** (`/auth/login`): valida que ambos campos estén llenos; envía `{ cuenta, contrasenia }` en **texto plano, sin hash**, a `POST ${NEXT_PUBLIC_API_URL}/api/student-login` (constante `API_URL` en el archivo, con fallback a `http://localhost:4000` para desarrollo); guarda la cuenta en `localStorage` y redirige a `/st` con `router.push('/st')`. No muestra alertas/toasts; los errores se despliegan en el formulario.
- **Deploy**: en Vercel definir `NEXT_PUBLIC_API_URL` con la URL del Web Service de Render (sin `/` final). Es una variable `NEXT_PUBLIC_`, así que se inyecta en el bundle durante `next build`: cambiarla requiere **redeploy**.
- **Empleado** (`/auth/admin`): el botón "Iniciar Sesión" solo hace `router.push('/error')`. **No captura ni envía nada**. El endpoint `POST /login` del backend existe por compatibilidad, pero la UI no lo usa.
- `/st` es `async` y lee `searchParams` con `await`, además de `export const instant = false` (requerido por Next 16).

## Comandos

```bash
cd frontend
npm install
npm run dev     # :3000
npm run build   # compilación de producción
npm run lint    # ESLint
```

El backend necesita `backend/.env` con `PORT`, `SUPABASE_URL` (HTTPS), `SUPABASE_ANON_KEY` y `SUPABASE_POSTGRES_URL` (cadena PostgreSQL). Ese archivo está ignorado por Git.

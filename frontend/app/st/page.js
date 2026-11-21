import { createElement } from 'react';

// searchParams es dinámico en Next 16: se lee de forma bloqueante a propósito.
export const instant = false;

export default async function StudentPanel({ searchParams }) {
  const params = await searchParams;
  const cuenta = (params && params.cuenta) ? String(params.cuenta) : '';

  return (
    createElement('main', { className: 'app' }, [
      createElement('div', { className: 'card', key: 'card' }, [
        createElement('div', { className: 'branding', key: 'branding' }, [
          createElement('h1', { key: 'title' }, 'Artículo 140'),
          createElement('p', { className: 'subtitle', key: 'subtitle' }, 'Bienvenido, estudiante'),
          createElement('p', { className: 'helper', key: 'helper' }, 'Esta es su sección de estudiante.'),
        ]),
        createElement('p', { key: 'cuenta', style: { color: '#475569', marginBottom: 18 } }, 'Número de cuenta: ' + (cuenta || '—')),
        createElement(
          'a',
          { key: 'login-link', href: '/auth/login', className: 'btn btn-link' },
          'Comenzar sesión como estudiante'
        ),
      ]),
    ])
  );
}

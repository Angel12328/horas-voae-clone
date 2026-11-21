import { createElement } from 'react';

export default function StudentPanel({ searchParams }) {
  const cuenta = (searchParams && searchParams.cuenta) ? String(searchParams.cuenta) : '';

  return (
    createElement('main', { className: 'app' }, [
      createElement('div', { className: 'card' }, [
        createElement('div', { className: 'branding' }, [
          createElement('h1', {}, 'Artículo 140'),
          createElement('p', { className: 'subtitle' }, 'Bienvenido, estudiante'),
          createElement('p', { className: 'helper' }, 'Esta es su sección de estudiante.'),
        ]),
        createElement('p', { style: { color: '#475569', marginBottom: 18 } }, 'Número de cuenta: ' + (cuenta || '—')),
        createElement(
          'a',
          { href: '/auth/login', className: 'btn btn-link' },
          'Comenzar sesión como estudiante'
        ),
      ]),
    ])
  );
}

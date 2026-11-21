import { createElement } from 'react';

export default function ErrorPage() {
  return (
    createElement('main', { className: 'app' }, [
      createElement('div', { className: 'card error-box', key: 'card' }, [
        createElement('div', { className: 'branding', key: 'branding' }, [
          createElement('h1', { key: 'title' }, 'Artículo 140'),
          createElement('p', { className: 'subtitle', key: 'subtitle' }, 'Mantenimiento'),
        ]),
        createElement('p', { className: 'subtitle', key: 'atencion' }, '¡Atención!'),
        createElement(
          'p',
          { key: 'detalle', style: { color: '#475569', marginBottom: 18 } },
          'La sección de empleado actualmente está en mantenimiento.'
        ),
        createElement(
          'a',
          { key: 'volver', href: '/', className: 'btn btn-primary' },
          'Volver al inicio'
        ),
      ]),
    ])
  );
}

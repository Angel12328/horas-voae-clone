import { createElement } from 'react';

export default function ErrorPage() {
  return (
    createElement('main', { className: 'app' }, [
      createElement('div', { className: 'card error-box' }, [
        createElement('div', { className: 'branding' }, [
          createElement('h1', {}, 'Artículo 140'),
          createElement('p', { className: 'subtitle' }, 'Mantenimiento'),
        ]),
        createElement('p', { className: 'subtitle' }, '¡Atención!'),
        createElement(
          'p',
          { style: { color: '#475569', marginBottom: 18 } },
          'La sección de empleado actualmente está en mantenimiento.'
        ),
        createElement(
          'a',
          { href: '/', className: 'btn btn-primary' },
          'Volver al inicio'
        ),
      ]),
    ])
  );
}

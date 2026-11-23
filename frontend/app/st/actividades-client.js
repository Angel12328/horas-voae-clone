
'use client';

import { createElement, useState } from 'react';
import { StudentShell } from '../../components/layout/student-shell.js';

export default function ActividadesClient() {
  const [busqueda, setBusqueda] = useState('');

  return createElement(StudentShell, {}, [
    createElement('div', { className: 'search-area', key: 'search' }, [
      createElement('span', { key: 'info' }, '●'),

      createElement('input', {
        type: 'search',
        placeholder: 'Buscar...',
        value: busqueda,
        onChange: (event) => setBusqueda(event.target.value),
        'aria-label': 'Buscar actividades',
        key: 'search-input',
      }),
    ]),

    createElement('section', {
      className: 'activities-section',
      key: 'activities-section',
    }, [
      createElement('h1', { key: 'title' }, 'Actividades'),

      createElement('div', {
        className: 'activities-grid',
        key: 'grid',
      }, [
        createElement('p', { key: 'placeholder' },
          'Aquí aparecerá la actividad disponible.'
        ),
      ]),
    ]),
  ]);
}

'use client';

import { createElement, useState } from 'react';
import { StudentShell } from '../../components/layout/student-shell.js';

const ACTIVIDAD = {
  nombre: 'Torneo de Ajedrez',
  fecha: '30/11/2016',
  categoria: 'Deportivo',
  plataforma: 'Co-Working',
  imagen: '/actividad-referencia.png',
};

export default function ActividadesClient() {
  const [busqueda, setBusqueda] = useState('');

  // Buscar por nombre, fecha, categoría o plataforma.
  const termino = busqueda.trim().toLowerCase();

  const coincideBusqueda = [
    ACTIVIDAD.nombre,
    ACTIVIDAD.fecha,
    ACTIVIDAD.categoria,
    ACTIVIDAD.plataforma,
  ].some((dato) => dato.toLowerCase().includes(termino));

  const mostrarActividad = !termino || coincideBusqueda;

  return createElement(
    StudentShell,
    null,
    [
      // BUSCADOR
      createElement(
        'div',
        {
          className: 'search-area',
          key: 'search',
        },
        [
          createElement(
            'span',
            {
              className: 'search-icon',
              'aria-hidden': true,
              key: 'search-icon',
            },
            '⌕'
          ),

          createElement(
            'input',
            {
              type: 'search',
              placeholder: 'Buscar...',
              value: busqueda,
              onChange: (event) => setBusqueda(event.target.value),
              'aria-label': 'Buscar actividades',
              key: 'search-input',
            }
          ),
        ]
      ),

      // SECCIÓN DE ACTIVIDADES
      createElement(
        'section',
        {
          className: 'activities-section',
          'aria-labelledby': 'activities-title',
          key: 'activities-section',
        },
        [
          createElement(
            'h1',
            {
              id: 'activities-title',
              key: 'title',
            },
            'Actividades'
          ),

          createElement(
            'div',
            {
              className: 'activities-grid',
              key: 'grid',
            },
            [
              mostrarActividad
                ? createElement(
                    'article',
                    {
                      className: 'activity-card',
                      key: 'torneo-ajedrez',
                    },
                    [
                      createElement(
                        'img',
                        {
                          src: ACTIVIDAD.imagen,
                          alt: 'Ilustración de la actividad',
                          className: 'activity-image',
                          key: 'image',
                        }
                      ),

                      createElement(
                        'div',
                        {
                          className: 'activity-details',
                          key: 'details',
                        },
                        [
                          createElement(
                            'h2',
                            { key: 'name' },
                            ACTIVIDAD.nombre
                          ),

                          createElement(
                            'p',
                            {
                              className: 'activity-date',
                              key: 'date',
                            },
                            `Fecha de inicio: ${ACTIVIDAD.fecha}`
                          ),

                          createElement(
                            'span',
                            {
                              className: 'activity-category',
                              key: 'category',
                            },
                            ACTIVIDAD.categoria
                          ),

                          createElement(
                            'div',
                            {
                              className: 'activity-platform',
                              key: 'platform',
                            },
                            ACTIVIDAD.plataforma
                          ),
                        ]
                      ),
                    ]
                  )
                : createElement(
                    'p',
                    {
                      className: 'no-results',
                      role: 'status',
                      key: 'no-results',
                    },
                    'No se encontraron actividades.'
                  ),
            ]
          ),
        ]
      ),
    ]
  );
}
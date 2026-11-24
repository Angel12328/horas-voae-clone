'use client';

import { createElement, useMemo, useState } from 'react';
import Link from 'next/link';
import { StudentShell } from '../../components/layout/student-shell.js';
import { FilterIcon, SortIcon } from '../../components/icons.js';

// Lista de actividades (mock). Array para poder filtrar/ordenar; hoy solo
// hay una, pero los controles quedan listos para cuando se agreguen más.
const ACTIVIDADES = [
  {
    codigo: '00001TOAJ',
    nombre: 'Encuesta Deportiva',
    fecha: '23/11/2026',
    ambito: 'Deportivo',
    plataforma: 'Virtual',
    imagen: '/actividad-referencia.png',
  },
];

export default function ActividadesClient() {
  const [busqueda, setBusqueda] = useState('');
  const [ambitoFiltro, setAmbitoFiltro] = useState('Todos');
  const [orden, setOrden] = useState('asc');

  const ambitos = useMemo(
    () => ['Todos', ...new Set(ACTIVIDADES.map((a) => a.ambito))],
    []
  );

  const actividadesVisibles = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    const filtradas = ACTIVIDADES.filter((a) => {
      const coincideAmbito = ambitoFiltro === 'Todos' || a.ambito === ambitoFiltro;
      const coincideBusqueda =
        !termino ||
        [a.nombre, a.fecha, a.ambito, a.plataforma].some((dato) =>
          dato.toLowerCase().includes(termino)
        );
      return coincideAmbito && coincideBusqueda;
    });

    return [...filtradas].sort((a, b) =>
      orden === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre)
    );
  }, [busqueda, ambitoFiltro, orden]);

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

          // Filtros: Por Ámbito + Orden A-Z
          createElement('div', { className: 'activities-filters', key: 'filters' }, [
            createElement('label', { className: 'filter-group', key: 'ambito' }, [
              createElement(FilterIcon, { key: 'icon' }),
              createElement('span', { key: 'label' }, 'Por Ámbito'),
              createElement(
                'select',
                {
                  key: 'select',
                  value: ambitoFiltro,
                  onChange: (e) => setAmbitoFiltro(e.target.value),
                  'aria-label': 'Filtrar por ámbito',
                },
                ambitos.map((amb) => createElement('option', { key: amb, value: amb }, amb))
              ),
            ]),
            createElement('label', { className: 'filter-group', key: 'orden' }, [
              createElement(SortIcon, { key: 'icon' }),
              createElement('span', { key: 'label' }, 'Orden A-Z'),
              createElement(
                'select',
                {
                  key: 'select',
                  value: orden,
                  onChange: (e) => setOrden(e.target.value),
                  'aria-label': 'Ordenar alfabéticamente',
                },
                [
                  createElement('option', { key: 'asc', value: 'asc' }, 'Ascendente'),
                  createElement('option', { key: 'desc', value: 'desc' }, 'Descendente'),
                ]
              ),
            ]),
          ]),

          createElement(
            'div',
            {
              className: 'activities-grid',
              key: 'grid',
            },
            actividadesVisibles.length > 0
              ? actividadesVisibles.map((actividad) =>
                  createElement(
                    Link,
                    {
                      href: `/st/show/${actividad.codigo}`,
                      className: 'activity-card',
                      key: actividad.codigo,
                    },
                    [
                      createElement(
                        'img',
                        {
                          src: actividad.imagen,
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
                            actividad.nombre
                          ),

                          createElement(
                            'p',
                            {
                              className: 'activity-date',
                              key: 'date',
                            },
                            `Fecha de inicio: ${actividad.fecha}`
                          ),

                          createElement(
                            'span',
                            {
                              className: 'activity-category',
                              key: 'category',
                            },
                            actividad.ambito
                          ),

                          createElement(
                            'div',
                            {
                              className: 'activity-platform',
                              key: 'platform',
                            },
                            actividad.plataforma
                          ),
                        ]
                      ),
                    ]
                  )
                )
              : [
                  createElement(
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

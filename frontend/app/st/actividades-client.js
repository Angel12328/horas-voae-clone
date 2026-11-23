'use client';

import {
  createElement,
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

const ACTIVIDAD = {
  nombre: 'Torneo de Ajedrez',
  fecha: '30/11/2016',
  categoria: 'Deportivo',
  plataforma: 'Co-Working',
  imagen: '/actividad-referencia.png',
};

export default function ActividadesClient() {
  const router = useRouter();

  const [menuPerfil, setMenuPerfil] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  // Cerrar el menú al hacer clic fuera o pulsar Escape.
  useEffect(() => {
    if (!menuPerfil) return;

    const cerrarAlHacerClickFuera = (event) => {
      if (!event.target?.closest?.('.profile-container')) {
        setMenuPerfil(false);
      }
    };

    const cerrarConEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuPerfil(false);
      }
    };

    document.addEventListener(
      'pointerdown',
      cerrarAlHacerClickFuera
    );

    document.addEventListener(
      'keydown',
      cerrarConEscape
    );

    return () => {
      document.removeEventListener(
        'pointerdown',
        cerrarAlHacerClickFuera
      );

      document.removeEventListener(
        'keydown',
        cerrarConEscape
      );
    };
  }, [menuPerfil]);

  // Cerrar sesión.
  const cerrarSesion = () => {
    localStorage.removeItem('cuenta');
    setMenuPerfil(false);
    router.replace('/auth/login');
  };

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
    'div',
    {
      className: 'student-panel',
    },
    [
      // ENCABEZADO
      createElement(
        'header',
        {
          className: 'student-header',
          key: 'header',
        },
        [
          createElement(
            'div',
            {
              className: 'student-logo',
              key: 'logo',
            },
            'Artículo 140'
          ),

          // MENÚ DE PERFIL
          createElement(
            'div',
            {
              className: 'profile-container',
              key: 'profile',
            },
            [
              createElement(
                'button',
                {
                  className: 'profile-button',
                  type: 'button',
                  onClick: () =>
                    setMenuPerfil((actual) => !actual),
                  'aria-expanded': menuPerfil,
                  'aria-haspopup': 'true',
                  'aria-label': 'Abrir menú del perfil',
                  key: 'profile-button',
                },
                [
                  createElement(
                    'span',
                    {
                      className: 'profile-initials',
                      key: 'initials',
                    },
                    'AZ'
                  ),

                  createElement(
                    'span',
                    {
                      className: 'profile-arrow',
                      key: 'arrow',
                      'aria-hidden': true,
                    },
                    menuPerfil ? '⌃' : '⌄'
                  ),
                ]
              ),

              menuPerfil &&
                createElement(
                  'div',
                  {
                    className: 'profile-dropdown',
                    key: 'dropdown',
                  },
                  [
                    createElement(
                      'button',
                      {
                        type: 'button',
                        onClick: cerrarSesion,
                        className: 'logout-button',
                        key: 'logout',
                      },
                      'Cerrar sesión'
                    ),
                  ]
                ),
            ]
          ),
        ]
      ),

      // CUERPO PRINCIPAL
      createElement(
        'div',
        {
          className: 'student-body',
          key: 'body',
        },
        [
          // BARRA LATERAL
          createElement(
            'aside',
            {
              className: 'student-sidebar',
              key: 'sidebar',
            },
            [
              createElement(
                'h2',
                {
                  key: 'menu-title',
                },
                'Menú'
              ),

              createElement(
                'nav',
                {
                  'aria-label': 'Navegación principal',
                  key: 'navigation',
                },
                [
                  createElement(
                    'a',
                    {
                      href: '/st',
                      className: 'sidebar-link',
                      key: 'inicio',
                    },
                    [
                      createElement(
                        'span',
                        { key: 'icon' },
                        '⌂'
                      ),

                      createElement(
                        'span',
                        { key: 'label' },
                        'Inicio'
                      ),
                    ]
                  ),

                  createElement(
                    'a',
                    {
                      href: '/st',
                      className: 'sidebar-link active',
                      'aria-current': 'page',
                      key: 'activities',
                    },
                    [
                      createElement(
                        'span',
                        { key: 'icon' },
                        '▣'
                      ),

                      createElement(
                        'span',
                        { key: 'label' },
                        'Mis Actividades'
                      ),
                    ]
                  ),
                ]
              ),
            ]
          ),

          // CONTENIDO
          createElement(
            'main',
            {
              className: 'student-content',
              key: 'content',
            },
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
                      onChange: (event) =>
                        setBusqueda(event.target.value),
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
                                    {
                                      key: 'name',
                                    },
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
          ),
        ]
      ),
    ]
  );
}
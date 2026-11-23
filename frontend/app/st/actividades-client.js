
'use client';

import { createElement, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ActividadesClient() {
  const router = useRouter();
  const [menuPerfil, setMenuPerfil] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  const cerrarSesion = () => {
    localStorage.removeItem('cuenta');
    router.replace('/auth/login');
  };

  return createElement('div', { className: 'student-panel' }, [

    // Encabezado principal
    createElement('header', { className: 'student-header', key: 'header' }, [
      createElement('div', { className: 'student-logo', key: 'logo' },
        'Artículo 140'
      ),

      createElement('div', { className: 'profile-container', key: 'profile' }, [
        createElement('button', {
          className: 'profile-button',
          type: 'button',
          onClick: () => setMenuPerfil(!menuPerfil),
          'aria-expanded': menuPerfil,
          key: 'profile-button',
        }, [
          createElement('span', { key: 'initials' }, 'AZ'),
          createElement('span', { key: 'arrow' }, '⌄'),
        ]),

        menuPerfil && createElement('div', {
          className: 'profile-dropdown',
          key: 'dropdown',
        }, [
          createElement('button', {
            type: 'button',
            onClick: cerrarSesion,
            key: 'logout',
          }, 'Cerrar sesión'),
        ]),
      ]),
    ]),

    // Cuerpo del panel
    createElement('div', { className: 'student-body', key: 'body' }, [

      // Menú lateral
      createElement('aside', { className: 'student-sidebar', key: 'sidebar' }, [
        createElement('h2', { key: 'menu-title' }, 'Menú'),

        createElement('nav', { key: 'navigation' }, [
          createElement('a', {
            href: '/st',
            className: 'sidebar-link active',
            key: 'inicio',
          }, '⌂  Inicio'),

          createElement('a', {
            href: '/st',
            className: 'sidebar-link',
            key: 'activities',
          }, '▣  Mis Actividades'),
        ]),
      ]),

      // Contenido principal
      createElement('main', { className: 'student-content', key: 'content' }, [

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
            createElement('article', {
  className: 'activity-card',
  key: 'torneo-ajedrez',
}, [
  createElement('img', {
    src: '/actividad-referencia.png',
    alt: 'Ilustración de actividad académica',
    className: 'activity-image',
    key: 'image',
  }),

  createElement('div', {
    className: 'activity-details',
    key: 'details',
  }, [
    createElement('h2', { key: 'name' }, 'Torneo de Ajedrez'),

    createElement('p', { key: 'date' },
      'Fecha de inicio: 30/11/2016'
    ),

    createElement('span', {
      className: 'activity-category',
      key: 'category',
    }, 'Deportivo'),

    createElement('div', {
      className: 'activity-platform',
      key: 'platform',
    }, 'Co-Working'),
  ]),
]),
          ]),
        ]),
      ]),
    ]),
  ]);
}

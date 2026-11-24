'use client';

import { createElement, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogoMarkIcon } from '../icons.js';
import './student-shell.css';

/**
 * Header + sidebar compartidos del panel de estudiante.
 * Extraído de app/st/actividades-client.js (commit "Dashboard actividades")
 * para que /st y /st/show/[codigo] usen el mismo header/menú — issue
 * "Clonar Informacion de Actividad". Mismo markup/clases/comportamiento que
 * el dashboard original, solo que ahora recibe el contenido como children.
 */
export function StudentShell({ children }) {
  const router = useRouter();
  const [menuPerfil, setMenuPerfil] = useState(false);

  const cerrarSesion = () => {
    localStorage.removeItem('cuenta');
    router.replace('/auth/login');
  };

  return createElement('div', { className: 'student-panel' }, [
    // Encabezado principal
    createElement('header', { className: 'student-header', key: 'header' }, [
      createElement('div', { className: 'student-logo', key: 'logo' }, [
        createElement(LogoMarkIcon, { key: 'mark', className: 'student-logo-mark' }),
        createElement('span', { key: 'text' }, 'Artículo 140'),
      ]),

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

      // Contenido principal (lo que pase cada página)
      createElement('main', { className: 'student-content', key: 'content' }, children),
    ]),
  ]);
}

import { createElement } from 'react';
import { WarningIcon } from '../../components/icons.js';

export const metadata = {
  title: 'Artículo 140 | Aviso de seguridad',
};

const TIPS = [
  'Verifica que el código QR provenga de una fuente oficial de Artículo 140 antes de escanearlo.',
  'Nunca ingreses tu número de cuenta o contraseña en una página a la que llegaste escaneando un QR desconocido.',
  'Revisa la URL completa antes de continuar: los enlaces de phishing suelen imitar dominios reales con pequeños cambios.',
  'Si un QR te pide "confirmar" tu inscripción con tus credenciales institucionales, repórtalo en lugar de completarlo.',
];

/**
 * Página de concientización sobre QR/phishing (issue "Clonar Informacion de
 * Actividad"): el QR de la actividad apunta aquí en vez de a un enlace real.
 * Diseño libre, sin lógica adicional.
 */
export default function AlertPage() {
  return createElement('main', { className: 'app' }, [
    createElement('div', { className: 'card alert-card', key: 'card' }, [
      createElement('div', { className: 'alert-icon-wrap', key: 'icon' }, [
        createElement(WarningIcon, { className: 'alert-icon' }),
      ]),
      createElement('h1', { className: 'alert-title', key: 'title' }, '¡Precaución al escanear códigos QR!'),
      createElement(
        'p',
        { className: 'helper', key: 'intro' },
        'Los códigos QR pueden llevarte a sitios falsos diseñados para robar tus credenciales. Antes de continuar, ten en cuenta:'
      ),
      createElement(
        'ul',
        { className: 'alert-tips', key: 'tips' },
        TIPS.map((tip, i) => createElement('li', { key: 'tip-' + i }, tip))
      ),
      createElement(
        'a',
        { key: 'back', href: '/st', className: 'btn btn-primary' },
        'Entendido, volver al inicio'
      ),
    ]),
  ]);
}

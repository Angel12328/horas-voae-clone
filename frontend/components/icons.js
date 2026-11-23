import { createElement } from 'react';

// Props comunes de los iconos SVG (no se tocan: viewBox, stroke, etc.).
const common = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

// EnvelopeIcon — sobre / correo.
export function EnvelopeIcon({ className = 'w-5 h-5', style }) {
  return createElement('svg', { ...common, className, style: { width: '1.25rem', height: '1.25rem', ...style } }, [
    createElement('path', { key: 'body', d: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' }),
    createElement('path', { key: 'flap', d: 'M22 6l-8.97 8.57A2 2 0 0 1 16.96 15H9.04a2 2 0 0 1-1.92-1.44L2 6' }),
  ]);
}

// LockIcon — candado.
export function LockIcon({ className = 'w-5 h-5', style }) {
  return createElement('svg', { ...common, className, style: { width: '1.25rem', height: '1.25rem', ...style } }, [
    createElement('rect', { key: 'body', x: 3, y: 11, width: 18, height: 11, rx: 2, ry: 2 }),
    createElement('path', { key: 'shackle', d: 'M7 11V7a5 5 0 0 1 10 0v4' }),
  ]);
}

// UserIcon — perfil de usuario (campo "No. de Cuenta").
export function UserIcon({ className = 'w-5 h-5', style }) {
  return createElement('svg', { ...common, className, style: { width: '1.25rem', height: '1.25rem', ...style } }, [
    createElement('path', { key: 'head', d: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z' }),
    createElement('circle', { key: 'face', cx: 12, cy: 10.5, r: 2.6 }),
    createElement('path', { key: 'body', d: 'M12 18v-4' }),
    createElement('path', { key: 'neck', d: 'M12 8v-2' }),
  ]);
}

// EyeIcon — ojo (mostrar contraseña).
export function EyeIcon({ className = 'w-5 h-5', style }) {
  return createElement('svg', { ...common, className, style: { width: '1.25rem', height: '1.25rem', ...style } }, [
    createElement('path', { key: 'outline', d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' }),
    createElement('circle', { key: 'pupil', cx: 12, cy: 12, r: 3 }),
  ]);
}

// EyeOffIcon — ojo tachado (ocultar contraseña).
export function EyeOffIcon({ className = 'w-5 h-5', style }) {
  return createElement('svg', { ...common, className, style: { width: '1.25rem', height: '1.25rem', ...style } }, [
    createElement('path', { key: 'outline', d: 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94' }),
    createElement('path', { key: 'top', d: 'M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19' }),
    createElement('path', { key: 'pupil', d: 'M14.12 14.12a3 3 0 1 1-4.24-4.24' }),
    createElement('line', { key: 'slash', x1: 1, y1: 1, x2: 23, y2: 23 }),
  ]);
}

// LogoMarkIcon — insignia circular del logo "Artículo 140" (topbar).
export function LogoMarkIcon({ className = 'w-7 h-7', style }) {
  return createElement('svg', { ...common, className, style: { width: '1.75rem', height: '1.75rem', ...style }, strokeWidth: 1.6 }, [
    createElement('circle', { key: 'ring', cx: 12, cy: 12, r: 10 }),
    createElement('path', { key: 'cap', d: 'M7 10.5 12 8l5 2.5-5 2.5-5-2.5z' }),
    createElement('path', { key: 'strap', d: 'M9 11.7v2.3c0 .9 1.34 1.6 3 1.6s3-.7 3-1.6v-2.3' }),
  ]);
}

// ArrowLeftIcon — flecha "Atrás".
export function ArrowLeftIcon({ className = 'w-5 h-5', style }) {
  return createElement('svg', { ...common, className, style: { width: '1.25rem', height: '1.25rem', ...style } }, [
    createElement('line', { key: 'line', x1: 19, y1: 12, x2: 5, y2: 12 }),
    createElement('polyline', { key: 'arrow', points: '12 19 5 12 12 5' }),
  ]);
}

// ShareIcon — compartir (tres nodos conectados).
export function ShareIcon({ className = 'w-5 h-5', style }) {
  return createElement('svg', { ...common, className, style: { width: '1.25rem', height: '1.25rem', ...style } }, [
    createElement('circle', { key: 'n1', cx: 18, cy: 5, r: 3 }),
    createElement('circle', { key: 'n2', cx: 6, cy: 12, r: 3 }),
    createElement('circle', { key: 'n3', cx: 18, cy: 19, r: 3 }),
    createElement('line', { key: 'l1', x1: 8.59, y1: 10.51, x2: 15.42, y2: 6.49 }),
    createElement('line', { key: 'l2', x1: 8.59, y1: 13.49, x2: 15.42, y2: 17.51 }),
  ]);
}

// FingerprintIcon — huella (botón de inscripción / asistencia).
export function FingerprintIcon({ className = 'w-5 h-5', style }) {
  return createElement('svg', { ...common, className, style: { width: '1.25rem', height: '1.25rem', ...style } }, [
    createElement('path', { key: 'p1', d: 'M12 11c0 3.5-.5 6.5-2 9' }),
    createElement('path', { key: 'p2', d: 'M8.5 14.5c.4-1.2.7-2.7.7-4.5 0-1.7 1.3-3 3-3s3 1.3 3 3c0 .5 0 1-.1 1.5' }),
    createElement('path', { key: 'p3', d: 'M5.5 11c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5c0 1.6-.1 3-.4 4.3' }),
    createElement('path', { key: 'p4', d: 'M3.5 11a8.5 8.5 0 0 1 2.5-6' }),
    createElement('path', { key: 'p5', d: 'M17.5 16.5c.6-1.6 1-3.4 1-5.5' }),
  ]);
}

// ChevronDownIcon — flecha abajo (menú de perfil).
export function ChevronDownIcon({ className = 'w-4 h-4', style }) {
  return createElement('svg', { ...common, className, style: { width: '1rem', height: '1rem', ...style } }, [
    createElement('polyline', { key: 'chev', points: '6 9 12 15 18 9' }),
  ]);
}

// LogoutIcon — cerrar sesión.
export function LogoutIcon({ className = 'w-4 h-4', style }) {
  return createElement('svg', { ...common, className, style: { width: '1rem', height: '1rem', ...style } }, [
    createElement('path', { key: 'door', d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' }),
    createElement('polyline', { key: 'arrow', points: '16 17 21 12 16 7' }),
    createElement('line', { key: 'line', x1: 21, y1: 12, x2: 9, y2: 12 }),
  ]);
}

// HomeIcon — inicio (sidebar).
export function HomeIcon({ className = 'w-5 h-5', style }) {
  return createElement('svg', { ...common, className, style: { width: '1.25rem', height: '1.25rem', ...style } }, [
    createElement('path', { key: 'roof', d: 'M3 10.5 12 3l9 7.5' }),
    createElement('path', { key: 'body', d: 'M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5' }),
    createElement('path', { key: 'door', d: 'M9 21v-6h6v6' }),
  ]);
}

// ActivitiesIcon — mis actividades (sidebar).
export function ActivitiesIcon({ className = 'w-5 h-5', style }) {
  return createElement('svg', { ...common, className, style: { width: '1.25rem', height: '1.25rem', ...style } }, [
    createElement('rect', { key: 'board', x: 3, y: 4, width: 18, height: 17, rx: 2 }),
    createElement('line', { key: 'tab1', x1: 8, y1: 2, x2: 8, y2: 6 }),
    createElement('line', { key: 'tab2', x1: 16, y1: 2, x2: 16, y2: 6 }),
    createElement('polyline', { key: 'check', points: '8 13 11 16 16 10' }),
  ]);
}

// UsersIcon — grupo de personas ("Cupos Disponibles").
export function UsersIcon({ className = 'w-5 h-5', style }) {
  return createElement('svg', { ...common, className, style: { width: '1.25rem', height: '1.25rem', ...style } }, [
    createElement('path', { key: 'body1', d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
    createElement('circle', { key: 'head1', cx: 9, cy: 7, r: 4 }),
    createElement('path', { key: 'body2', d: 'M22 21v-2a4 4 0 0 0-3-3.87' }),
    createElement('path', { key: 'head2', d: 'M16 3.13a4 4 0 0 1 0 7.75' }),
  ]);
}

// WarningIcon — alerta de seguridad (/alert).
export function WarningIcon({ className = 'w-6 h-6', style }) {
  return createElement('svg', { ...common, className, style: { width: '1.5rem', height: '1.5rem', ...style } }, [
    createElement('path', { key: 'tri', d: 'M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' }),
    createElement('line', { key: 'line', x1: 12, y1: 9, x2: 12, y2: 13 }),
    createElement('line', { key: 'dot', x1: 12, y1: 17, x2: 12.01, y2: 17 }),
  ]);
}

// QrIcon — representación simplificada de un código QR.
export function QrIcon({ className = 'w-full h-full', style }) {
  return createElement('svg', { ...common, className, style, fill: 'currentColor', stroke: 'none', viewBox: '0 0 24 24' }, [
    createElement('rect', { key: 'tl', x: 2, y: 2, width: 7, height: 7 }),
    createElement('rect', { key: 'tl-i', x: 4, y: 4, width: 3, height: 3, fill: '#fff' }),
    createElement('rect', { key: 'tr', x: 15, y: 2, width: 7, height: 7 }),
    createElement('rect', { key: 'tr-i', x: 17, y: 4, width: 3, height: 3, fill: '#fff' }),
    createElement('rect', { key: 'bl', x: 2, y: 15, width: 7, height: 7 }),
    createElement('rect', { key: 'bl-i', x: 4, y: 17, width: 3, height: 3, fill: '#fff' }),
    createElement('rect', { key: 's1', x: 11, y: 2, width: 2, height: 2 }),
    createElement('rect', { key: 's2', x: 11, y: 6, width: 2, height: 2 }),
    createElement('rect', { key: 's3', x: 15, y: 11, width: 2, height: 2 }),
    createElement('rect', { key: 's4', x: 19, y: 11, width: 2, height: 2 }),
    createElement('rect', { key: 's5', x: 11, y: 11, width: 2, height: 2 }),
    createElement('rect', { key: 's6', x: 11, y: 15, width: 2, height: 2 }),
    createElement('rect', { key: 's7', x: 11, y: 19, width: 2, height: 2 }),
    createElement('rect', { key: 's8', x: 15, y: 19, width: 2, height: 2 }),
    createElement('rect', { key: 's9', x: 19, y: 19, width: 2, height: 2 }),
    createElement('rect', { key: 's10', x: 19, y: 15, width: 2, height: 2 }),
  ]);
}

// ChessTrophyIllustration — ilustración plana del trofeo del Torneo de
// Ajedrez (recuadro clicable de la actividad, issue "Clonar Informacion de
// Actividad"). Ilustración original, con un peón de ajedrez sobre la copa.
export function ChessTrophyIllustration({ className = 'w-full h-full', style }) {
  return createElement(
    'svg',
    { className, style, viewBox: '0 0 240 180', preserveAspectRatio: 'xMidYMid meet', 'aria-hidden': true },
    [
      createElement('rect', { key: 'bg', width: 240, height: 180, fill: '#7FC8C4' }),

      // chispas decorativas
      createElement('path', {
        key: 'spark1',
        fill: '#fff',
        opacity: 0.85,
        d: 'M72,34 L74,40 L80,40 L75,44 L77,50 L72,46 L67,50 L69,44 L64,40 L70,40 Z',
      }),
      createElement('path', {
        key: 'spark2',
        fill: '#fff',
        opacity: 0.7,
        d: 'M158,28 L159,32 L163,32 L160,34.5 L161,38 L158,35.5 L155,38 L156,34.5 L153,32 L157,32 Z',
      }),

      // listones
      createElement('polygon', { key: 'ribbon-l', fill: '#1E3A8A', points: '95,78 112,78 90,150 73,150' }),
      createElement('polygon', { key: 'ribbon-l-hi', fill: '#fff', opacity: 0.55, points: '99,78 104,78 85,150 80,150' }),
      createElement('polygon', { key: 'ribbon-r', fill: '#B91C1C', points: '128,78 145,78 167,150 150,150' }),
      createElement('polygon', { key: 'ribbon-r-hi', fill: '#fff', opacity: 0.55, points: '136,78 141,78 160,150 155,150' }),

      // asas de la copa
      createElement('path', {
        key: 'handle-l',
        fill: 'none',
        stroke: '#D4A017',
        strokeWidth: 7,
        strokeLinecap: 'round',
        d: 'M86,64 Q58,64 60,86 Q62,102 85,94',
      }),
      createElement('path', {
        key: 'handle-r',
        fill: 'none',
        stroke: '#D4A017',
        strokeWidth: 7,
        strokeLinecap: 'round',
        d: 'M154,64 Q182,64 180,86 Q178,102 155,94',
      }),

      // pedestal
      createElement('rect', { key: 'pedestal', x: 90, y: 134, width: 60, height: 26, rx: 4, fill: '#2B2B2B' }),
      createElement('rect', { key: 'plate', x: 95, y: 126, width: 50, height: 10, rx: 3, fill: '#B8860B' }),
      createElement('rect', { key: 'stem', x: 112, y: 108, width: 16, height: 20, fill: '#D4A017' }),

      // copa
      createElement('path', { key: 'cup', fill: '#F5B301', d: 'M85,54 L155,54 L145,96 Q120,112 95,96 Z' }),
      createElement('ellipse', { key: 'rim', cx: 120, cy: 54, rx: 35, ry: 9, fill: '#FDE68A' }),

      // peón de ajedrez sobre la copa
      createElement('circle', { key: 'pawn-head', cx: 120, cy: 34, r: 8, fill: '#263B65' }),
      createElement('path', { key: 'pawn-body', fill: '#263B65', d: 'M108,52 Q120,38 132,52 L136,60 L104,60 Z' }),
      createElement('rect', { key: 'pawn-base', x: 102, y: 59, width: 36, height: 6, rx: 2, fill: '#263B65' }),
    ]
  );
}

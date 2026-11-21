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

/**
 * EnvelopeIcon — icono de sobre / correo.
 * @param {Object} props
 * @param {string} props.className Clase opcional.
 * @param {Object} props.style Estilo opcional.
 */
export function EnvelopeIcon({ className = 'w-5 h-5', style }) {
  return createElement('svg', { ...common, className, style: { width: '1.25rem', height: '1.25rem', ...style } }, [
    createElement('path', { d: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' }),
    createElement('path', { d: 'M22 6l-8.97 8.57A2 2 0 0 1 16.96 15H9.04a2 2 0 0 1-1.92-1.44L2 6' }),
  ]);
}

export function LockIcon({ className = 'w-5 h-5', style }) {
  return createElement('svg', { ...common, className, style: { width: '1.25rem', height: '1.25rem', ...style } }, [
    createElement('rect', { x: 3, y: 11, width: 18, height: 11, rx: 2, ry: 2 }),
    createElement('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' }),
  ]);
}

export function EyeIcon({ className = 'w-5 h-5', style }) {
  return createElement('svg', { ...common, className, style: { width: '1.25rem', height: '1.25rem', ...style } }, [
    createElement('path', { d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' }),
    createElement('circle', { cx: 12, cy: 12, r: 3 }),
  ]);
}

export function EyeOffIcon({ className = 'w-5 h-5', style }) {
  return createElement('svg', { ...common, className, style: { width: '1.25rem', height: '1.25rem', ...style } }, [
    createElement('path', { d: 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94' }),
    createElement('path', { d: 'M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19' }),
    createElement('path', { d: 'M14.12 14.12a3 3 0 1 1-4.24-4.24' }),
    createElement('line', { x1: 1, y1: 1, x2: 23, y2: 23 }),
  ]);
}

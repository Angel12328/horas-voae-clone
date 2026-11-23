'use client';

import { createElement } from 'react';

/**
 * Overlay gris translúcido con spinner, usado 3s al confirmar
 * inscripción/abandono (issue "Clonar Informacion de Actividad").
 */
export function LoadingOverlay({ label = 'Procesando...' }) {
  return createElement('div', { className: 'loading-overlay', role: 'status', 'aria-live': 'polite' }, [
    createElement('div', { className: 'spinner', key: 'spinner' }),
    createElement('p', { className: 'loading-label', key: 'label' }, label),
  ]);
}

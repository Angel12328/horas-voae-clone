import { createElement } from 'react';
import { StudentShell } from '../../../../components/layout/student-shell.js';
import { ActivityInfo } from '../../../../components/activity/activity-info.js';
import { getActivity } from './activities-data.js';

// params es dinámico en Next 16: se lee de forma bloqueante a propósito,
// igual que searchParams en /st/page.js.
export const instant = false;

export default async function ActivityShowPage({ params }) {
  const { codigo } = await params;
  const activity = getActivity(codigo);

  if (!activity) {
    return createElement(StudentShell, {}, [
      createElement(
        'div',
        { className: 'not-found-box', key: 'not-found' },
        [
          createElement('h1', { key: 'title' }, 'Actividad no encontrada'),
          createElement('p', { key: 'detail' }, 'El código "' + codigo + '" no corresponde a ninguna actividad registrada.'),
          createElement('a', { key: 'back', href: '/st', className: 'btn btn-primary btn-inline' }, 'Volver a Inicio'),
        ]
      ),
    ]);
  }

  return createElement(StudentShell, {}, [
    createElement(ActivityInfo, { key: 'activity', codigo, activity }),
  ]);
}

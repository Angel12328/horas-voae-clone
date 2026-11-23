// Datos de actividades (mock, sin base de datos — issue "Clonar Informacion
// de Actividad" es solo UX). Clave = segmento de ruta /st/show/[codigo].
export const ACTIVITIES = {
  '00001TOAJ': {
    nombre: 'Torneo de Ajedrez',
    codigo: '12-TOAJ-0301',
    horario: '10:00 AM - 3:00 PM',
    fechaInicio: 'Lunes, 24/noviembre/2026',
    fechaFin: 'Lunes, 24/noviembre/2026',
    tipo: 'Torneo',
    ubicacion: 'Co-Working',
    modalidad: 'Presencial',
    asistencia: 'Simple | 1 asistencia',
    ambito: '10 horas en Deportivo',
    entidad: 'INGENIERIA EN SISTEMAS UNAH COMAYAGUA',
    rolEntidad: 'Principal',
    cuposModalidad: 20,
    descripcion:
      'Demuestra tu estrategia en el Torneo de Ajedrez de Artículo 140: partidas individuales a reloj, ' +
      'formato de eliminación y premiación para los primeros lugares. Abierto a todos los niveles, ' +
      'desde quienes mueven piezas por primera vez hasta jugadores con experiencia en torneos.',
  },
};

export function getActivity(codigo) {
  return ACTIVITIES[codigo] || null;
}

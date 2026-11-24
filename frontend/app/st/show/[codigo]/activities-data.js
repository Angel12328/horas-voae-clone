// Datos de actividades (mock, sin base de datos — issue "Clonar Informacion
// de Actividad" es solo UX). Clave = segmento de ruta /st/show/[codigo].
export const ACTIVITIES = {
  '00001TOAJ': {
    nombre: 'Encuesta Deportiva',
    codigo: '12-ENCD-0301',
    horario: 'Disponible las 24 horas',
    fechaInicio: 'Domingo, 23/noviembre/2026',
    fechaFin: 'Viernes, 05/diciembre/2026',
    tipo: 'Encuesta',
    ubicacion: 'Formulario en línea',
    modalidad: 'Virtual',
    asistencia: 'Simple | 1 asistencia',
    ambito: '10 horas en Deportivo',
    entidad: 'Departamento de Humanidades y artes C.U.R.C.',
    rolEntidad: 'Principal',
    cuposModalidad: 20,
    descripcion:
      'Comparte tu opinión en la Encuesta Deportiva de Artículo 140: cuéntanos qué actividades ' +
      'deportivas te gustaría ver el próximo semestre y ayúdanos a planificar la oferta institucional. ' +
      'Toma solo unos minutos y puedes responderla desde cualquier dispositivo.',
  },
};

export function getActivity(codigo) {
  return ACTIVITIES[codigo] || null;
}

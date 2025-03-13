import { eachMonthOfInterval } from 'date-fns';

export function obtenerMesesEntreFechas(fechaInicio, fechaFin) {
  const mesesRaw = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

  const startDate = new Date(fechaInicio);
  const endDate = new Date(fechaFin);

  const intervalo = eachMonthOfInterval({ start: startDate, end: endDate });

  const meses = intervalo.map((fecha) => ({
    id: fecha.getMonth() + 1,
    name: mesesRaw[fecha.getMonth()],
  }));
  return meses;
}

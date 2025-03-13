export const MIN_FASES_POZO = 1;
export const MAX_FASES_POZO = 4;

export const FASE_GUIA = 1;
export const FASE_INTERMEDIA = 2;
export const FASE_INTERMEDIA_SECUNDARIA = 3;
export const FASE_AISLACION = 4;

export const FASES_POZO = [
  { id: FASE_GUIA, nombreFase: 'Guía' },
  { id: FASE_INTERMEDIA, nombreFase: 'Intermedia' },
  { id: FASE_INTERMEDIA_SECUNDARIA, nombreFase: 'Intermedia' },
  { id: FASE_AISLACION, nombreFase: 'Aislación' },
];

export const FASES_POZO_POR_NOMBRE = FASES_POZO.reduce(
  (acc, { nombre, id }) => {
    acc[nombre] = id;
    return acc;
  },
  {}
);

export const CASINGS_OPTIONS = [
  { value: '', label: 'Seleccionar' },
  { value: '17.1/2" - 13.3/8" 61,5#', label: '17.1/2" - 13.3/8" 61,5#' },
  { value: '17.1/2" - 13.3/8" 54,5#', label: '17.1/2" - 13.3/8" 54,5#' },
  { value: '17.1/2" - 13.3/8" 40#', label: '17.1/2" - 13.3/8" 40#' },
  { value: '12.1/4" - 10.3/4" 40,5#', label: '12.1/4" - 10.3/4" 40,5#' },
  { value: '12.1/4" - 10.3/4" 45,5#', label: '12.1/4" - 10.3/4" 45,5#' },
  { value: '12.1/4" - 9.5/8" 36#', label: '12.1/4" - 9.5/8" 36#' },
  { value: '12.1/4" - 9.5/8" 40#', label: '12.1/4" - 9.5/8" 40#' },
  { value: '8.75 - 7.5/8" 29,7#', label: '8.75 - 7.5/8" 29,7#' },
  { value: '8.5" - 7.5/8" 24#', label: '8.5" - 7.5/8" 24#' },
  { value: '8.75" - 7.5/8" 24#', label: '8.75" - 7.5/8" 24#' },
  { value: '8.5 - 7" 20#', label: '8.5 - 7" 20#' },
  { value: '8.5 - 7" 23#', label: '8.5 - 7" 23#' },
  { value: '8.5" - 7.5/8" 26,4#', label: '8.5" - 7.5/8" 26,4#' },
  { value: '8.75" - 7.5/8" 26,4#', label: '8.75" - 7.5/8" 26,4#' },
  { value: '8.5 - 5.5" 20#', label: '8.5 - 5.5" 20#' },
  { value: '8.5 - 5.5" 23#', label: '8.5 - 5.5" 23#' },
  { value: '8.5 - 5" 18#', label: '8.5 - 5" 18#' },
  { value: '6,75 - 5" 18#', label: '6,75 - 5" 18#' },
  { value: '6,75 - 5" 21,4#', label: '6,75 - 5" 21,4#' },
  { value: '6.1/4 - 5" 18#', label: '6.1/4 - 5" 18#' },
  { value: '6.1/4 - 5" 21,4#', label: '6.1/4 - 5" 21,4#' },
  { value: '6.1/8 - 4.5" 13,5#', label: '6.1/8 - 4.5" 13,5#' },
];

export const ENDPOINTS = {
  LOCACIONES: {
    BASE: '/api/locaciones',
    POR_UBICACION: '/api/locaciones/por-ubicacion',
    DISPONIBLES: '/api/locaciones/disponibles',
  },
  PERFORADOR_LOCACIONES: {
    BASE: '/api/perforador-locaciones',
    BY_NUMERO: '/api/perforador-locaciones/perforador',
  },
  PERFORADORES: {
    BASE: '/api/perforadores',
    BY_NUMERO: '/api/perforadores/numero',
    PERFORADOR_SELECCIONADO: '/api/perforadores/perforador_seleccionado',
  },
  PLANES_POZO: {
    BASE: '/api/planes-pozo',
    FINALIZAR: '/api/planes-pozo/finalizar',
    BY_PERFORADOR: '/api/planes-pozo/perforador',
  },
  POZOS: {
    BASE: '/api/pozos',
  },
  AVANCES_POZO: {
    BASE: '/api/avances-pozo',
    BY_NUMERO_PERFORADOR: '/api/avances-pozo/perforador',
  },
  ESTADOS_DIAGRAMA: {
    BASE: '/api/estados-diagrama',
    BY_NUMERO_PERFORADOR: '/api/estados-diagrama/perforador',
  },
  ELEMENTOS_COMPONENTE: {
    BASE: '/api/elementos-componente',
    BY_NUMERO_PERFORADOR: '/api/elementos-componente/perforador',
  },
  ELEMENTOS_DEPOSITO: {
    BASE: '/api/elementos-deposito',
    POR_PERFORADOR: '/api/elementos-deposito/perforador',
  },
  MARCAS: {
    BASE: '/api/marcas',
  },
  MODELOS: {
    BASE: '/api/modelos',
  },
  TIPOS_ROSCA: {
    BASE: '/api/tipos-rosca',
  },
  DIAMETROS: {
    BASE: '/api/diametros',
  },
  CORTES_CABLE: {
    BASE: '/api/cortes-cable',
  },
  LOG_ELEMENTOS: {
    BASE: '/api/log-elementos',
  },
  DESGASTES_CABLE: {
    PERFORADOR: '/api/desgastes-cable/perforador',
  },
  UBICACIONES: {
    BASE: '/api/ubicaciones',
  },
  CRONOGRAMAS: {
    BASE: '/api/cronogramas',
  },
  PERFORADORES_CRONOGRAMA: {
    BASE: '/api/perforadores-cronograma',
  },
  LOCACIONES_PERFORADOR_CRONOGRAMA: {
    BASE: '/api/locaciones-perforador-cronograma',
  },
  PERFORADORES_FORECAST: {
    BASE: '/api/perforadores-forecast',
  },
  TAREAS_FORECAST: {
    BASE: '/api/tareas-forecast',
    TIPOS: '/api/tareas-forecast/tipos',
  },
  PLANIFICACION_AREAS: {
    BASE: '/api/planificacion-areas',
  },
  PLANIFICACIONES: {
    BASE: '/api/planificaciones',
    TAREAS_FORECAST: '/api/planificaciones/tareas-forecast',
  },
  TUBULARES_ADQUISICIONES: {
    BASE: '/api/tubulares-adquisiciones',
  },
  TUBULARES_RANGOS: {
    BASE: '/api/tubulares-rangos',
  },
  TUBULARES_PROVEEDORES: {
    BASE: '/api/tubulares-proveedores',
  },
  TUBULARES_TIPOS_BARRA: {
    BASE: '/api/tubulares-tipos-barra',
  },
  TUBULARES_TIPOS_CONEXION: {
    BASE: '/api/tubulares-tipos-conexion',
  },
  TUBULARES_DESTINOS: {
    BASE: '/api/tubulares-destinos',
  },
  TUBULARES: {
    BASE: '/api/tubulares',
    POR_PERFORADOR: '/api/tubulares/perforador',
  },
  TUBULARES_TALLERES: {
    BASE: '/api/tubulares-talleres',
  },
  TUBULARES_MOVIMIENTOS: {
    BASE: '/api/tubulares-movimientos',
  },
  TUBULARES_DOCUMENTOS: {
    BASE: '/api/tubulares-documentos',
  },
  PLANTA: {
    BOMBAS_ESTADO: '/api/planta/bombas',
    TOPDRIVE_ESTADO: '/api/planta/topdrive',
    CABLE_ESTADO: '/api/planta/cable',
  },
  TANQUES: {
    NIVELES: '/api/tanques',
  },
};

export const SHDB_ENDPOINTS = {
  PIEZAS_PERFORADOR: { BASE: '/api/piezas-perforador' },
  PERFORADOR_PIEZA: { BASE: '/api/perforador-pieza' },
  PIEZA: { BASE: '/api/pieza', TIPOS_PIEZA: '/api/pieza/tipos-pieza' },
  MARCA: { BASE: '/api/marca' },
  MODELO: { BASE: '/api/modelo' },
  DIAMETRO: { BASE: '/api/diametro' },
  NROSERIE: { BASE: '/api/base/nroSerie' },
  WELL_DATA: { BASE: '/api/well-data' },
};

import { FASE_AISLACION, FASE_GUIA } from '@/constants';

export const obtenerEtapaPorCampo = ({
  etapasPozo = [],
  value,
  property,
  field,
}) => {
  const etapaPozo =
    etapasPozo.find((etapa) => etapa?.tipo_etapa_pozo?.[property] === value) ||
    null;
  return field ? etapaPozo?.[field] : etapaPozo;
};

export const obtenerEtapaPorNombre = (etapasPozo = [], nombre, campo) => {
  const etapaPozo =
    etapasPozo.find((etapa) => etapa?.tipo_etapa_pozo?.nombre === nombre) ||
    null;

  if (campo) return etapaPozo?.[campo];
  return etapaPozo;
};

export const obtenerProfundidadReal = (etapaPozo) => {
  if (etapaPozo?.tipo_etapa_pozo_id === FASE_GUIA) {
    return parseFloat(etapaPozo?.profundidad_hasta);
  }
  return etapaPozo?.profundidad_hasta - etapaPozo?.profundidad_desde;
};

/**
 * Calcula el porcentaje de profundidad dentro de una etapa.
 * @param {Object} etapa - El objeto de la etapa.
 * @param {number} profundidad - El nivel de profundidad a calcular.
 * @returns {number} El porcentaje de profundidad dentro de la etapa, o 0 si no está dentro del rango.
 */
export const calcularPorcentajeEnEtapa = (etapa, profundidad) => {
  const desde = parseFloat(etapa.profundidad_desde);
  const hasta = parseFloat(etapa.profundidad_hasta);

  if (profundidad <= desde) {
    return 0;
  } else if (profundidad >= hasta) {
    return 100;
  } else {
    return ((profundidad - desde) / (hasta - desde)) * 100;
  }
};

/**
 * Calcula el valor de profundidad dentro de una etapa.
 * @param {Object} etapa - El objeto de la etapa.
 * @param {number} profundidad - El nivel de profundidad a calcular.
 * @returns {number} El nivel de profundidad dentro de la etapa, o 0 si no está dentro del rango.
 */
export const calcularProfundidadEnEtapa = (etapa, profundidad) => {
  const desde = parseFloat(etapa.profundidad_desde);
  const hasta = parseFloat(etapa.profundidad_hasta);

  if (profundidad <= desde) {
    return 0;
  } else if (profundidad >= hasta) {
    return hasta - desde;
  } else {
    return profundidad - desde;
  }
};

/**
 * Obtiene el porcentaje o profundidad correspondiente a cada etapa según el nivel de trepan proporcionado.
 * @param {string} etapasPozo - Array de etapas.
 * @param {number} nivelTrepano - El nivel de profundidad a comparar con las etapas.
 * @param {boolean} [porcentaje=false] - Si se debe calcular el porcentaje en lugar de la profundidad.
 * @returns {Object} Un objeto con los porcentajes o profundidades correspondientes para cada etapa.
 */
export const obtenerProgresoPorEtapasPozo = (
  etapasPozo = [],
  nivelTrepano,
  porcentaje = false
) => {
  if (!porcentaje) {
    const profundidades = etapasPozo?.map((etapa) =>
      calcularProfundidadEnEtapa(etapa, nivelTrepano)
    );
    return profundidades;
  }
  const porcentajes = etapasPozo?.map((etapa) =>
    calcularPorcentajeEnEtapa(etapa, nivelTrepano)
  );
  return porcentajes;
};

export function calcularProgresoTotalPorEtapa(porcentajes) {
  const etapas = [];

  if (porcentajes?.length === FASE_GUIA) {
    etapas.push({ index: 0, min: 0, max: 100 });
  } else if (porcentajes?.length === 2) {
    etapas.push(
      ...[
        { index: 0, min: 0, max: 13 },
        { index: 1, min: 13, max: 100 },
      ]
    );
  } else if (porcentajes?.length === 3) {
    etapas.push(
      ...[
        { index: 0, min: 0, max: 13 },
        { index: 1, min: 13, max: 32 },
        { index: 2, min: 32, max: 100 },
      ]
    );
  } else if (porcentajes?.length === FASE_AISLACION) {
    etapas.push(
      ...[
        { index: 0, min: 0, max: 13 },
        { index: 1, min: 13, max: 22.5 },
        { index: 2, min: 22.5, max: 32 },
        { index: 3, min: 32, max: 100 },
      ]
    );
  }

  let progresoTotal = 0;

  etapas.forEach((etapa) => {
    const progreso = porcentajes[etapa.index] || 0;
    const rangoTotal = etapa.max - etapa.min;

    const progresoEnRango = (progreso / 100) * rangoTotal;
    const porcentajeEtapa = (progresoEnRango / rangoTotal) * 100;

    progresoTotal += porcentajeEtapa * ((etapa.max - etapa.min) / 100);
  });

  return progresoTotal;
}

'use client';
import ProgressBar from '@/components/ui/progress/progress-bar';
import { formatCurrency } from '@/utils/formatters/currency.formatter';
import {
  obtenerEtapaPorCampo,
  obtenerEtapaPorNombre,
} from '../../helpers/etapasPozos.helper';

export default function WellAdvancementStatistics({
  etapasPozo,
  nivelTrepano,
}) {
  /**
   * Calcula el porcentaje de profundidad dentro de una etapa.
   * @param {Object} etapa - El objeto de la etapa.
   * @param {number} profundidad - El nivel de profundidad a calcular.
   * @returns {number} El porcentaje de profundidad dentro de la etapa, o 0 si no está dentro del rango.
   */
  const calcularPorcentajeEnEtapa = (etapa, profundidad) => {
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
  const calcularProfundidadEnEtapa = (etapa, profundidad) => {
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
   * @param {number} nivelTrepano - El nivel de profundidad a comparar con las etapas.
   * @param {boolean} [porcentaje=false] - Si se debe calcular el porcentaje en lugar de la profundidad.
   * @returns {Object} Un objeto con los porcentajes o profundidades correspondientes para cada etapa.
   */
  const obtenerEtapasPozo = (nivelTrepano, porcentaje = false) => {
    const guia = obtenerEtapaPorNombre(etapasPozo, 'Guía');
    const intermedia = obtenerEtapaPorCampo({
      property: 'id',
      value: 2,
      etapasPozo,
    });
    const intermedia2 = obtenerEtapaPorCampo({
      property: 'id',
      value: 3,
      etapasPozo,
    });
    const aislacion = obtenerEtapaPorNombre(etapasPozo, 'Aislación');

    if (!porcentaje) {
      return {
        guia1: guia ? calcularProfundidadEnEtapa(guia, nivelTrepano) : 0,
        intermedia2: intermedia
          ? calcularProfundidadEnEtapa(intermedia, nivelTrepano)
          : 0,
        intermedia3: intermedia2
          ? calcularProfundidadEnEtapa(intermedia2, nivelTrepano)
          : 0,
        aislacion4: aislacion
          ? calcularProfundidadEnEtapa(aislacion, nivelTrepano)
          : 0,
      };
    }

    return {
      guia1: guia ? calcularPorcentajeEnEtapa(guia, nivelTrepano) : 0,
      intermedia2: intermedia
        ? calcularPorcentajeEnEtapa(intermedia, nivelTrepano)
        : 0,
      intermedia3: intermedia2
        ? calcularPorcentajeEnEtapa(intermedia2, nivelTrepano)
        : 0,
      aislacion4: aislacion
        ? calcularPorcentajeEnEtapa(aislacion, nivelTrepano)
        : 0,
    };
  };

  return (
    <div className="py-2 flex flex-col lg:flex-row gap-8">
      <div className="flex flex-col flex-1">
        <h2 className="uppercase text-xs font-bold my-4">Avace por tramo</h2>
        {etapasPozo.map((_etapa, index) => {
          const fields =
            etapasPozo?.length > 3
              ? {
                  0: 'guia1',
                  1: 'intermedia2',
                  2: 'intermedia3',
                  3: 'aislacion4',
                }
              : {
                  0: 'guia1',
                  1: 'intermedia2',
                  2: 'aislacion4',
                };

          const field = `${fields[index]}`;
          const meters = obtenerEtapasPozo(nivelTrepano)?.[field] ?? 0;
          const progress = obtenerEtapasPozo(nivelTrepano, true)?.[field] ?? 0;

          return (
            <ProgressBar
              key={index}
              indicatorColor="bg-[#27B433]"
              progressLeft
              className="mb-4"
              progress={progress}
              progressLabel={`${formatCurrency(meters)} mts`}
            />
          );
        })}
      </div>
    </div>
  );
}

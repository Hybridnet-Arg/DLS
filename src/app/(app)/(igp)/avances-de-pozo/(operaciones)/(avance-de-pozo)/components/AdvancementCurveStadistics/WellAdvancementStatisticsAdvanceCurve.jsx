'use client';

import clsx from 'clsx';
import { FASE_GUIA } from '@/constants';
import { obtenerProfundidadReal } from '../../helpers/etapasPozos.helper';

export default function WellAdvancementStatisticsAdvanceCurve({
  etapasPozo = [],
}) {
  const obtenerAnchoPorEtapa = (etapaPozo) => {
    const profundidades = etapasPozo?.map((etapa) => {
      if (etapa?.tipo_etapa_pozo_id === FASE_GUIA) {
        return parseFloat(etapa?.profundidad_hasta);
      }
      return etapa?.profundidad_hasta - etapa?.profundidad_desde;
    });
    const maxEtapa = Math.max(...profundidades);
    const profundidadReal = obtenerProfundidadReal(etapaPozo);

    const width = (profundidadReal / maxEtapa) * 100;
    return width;
  };

  const obtenerFasesDelPozo = () => {
    return (
      <div className="w-full">
        <div className="flex gap-[0.4rem]">
          {etapasPozo?.map((etapaPozo) => {
            const width = obtenerAnchoPorEtapa(etapaPozo);
            return (
              <div style={{ width: `${width}%` }} key={etapaPozo?.id}>
                <p className="text-center text-[10px] font-semibold mb-2 py-1 border-b-[1px] border-black line-clamp-1 text-ellipsis">
                  {obtenerProfundidadReal(etapaPozo)} mts
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex gap-[0.4rem]">
          {etapasPozo?.map((etapaPozo, index) => {
            const width = obtenerAnchoPorEtapa(etapaPozo);
            return (
              <div
                key={etapaPozo?.id}
                className={clsx('py-3', {
                  'rounded-s-full': index === 0,
                  'rounded-e-full': index === etapasPozo.length - 1,
                  'bg-[#85736a]': index === 0,
                  'bg-[#6A5144]': index === 1,
                  'bg-[#6A5145]': index > 1 && index !== etapasPozo.length - 1,
                  'bg-[#28170E]': index > 1 && index === etapasPozo.length - 1,
                })}
                style={{ width: `${width}%` }}
              ></div>
            );
          })}
        </div>
        <div className="flex gap-[0.4rem]">
          {etapasPozo?.map((etapaPozo) => {
            const width = obtenerAnchoPorEtapa(etapaPozo);
            return (
              <div
                className="py-3"
                style={{ width: `${width}%` }}
                key={etapaPozo?.id}
              >
                <p className="text-center text-[10px] font-semibold">
                  Fase {etapaPozo?.tipo_etapa_pozo?.nombre?.toLocaleLowerCase()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-4 mb-2">
      <h2 className="text-xs font-bold mb-2">
        CURVA DE AVANCE: Total{' '}
        {etapasPozo?.[etapasPozo?.length - 1]?.profundidad_hasta ?? 0} mts
      </h2>
      {obtenerFasesDelPozo()}
      <div className="flex justify-between">
        <p className="text-[10px] font-semibold">0 mts</p>
        <p className="text-[10px] font-semibold">
          {etapasPozo?.[etapasPozo?.length - 1]?.profundidad_hasta ?? 0} mts
        </p>
      </div>
    </div>
  );
}

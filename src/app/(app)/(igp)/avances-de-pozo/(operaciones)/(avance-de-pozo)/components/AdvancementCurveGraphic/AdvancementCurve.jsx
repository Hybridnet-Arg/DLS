import { formatCurrency } from '@/utils/formatters/currency.formatter';
import { obtenerEtapaPorCampo } from '../../helpers/etapasPozos.helper';
import WellAdvancementIcon from './WellAdvancementIcon';
import {
  FASE_GUIA,
  FASE_AISLACION,
  FASE_INTERMEDIA,
  FASE_INTERMEDIA_SECUNDARIA,
} from '@/constants';

function ProfundidadPorEtapa({ etapaId, etapasPozo = [] }) {
  return (
    <div className="absolute top-0 left-[65%] transform -translate-x-1/3 -translate-y-full text-center">
      <p className="text-white text-xs">
        {obtenerEtapaPorCampo({
          etapasPozo,
          property: 'id',
          value: etapaId,
          field: 'profundidad_desde',
        })}{' '}
        mts
      </p>
      <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-white mx-auto"></div>
    </div>
  );
}

export default function AdvancementCurve({
  progress,
  progressNivelTrepano,
  holeDepth,
  trepanLevel,
  holeName,
  etapasPozo = [],
}) {
  return (
    <div className="relative w-full h-[500px]">
      <div className="absolute inset-0 flex flex-col bg-[#838994] rounded-md">
        <div className="flex-[1.8] bg-[#8fbfe7] flex items-start justify-end p-3 rounded-t-md">
          <div>
            <h2 className="text-white font-bold text-end">{holeName}</h2>
            <p className="text-white text-sm text-end font-medium">
              <span className="text-md">{formatCurrency(progress)} %</span>{' '}
              avance total
            </p>
          </div>
        </div>
        {etapasPozo?.length === FASE_GUIA && (
          <div className="flex-[3] bg-[#85736a] flex items-center px-2 relative">
            <p className="text-white text-[0.5rem] max-[767px]:text-[0.75rem]">
              Fase <br className="lg:hidden" /> guía
            </p>
            <ProfundidadPorEtapa etapaId={FASE_GUIA} etapasPozo={etapasPozo} />
          </div>
        )}
        {etapasPozo?.length === FASE_INTERMEDIA && (
          <>
            <div className="flex-[0.85] bg-[#85736a] flex items-center px-2 relative">
              <p className="text-white text-[0.5rem] max-[767px]:text-[0.75rem]">
                Fase <br className="lg:hidden" /> guía
              </p>
              <ProfundidadPorEtapa
                etapaId={FASE_GUIA}
                etapasPozo={etapasPozo}
              />
            </div>
            <div className="flex-[2.15] bg-[#6A5144] flex items-center px-2 relative border-t border-dashed border-gray-300">
              <p className="text-white text-[0.5rem] max-[767px]:text-[0.75rem]">
                Fase <br className="lg:hidden" /> intermedia
              </p>
              <ProfundidadPorEtapa
                etapaId={FASE_INTERMEDIA}
                etapasPozo={etapasPozo}
              />
            </div>
          </>
        )}
        {etapasPozo?.length === FASE_INTERMEDIA_SECUNDARIA && (
          <>
            <div className="flex-[0.85] bg-[#85736a] flex items-center px-2 relative">
              <p className="text-white text-[0.5rem] max-[767px]:text-[0.75rem]">
                Fase <br className="lg:hidden" /> guía
              </p>
              <ProfundidadPorEtapa
                etapaId={FASE_GUIA}
                etapasPozo={etapasPozo}
              />
            </div>
            <div className="flex-[1.3] bg-[#6A5144] flex items-center px-2 relative border-t border-dashed border-gray-300">
              <p className="text-white text-[0.5rem] max-[767px]:text-[0.75rem]">
                Fase <br className="lg:hidden" /> intermedia
              </p>
              <ProfundidadPorEtapa
                etapaId={FASE_INTERMEDIA}
                etapasPozo={etapasPozo}
              />
            </div>
            <div className="flex-[0.85] bg-[#28170E] flex items-center px-2 rounded-b-md relative border-t border-dashed border-gray-300">
              <p className="text-white text-[0.5rem] max-[767px]:text-[0.75rem]">
                Fase <br className="lg:hidden" /> aislación
              </p>
              <ProfundidadPorEtapa
                etapaId={FASE_AISLACION}
                etapasPozo={etapasPozo}
              />
            </div>
          </>
        )}
        {etapasPozo?.length === FASE_AISLACION && (
          <>
            <div className="flex-[0.85] bg-[#85736a] flex items-center px-2 relative">
              <p className="text-white text-[0.5rem] max-[767px]:text-[0.75rem]">
                Fase <br className="lg:hidden" /> guía
              </p>
              <ProfundidadPorEtapa
                etapaId={FASE_GUIA}
                etapasPozo={etapasPozo}
              />
            </div>
            <div className="flex-[0.65] bg-[#6A5144] flex items-center px-2 relative border-t border-dashed border-gray-300">
              <p className="text-white text-[0.5rem] max-[767px]:text-[0.75rem]">
                Fase <br className="lg:hidden" /> intermedia 1
              </p>
              <ProfundidadPorEtapa
                etapaId={FASE_INTERMEDIA}
                etapasPozo={etapasPozo}
              />
            </div>
            <div className="flex-[0.65] bg-[#6A5144] flex items-center px-2 relative border-t border-dashed border-gray-300">
              <p className="text-white text-[0.5rem] max-[767px]:text-[0.75rem]">
                Fase <br className="lg:hidden" /> intermedia 2
              </p>
              <ProfundidadPorEtapa
                etapaId={FASE_INTERMEDIA_SECUNDARIA}
                etapasPozo={etapasPozo}
              />
            </div>
            <div className="flex-[0.85] bg-[#28170E] flex items-center px-2 rounded-b-md relative border-t border-dashed border-gray-300">
              <p className="text-white text-[0.5rem] max-[767px]:text-[0.75rem]">
                Fase <br className="lg:hidden" /> aislación
              </p>
              <ProfundidadPorEtapa
                etapaId={FASE_AISLACION}
                etapasPozo={etapasPozo}
              />
            </div>
          </>
        )}
      </div>

      <div className="relative z-10 flex justify-center items-center w-full h-full py-3 px-5">
        <WellAdvancementIcon
          progress={progress}
          progressNivelTrepano={progressNivelTrepano}
          trepanLevel={trepanLevel}
          holeDepth={holeDepth}
          maxDepth={
            etapasPozo?.[etapasPozo?.length - 1]?.profundidad_hasta ?? 0
          }
        />
      </div>
    </div>
  );
}

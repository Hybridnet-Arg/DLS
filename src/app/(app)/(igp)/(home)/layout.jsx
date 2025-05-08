'use client';
import { useEffect, useState } from 'react';
import { usePlantaStore } from '@/store/planta.store';
import usePerforadoresStore from '@/store/perforadores.store';
import { formatToDDMMYYYY } from '@/utils/formatters/date.formatter';
import { CONFIG, DATE_FORMATS } from '@/constants';
import { LOCACIONES_PLANTA_ACTIVOS } from '@/constants/plantaLocacion.constant';
import { Marquee } from '@/components/marquee/Marquee';
import SelectorPerforadores from '@/components/selectorPerforadores';

export default function HomeLayout({ children }) {
  const { activeSection } = usePlantaStore();
  const { perforadorSeleccionado } = usePerforadoresStore();
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);

  useEffect(() => {
    async function fetchLastUpdate() {
      try {
        if (!activeSection) return;
        const lastUpdate = await LOCACIONES_PLANTA_ACTIVOS[
          activeSection
        ]?.getLastUpdate(perforadorSeleccionado);
        setUltimaActualizacion(lastUpdate);
      } catch (error) {
        setUltimaActualizacion(null);
      }
    }
    fetchLastUpdate();
    return () => {
      setUltimaActualizacion(null);
    };
  }, [activeSection, perforadorSeleccionado]);

  return (
    <div className="pt-2 pb-5 mx-5">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-medium">
          DMS | Indicadores de Gestión del Perforador
        </h1>
        <div
          className={`${CONFIG.APP_ENV === 'training' ? 'bg-[linear-gradient(90deg,#9AA1C5_0%,rgba(0,0,0,0.7)_10%,rgba(0,0,0,0.7)_90%,#9AA1C5_100%)]' : 'bg-[linear-gradient(90deg,#F5D92F_0%,rgba(0,0,0,0.7)_10%,rgba(0,0,0,0.7)_90%,#F5D92F_100%)]'}  w-72 flex justify-center items-center`}
        >
          <Marquee
            size="lg"
            text={
              CONFIG.APP_ENV === 'testing'
                ? 'AMBIENTE DE PRUEBA'
                : CONFIG.APP_ENV === 'training' && 'AMBIENTE DE CAPACITACION'
            }
          />
        </div>
        <SelectorPerforadores onlyDrillers showAccess={false} />
      </div>

      <div className="bg-backgroundGray pt-4 rounded-t-md flex items-center justify-between">
        <h2 className="uppercase font-medium text-sm text-ellipsis overflow-hidden whitespace-nowrap ps-20">
          Operaciones
        </h2>
        <div className="min-h-[2rem]">
          {activeSection && (
            <p className="m-0 font-medium text-xs text-ellipsis overflow-hidden whitespace-nowrap px-4">
              Última actualización
              <br />
              <b>{LOCACIONES_PLANTA_ACTIVOS[activeSection]?.label}:</b>{' '}
              {formatToDDMMYYYY(ultimaActualizacion, {
                formatter: DATE_FORMATS.DD_MM_YYYY_HH_MM_SS,
              })}{' '}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

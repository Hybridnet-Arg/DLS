'use client';

import { Loader } from 'lucide-react';
import { Prisma } from '@prisma/client';
import { useEffect, useState } from 'react';
import { CONFIG } from '@/constants';
import { obtenerAvancesDePozo } from '@/services/avancesDePozo.service';
import { Marquee } from '@/components/marquee/Marquee';
import BackButton from '@/components/ui/buttons/BackButton';
import SelectorPerforadores from '@/components/selectorPerforadores';

const TIME_TO_REFRESH = 60000;
export default function HomeLayout({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);

  useEffect(() => {
    const fetchAvancePozo = async () => {
      try {
        const data = await obtenerAvancesDePozo({
          limit: 1,
          sort_field: 'creado_el',
          sort_type: Prisma.SortOrder.desc,
        });
        setUltimaActualizacion(data?.avancesDePozo?.[0]?.creado_el ?? null);
      } catch (error) {
        setUltimaActualizacion(null);
      } finally {
        setIsMounted(true);
      }
    };

    fetchAvancePozo();

    const intervalo = setInterval(fetchAvancePozo, TIME_TO_REFRESH);
    return () => clearInterval(intervalo);
  }, []);

  const formatUTC = (date) => {
    const utcDate = new Date(date);
    const dateTimeConfig = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    };
    const formatter = new Intl.DateTimeFormat('es-AR', dateTimeConfig);

    const formattedTime = formatter.format(utcDate);
    return formattedTime;
  };
  return (
    <div className="pt-4 pb-5 mx-5">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold">Gestión de locación</h1>
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
        <div className="flex gap-4">
          <BackButton href="/" />
          <SelectorPerforadores onlyDrillers showAccess={false} />
        </div>
      </div>

      <div className="bg-backgroundGray pt-4 pb-2 rounded-md flex flex-col">
        <div className="flex justify-end">
          {!isMounted ? (
            <Loader size={20} className="animate-spin text-white mx-4" />
          ) : (
            <p className="m-0 font-medium text-sm text-ellipsis overflow-hidden whitespace-nowrap px-4">
              Última actualización:{' '}
              {!ultimaActualizacion
                ? 'DD/MM/AAAA'
                : formatUTC(ultimaActualizacion)}
            </p>
          )}
        </div>
        <div className="bg-white mx-4 rounded-md my-2 px-14 py-7">
          {children}
        </div>
      </div>
    </div>
  );
}

'use client';
import { Loader } from 'lucide-react';
import { Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Submenu from '@/components/ui/tabs/Submenu';
import { PozoIcon } from '@/components/icons/MenuIcons';
import usePerforadoresStore from '@/store/perforadores.store';
import { getPerforadorByNumero } from '@/services/perforadores.services';
import { obtenerAvancesDePozo } from '@/services/avancesDePozo.service';
import { useRefreshStore } from '@/store/refresh.store';

const TIME_TO_REFRESH = 60000;

export default function OperacionesLayout({ children }) {
  const router = useRouter();
  const { shouldRefresh } = useRefreshStore();
  const { perforadorSeleccionado } = usePerforadoresStore();
  const [perforador, setPerforador] = useState({});
  const [isMounted, setIsMounted] = useState(false);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);

  useEffect(() => {
    const fetchAvancePozo = async () => {
      try {
        const data = await getPerforadorByNumero(
          perforadorSeleccionado?.idPerforador,
          { include_plan_pozo: true }
        );

        if (!data || data?.planes_pozo?.length === 0) {
          throw new Error('No existe un plan de pozo');
        }
        setPerforador(data);
      } catch (error) {
        setPerforador(null);
        router.replace('/avances-de-pozo/plan-pozo');
      }
    };
    fetchAvancePozo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perforadorSeleccionado, shouldRefresh]);

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

  const options = [
    {
      key: 'plan_pozo',
      title: 'Plan pozo',
      disabled: false,
      component: null,
      link: '/avances-de-pozo/plan-pozo',
      icon: <PozoIcon height={35} width={35} />,
    },
    {
      key: 'avance_pozo',
      title: 'Avance de pozo',
      disabled: !perforador?.id,
      component: null,
      link: '/avances-de-pozo',
      icon: <PozoIcon height={35} width={35} />,
    },
    {
      key: 'diagrama_estado',
      title: 'Diagrama de estado',
      disabled: !perforador?.id,
      component: null,
      link: '/avances-de-pozo/diagrama-de-estado',
      icon: <PozoIcon height={35} width={35} />,
    },
    {
      key: 'registro_historico',
      title: 'Registros historicos',
      disabled: true,
      component: null,
      link: '/avances-de-pozo/diagrama-de-estado',
      icon: <PozoIcon height={35} width={35} />,
    },
    {
      key: 'auditoria',
      title: 'Auditoria',
      disabled: true,
      component: null,
      link: '/avances-de-pozo/auditoria',
      icon: <PozoIcon height={35} width={35} />,
    },
  ];

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
    <div>
      <div className="bg-backgroundGray pt-4 rounded-t-md flex items-center justify-between">
        <h2 className="uppercase font-medium text-sm text-ellipsis overflow-hidden whitespace-nowrap ps-20">
          Operaciones
        </h2>
        <div>
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
      </div>
      <Submenu items={options}>{children}</Submenu>
    </div>
  );
}

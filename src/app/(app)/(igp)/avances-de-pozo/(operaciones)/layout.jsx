'use client';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DATE_FORMATS } from '@/constants';
import { useRefreshStore } from '@/store/refresh.store';
import { usePlanPozoStore } from '@/store/planPozo.store';
import usePerforadoresStore from '@/store/perforadores.store';
import { formatToDDMMYYYY } from '@/utils/formatters/date.formatter';
import { getPerforadorByNumero } from '@/services/perforadores.services';
import { obtenerAvancesDePozoPorPerforador } from '@/services/avancesDePozo.service';
import Submenu from '@/components/ui/tabs/Submenu';
import { PozoIcon } from '@/components/icons/MenuIcons';
import LastUpdateLabel from '@/components/ui/labels/LastUpdateLabel';

const TIME_TO_REFRESH = 60000;

export default function OperacionesLayout({ children }) {
  const router = useRouter();

  const { shouldRefresh } = useRefreshStore();
  const { perforadorSeleccionado } = usePerforadoresStore();
  const { ultimaActualizacion, setUltimaActualizacion } = usePlanPozoStore();

  const [perforador, setPerforador] = useState({});
  const [isMounted, setIsMounted] = useState(false);

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
        setIsMounted(false);
        const avanceDePozo = await obtenerAvancesDePozoPorPerforador(
          perforadorSeleccionado?.idPerforador,
          {
            nombre_perforador: perforadorSeleccionado?.nombre,
          }
        );

        setUltimaActualizacion(avanceDePozo);
      } catch (error) {
        setUltimaActualizacion(null);
      } finally {
        setIsMounted(true);
      }
    };

    fetchAvancePozo();

    const intervalo = setInterval(fetchAvancePozo, TIME_TO_REFRESH);
    return () => clearInterval(intervalo);
  }, [perforadorSeleccionado]);

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
            <LastUpdateLabel>
              Última actualización
              {ultimaActualizacion?.pozo?.nombre ? (
                <>
                  <br />
                  <b>en pozo {ultimaActualizacion?.pozo?.nombre}:</b>{' '}
                </>
              ) : (
                ': '
              )}
              {formatToDDMMYYYY(ultimaActualizacion?.creado_el, {
                formatter: DATE_FORMATS.DD_MM_YYYY_HH_MM_SS,
              })}{' '}
            </LastUpdateLabel>
          )}
        </div>
      </div>
      <Submenu items={options}>{children}</Submenu>
    </div>
  );
}

'use client';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useRefreshStore } from '@/store/refresh.store';
import usePerforadoresStore from '@/store/perforadores.store';
import { getAllElementosComponenteByFilters } from '@/services/elementosComponente.service';
import {
  LowerIBOPIcon,
  SaverSupIcon,
  UpperIBOPIcon,
  WashPipeIcon,
} from './CanioLavadorMenuIcons';

const CANIO_LAVADOR_MENU = [
  {
    id: 1,
    name: 'WashPipe',
    icon: (props) => <WashPipeIcon {...props} />,
  },
  {
    id: 2,
    name: 'Upper IBOP',
    icon: (props) => <UpperIBOPIcon {...props} />,
  },
  {
    id: 3,
    name: 'Lower IBOP',
    icon: (props) => <LowerIBOPIcon {...props} />,
  },
  {
    id: 4,
    name: 'Saver Sub',
    icon: (props) => <SaverSupIcon {...props} />,
  },
];

export default function CanioLavadorMenu({ redirectTo = '/top-drive' }) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const { shouldRefresh } = useRefreshStore();
  const { perforadorSeleccionado } = usePerforadoresStore();
  const [elementosComponente, setElementosComponente] = useState([]);
  const [numeroPerforador, setNumeroPerforador] = useState(null);

  useEffect(() => {
    const fetchElementosComponente = async () => {
      try {
        const filters = {
          numero_perforador: perforadorSeleccionado?.idPerforador,
          componente_id: 1,
        };

        const order = ['WashPipe', 'Upper IBOP', 'Lower IBOP', 'Saver Sub'];
        const data = await getAllElementosComponenteByFilters(filters);
        data.sort((a, b) => {
          const indexA = order.indexOf(a.elemento?.nombre);
          const indexB = order.indexOf(b.elemento?.nombre);

          if (indexA === -1 && indexB === -1) return 0;
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;

          return indexA - indexB;
        });

        if (data?.length === 0)
          return router.replace(`${redirectTo}?empty=true`);

        setElementosComponente(data);

        if (
          searchParams?.get('elemento_id') &&
          perforadorSeleccionado?.idPerforador === numeroPerforador
        ) {
          return;
        }
        if (params?.id && searchParams?.get('elemento_id')) {
          router.replace(
            `${redirectTo}/${params?.id}?=elemento_id=${searchParams?.get('elemento_id')}`
          );
        } else if (params?.id && !searchParams?.get('elemento_id')) {
          router.replace(`${redirectTo}/${params?.id}`);
        } else {
          router.replace(`${redirectTo}/${data[0]?.id}`);
        }
      } catch (error) {
        setElementosComponente([]);
      } finally {
        setNumeroPerforador(perforadorSeleccionado?.idPerforador);
      }
    };
    fetchElementosComponente();
    return () => {
      setElementosComponente([]);
    };
  }, [perforadorSeleccionado?.idPerforador, shouldRefresh]);

  return (
    <div className="relative flex justify-center items-center">
      <div className="absolute inset-0 z-0 ml-6">
        <Image
          fill
          style={{ objectFit: 'cover' }}
          src={'/static/images/top-drive/bg-top-drive.png'}
          alt="Fondo"
          unoptimized
        />
      </div>
      <div className="relative z-10 flex flex-wrap flex-col items-center justify-between">
        {/* Elemento 1 */}
        <div
          className={clsx('mb-5 py-4 px-12 mb-3', {
            'rounded-full px-10 bg-gray-400 bg-opacity-70':
              params?.id && parseInt(params?.id) === elementosComponente[0]?.id,
          })}
        >
          <Link
            href={`${redirectTo}${elementosComponente[0]?.id ? `/${elementosComponente?.[0]?.id}?elemento_id=${elementosComponente?.[0]?.elemento_id}` : '?empty=true'}`}
          >
            {CANIO_LAVADOR_MENU[0].icon({
              selected:
                params?.id &&
                parseInt(params?.id) === elementosComponente[0]?.id,
              hours:
                elementosComponente[0]?.elementos_deposito?.[0]?.horas_en_uso,
              maxHours:
                elementosComponente[0]?.elemento?.tipo_elemento?.horas_hasta,
            })}
          </Link>
        </div>

        {/* Elementos 2 y 3 */}
        <div className="flex flex-col">
          <div
            className={clsx('px-9 mb-3', {
              'rounded-full py-4 px-10 bg-gray-400 bg-opacity-70':
                params?.id &&
                parseInt(params?.id) === elementosComponente[1]?.id,
            })}
          >
            <Link
              href={`${redirectTo}${elementosComponente[1]?.id ? `/${elementosComponente?.[1]?.id}?elemento_id=${elementosComponente?.[1]?.elemento_id}` : '?empty=true'}`}
            >
              {CANIO_LAVADOR_MENU[1].icon({
                selected:
                  params?.id &&
                  parseInt(params?.id) === elementosComponente[1]?.id,
                hours:
                  elementosComponente[1]?.elementos_deposito?.[0]?.horas_en_uso,
                maxHours:
                  elementosComponente[1]?.elemento?.tipo_elemento?.horas_hasta,
              })}
            </Link>
          </div>
          <div
            className={clsx('px-9 mb-3', {
              'rounded-full py-3 px-14 bg-gray-400 bg-opacity-70':
                params?.id &&
                parseInt(params?.id) === elementosComponente[2]?.id,
            })}
          >
            <Link
              href={`${redirectTo}${elementosComponente[2]?.id ? `/${elementosComponente?.[2]?.id}?elemento_id=${elementosComponente?.[2]?.elemento_id}` : '?empty=true'}`}
            >
              {CANIO_LAVADOR_MENU[2].icon({
                selected:
                  params?.id &&
                  parseInt(params?.id) === elementosComponente[2]?.id,
                hours:
                  elementosComponente[2]?.elementos_deposito?.[0]?.horas_en_uso,
                maxHours:
                  elementosComponente[2]?.elemento?.tipo_elemento?.horas_hasta,
              })}
            </Link>
          </div>
        </div>

        {/* Elemento 4 */}
        <div
          className={clsx('mt-5 py-4 mb-3', {
            'rounded-full px-6 bg-gray-400 bg-opacity-70':
              params?.id && parseInt(params?.id) === elementosComponente[3]?.id,
          })}
        >
          <Link
            href={`${redirectTo}${elementosComponente[3]?.id ? `/${elementosComponente?.[3]?.id}?elemento_id=${elementosComponente?.[3]?.elemento_id}` : '?empty=true'}`}
          >
            {CANIO_LAVADOR_MENU[3].icon({
              selected:
                params?.id &&
                parseInt(params?.id) === elementosComponente[3]?.id,
              hours:
                elementosComponente[3]?.elementos_deposito?.[0]?.horas_en_uso,
              maxHours:
                elementosComponente[3]?.elemento?.tipo_elemento?.horas_hasta,
            })}
          </Link>
        </div>
      </div>
    </div>
  );
}

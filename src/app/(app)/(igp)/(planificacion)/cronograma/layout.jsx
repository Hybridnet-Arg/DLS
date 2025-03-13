'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import SelectorPerforadores from '@/components/selectorPerforadores';

export default function CronogramaLayout({ children }) {
  const pathname = usePathname();
  const { ubicacion_id } = useParams();
  const seachParams = useSearchParams();

  const mes = seachParams.get('mes');
  const anio = seachParams.get('anio');

  return (
    <div className="mt-2 mx-5 pb-5">
      <div className="flex items-center mb-2 gap-3">
        <Link href={`/cronograma/${ubicacion_id}`}>
          <h1 className={clsx('text-xl font-medium hover:underline')}>
            Cronograma Anual
          </h1>
        </Link>
        <h1 className="text-xl font-medium">{'>'}</h1>
        <Link
          href={
            !pathname.includes('/forecast-manual/') &&
            !pathname.includes('/planificacion-semanal/')
              ? '#'
              : `/cronograma/forecast-manual/ubicacion/${ubicacion_id}?mes=${mes}&anio=${anio}`
          }
        >
          <h1
            className={clsx('text-xl font-medium hover:underline', {
              'opacity-40 cursor-not-allowed':
                !pathname.includes('/forecast-manual/') &&
                !pathname.includes('/planificacion-semanal/'),
            })}
          >
            Forecast Manual
          </h1>
        </Link>
        <h1 className="text-xl font-medium">{'>'}</h1>
        <h1
          className={clsx(
            'text-xl font-medium cursor-not-allowed hover:underline',
            {
              'opacity-40': !pathname.includes('/planificacion-semanal/'),
            }
          )}
        >
          Planificacion Semanal
        </h1>
        {pathname.includes('/planificacion-semanal/') && (
          <div className="ml-auto">
            <SelectorPerforadores onlyDrillers showAll showAccess={false} />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

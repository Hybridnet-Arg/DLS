'use client';
import clsx from 'clsx';
import { Fragment } from 'react';
import {
  CargarDocRefIcon,
  DescarteRefIcon,
  EnOrigenRefIcon,
  InformeRefIcon,
  OperativasRefIcon,
  RemitoRefIcon,
  ReparacionRefIcon,
  TallyRefIcon,
} from './icons/referencias';

const referencias = [
  {
    id: 1,
    label: 'En origen',
  },
  {
    id: 2,
    label: 'Operativas',
  },
  {
    id: 3,
    label: 'Inspeccion/reparación',
  },
  {
    id: 4,
    label: 'Descarte',
  },
  {
    id: 5,
    label: 'Tally',
  },
  {
    id: 6,
    label: 'Remito',
  },
  {
    id: 7,
    label: 'Informe',
  },
  {
    id: 8,
    label: 'Cargar documento',
  },
];

const ICONOS_REFERENCIAS = {
  'En origen': <EnOrigenRefIcon height={25} width={25} />,
  Operativas: <OperativasRefIcon height={25} width={25} />,
  'Inspeccion/reparación': <ReparacionRefIcon height={25} width={25} />,
  Descarte: <DescarteRefIcon height={25} width={25} />,
  Tally: <TallyRefIcon height={25} width={25} />,
  Remito: <RemitoRefIcon height={25} width={25} />,
  Informe: <InformeRefIcon height={25} width={25} />,
  'Cargar documento': <CargarDocRefIcon height={25} width={25} />,
};

export default function ReferenciaTrazabilidad({ tubular }) {
  return (
    <Fragment>
      <div id="locaciones">
        <p className="text-sm text-end">Nombre locación:</p>
        <div
          className={clsx(
            'text-center p-[0.35rem] rounded text-sm tracking-[0.2rem]',
            {
              'bg-dark text-warning':
                tubular?.perforador_locacion?.locacion?.nombre,
              'bg-gray-300 text-dark':
                !tubular?.perforador_locacion?.locacion?.nombre,
            }
          )}
        >
          {tubular?.perforador_locacion?.locacion?.nombre ?? 'N/A'}
        </div>
      </div>
      {tubular?.cantidad_inicial && (
        <Fragment>
          <div id="referencias">
            <h2 className="uppercase font-semibold text-sm mb-1">
              {' '}
              Referencias
            </h2>
            <div className="space-y-1">
              {referencias.map((referencia) => (
                <div key={referencia.id} className="flex gap-1">
                  {ICONOS_REFERENCIAS?.[referencia?.label]}
                  <p className="uppercase text-xs pt-1 font-medium">
                    {referencia.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-500 p-2 rounded-lg text-white text-center">
            <h2 className="uppercase font-semibold text-sm">
              {' '}
              Partida inicial
            </h2>
            <div className="flex flex-1 justify-center items-center gap-2 py-1">
              <h3 className="uppercase font-bold text-xl">
                {tubular?.cantidad_inicial
                  ? (tubular?.cantidad_inicial +
                      tubular?.tubulares_movimientos_prestamos?.reduce(
                        (acc, prestamo) => (acc += prestamo?.cantidad ?? 0),
                        0
                      ) ?? 0)
                  : 'N/A'}
              </h3>
              <TallyRefIcon height={25} width={25} />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

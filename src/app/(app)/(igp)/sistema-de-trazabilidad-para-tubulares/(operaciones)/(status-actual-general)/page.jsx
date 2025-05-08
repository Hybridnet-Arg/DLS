'use client';
import clsx from 'clsx';
import { Home } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DESTINOS_TUBULARES } from '@/constants';
import { obtenerTubularesMovimientos } from '@/services/tubularesMovimientos.service';
import Title from '@/components/ui/labels/Title';
import TallerIcon from '../trazabilidad-de-tubulares/_components/icons/TallerIcon';
import LocacionTubularIcon from '../trazabilidad-de-tubulares/_components/icons/LocacionTubularIcon';
import usePerforadoresStore from '@/store/perforadores.store';

const DESTINOS_HABILITADOS = [
  DESTINOS_TUBULARES.LOCACION,
  DESTINOS_TUBULARES.TALLER,
  DESTINOS_TUBULARES.BASE,
];

const MOVIMIENTOS_DESTINO_DEFAULT = Array(DESTINOS_HABILITADOS?.length).fill(
  {}
);

export default function StatuActualGeneralPage() {
  const { perforadorSeleccionado } = usePerforadoresStore();
  const [total, setTotal] = useState(0);
  const [movimientosPorDestino, setMovimientosPorDestino] = useState(
    MOVIMIENTOS_DESTINO_DEFAULT
  );

  useEffect(() => {
    const fetchMovimientosPorDestino = async () => {
      try {
        const params = {
          group_by_tubulares_destino_id: true,
          tubulares_destino_ids: DESTINOS_HABILITADOS,
        };
        if (perforadorSeleccionado?.idPerforador) {
          params.perforador_numero = perforadorSeleccionado?.idPerforador;
          params.perforador_nombre = perforadorSeleccionado?.nombre;
        }
        const response = await obtenerTubularesMovimientos(params);

        const data =
          response && response?.length > 0
            ? response
            : MOVIMIENTOS_DESTINO_DEFAULT;

        const filledData = DESTINOS_HABILITADOS.map((destino) => {
          return (
            data.find(
              (movimiento) => movimiento.tubulares_destino_id === destino
            ) || {}
          );
        });

        const total =
          data?.reduce(
            (acc, movimiento) => (acc += movimiento?.total ?? 0),
            0
          ) ?? 0;

        setMovimientosPorDestino(filledData);
        setTotal(total);
      } catch (error) {
        setMovimientosPorDestino(MOVIMIENTOS_DESTINO_DEFAULT);
      }
    };
    fetchMovimientosPorDestino();
  }, [perforadorSeleccionado?.idPerforador, perforadorSeleccionado?.nombre]);

  return (
    <div className="flex flex-col px-5 py-2 min-h-[440px] 2xl:min-h-[500px] gap-5">
      <Title>Status actual de tubulares</Title>
      <div class="flex gap-4 px-10 mt-20">
        <div className="flex-1 text-end uppercase text-sm align-middle">
          Ubicación
        </div>
        <div className="flex-1 bg-gray-400 uppercase text-sm font-semibold text-center rounded shadow py-2">
          Locacion
          <div className="flex justify-center mt-1">
            <LocacionTubularIcon height={40} width={40} />
          </div>
        </div>
        <div className="flex-1 bg-gray-400 uppercase text-sm font-semibold text-center rounded shadow py-2">
          Talleres
          <div className="flex justify-center mt-1">
            <TallerIcon height={40} width={40} />
          </div>
        </div>
        <div className="flex-1 bg-gray-400 uppercase text-sm font-semibold text-center rounded shadow py-2">
          Base
          <div className="flex justify-center mt-1">
            <Home height={40} width={40} />
          </div>
        </div>
      </div>
      <div class="flex gap-4 px-10">
        <div className="flex-1 text-end uppercase text-sm align-middle">
          Cantidad
        </div>
        {movimientosPorDestino?.map((movimiento) => (
          <div
            key={movimiento?.tubulares_destino_id}
            className={clsx(
              'flex-1 text-lg font-semibold text-center rounded py-2 shadow',
              {
                'bg-success text-white': movimiento?.total,
                'bg-gray-200 cursor-not-allowed': !movimiento?.total,
              }
            )}
          >
            {movimiento?.total ?? 0}
          </div>
        ))}
      </div>

      <div class="flex gap-4 px-10">
        <div className="flex-1 text-end uppercase text-sm align-middle">
          Total tubulares <br /> disponibles
        </div>
        <div
          className={clsx(
            'flex-[3.14] text-lg font-semibold text-center rounded py-2',
            {
              'bg-success text-white': total,
              'bg-gray-200 cursor-not-allowed': !total,
            }
          )}
        >
          {total}
        </div>
      </div>
    </div>
  );
}

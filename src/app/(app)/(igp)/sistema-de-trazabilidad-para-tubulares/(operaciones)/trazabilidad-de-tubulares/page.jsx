'use client';
import Link from 'next/link';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import usePerforadoresStore from '@/store/perforadores.store';
import { obtenerPlanPozoPorPerforador } from '@/services/planesPozo.services';
import { obtenerTubularePorPerforador } from '@/services/tubularesMovimientos.service';
import Title from '@/components/ui/labels/Title';
import Button from '@/components/ui/buttons/Button';
import MapaTubulares from './_components/MapaTubulares';
import ReferenciaTrazabilidad from './_components/ReferenciaTrazabilidad';

/**
 * Reemplaza elementos en el array mov con elementos del array tubularesMovimientosRaw
 * que tengan el mismo tubulares_destino_id
 * @param {Array} movArray - El array que se desea actualizar (mov)
 * @param {Array} tubularesRawArray - El array con los datos para reemplazar (tubularesMovimientosRaw)
 * @returns {Array} - El array actualizado
 */
function reemplazarPorDestinoId(movArray, tubularesRawArray) {
  const tubularesMapByDestinoId = new Map();

  tubularesRawArray.forEach((item) => {
    if (item.tubulares_destino_id) {
      if (tubularesMapByDestinoId.has(item.tubulares_destino_id)) {
        tubularesMapByDestinoId.get(item.tubulares_destino_id).push(item);
      } else {
        tubularesMapByDestinoId.set(item.tubulares_destino_id, [item]);
      }
    }
  });

  const resultado = movArray.map((movItem) => {
    const destinoId = movItem.tubulares_destino_id;

    if (tubularesMapByDestinoId.has(destinoId)) {
      const matchingItems = tubularesMapByDestinoId.get(destinoId);

      if (matchingItems && matchingItems.length > 0) {
        const replacement = matchingItems.shift();
        if (matchingItems.length === 0) {
          tubularesMapByDestinoId.delete(destinoId);
        }
        return replacement;
      }
    }

    return movItem;
  });

  return resultado;
}

export default function TrazabilidadDeTubularesPage() {
  const { perforadorSeleccionado } = usePerforadoresStore();

  const [tubular, setTubular] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [planPozo, setPlanPozo] = useState({});

  async function fetchTubular() {
    setIsLoading(true);
    try {
      const { idPerforador, nombre } = perforadorSeleccionado;
      const planPozo = await obtenerPlanPozoPorPerforador(idPerforador, {
        nombre_perforador: nombre,
      });

      const data = await obtenerTubularePorPerforador(idPerforador, {
        nombre,
      });
      const tubularesMovimientosRaw = data?.tubulares_movimientos ?? [];

      const movimientos = Array.from({ length: 24 }, (_, index) => {
        const tubulares_destino_id = (index % 6) + 1;
        return { id: Math.random(), tubulares_destino_id };
      });

      const tubularesMovimientos = reemplazarPorDestinoId(
        movimientos,
        tubularesMovimientosRaw
      );

      setPlanPozo(planPozo);
      setTubular({
        ...data,
        tubulares_movimientos: tubularesMovimientos,
      });
    } catch (error) {
      setTubular({});
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTubular();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perforadorSeleccionado?.idPerforador]);

  return isLoading ? (
    <div className="flex min-h-[440px] 2xl:min-h-[500px] flex-1 justify-center items-center">
      <Loader size={40} className="animate-spin" />
    </div>
  ) : !planPozo?.id && !tubular?.id ? (
    <div className="flex flex-col flex-1 min-h-[440px] 2xl:min-h-[500px] justify-center items-center text-center">
      <p className="text-lg font-medium text-gray-700">
        No hay plan de pozo asociado a este perforador
      </p>
      <Link href="/avances-de-pozo/plan-pozo">
        <Button className="mt-4">Iniciar plan de pozo</Button>
      </Link>
    </div>
  ) : (
    <div className="flex flex-col justify-between px-5 py-2 min-h-[440px] 2xl:min-h-[500px] gap-5">
      <Title>Mapa de tubulares</Title>
      <div className="flex flex-1 gap-4">
        <div className="flex flex-col flex-[0.83]">
          <MapaTubulares
            planPozo={planPozo}
            perforadorLocaciones={
              planPozo?.perforador_locacion?.id
                ? [planPozo?.perforador_locacion]
                : []
            }
            tubular={tubular}
            onRefresh={fetchTubular}
          />
        </div>
        <div className="flex flex-[0.17] flex-col justify-between">
          <ReferenciaTrazabilidad tubular={tubular} />
        </div>
      </div>
    </div>
  );
}

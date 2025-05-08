'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import usePerforadoresStore from '@/store/perforadores.store';
import { COMPONENTES } from '@/constants/componentes.constant';
import { formatCurrency } from '@/utils/formatters/currency.formatter';
import { calcularPorcentaje } from '@/utils/formatters/percentage.formatter';
import { ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA } from '@/constants/elementos.contant';
import { getAllElementosDepositoByFilters } from '@/services/elementosDeposito.service';
import Medidor from '@/components/medidor';
import Title from '@/components/ui/labels/Title';
import Button from '@/components/ui/buttons/Button';
import { Skeleton } from '@/components/ui/shadcn/skeleton';
import TipoCable from './_components/TipoCable';
import MapaCortes from './_components/MapaCortes/MapaCortes';
import { obtenerDesgasteCablePorPerforador } from '@/services/desgastesCable.service';

export default function CiclosCableToneladaMillaPage() {
  const { perforadorSeleccionado } = usePerforadoresStore();
  const [isLoading, setIsLoading] = useState(true);
  const [bobina, setBobina] = useState({});
  const [cableDesgastado, setCableDesgastado] = useState({});
  const [almacen, setAlmacen] = useState([]);

  useEffect(() => {
    async function fetchBobina() {
      try {
        const queryParams = {
          en_uso: true,
          baja: false,
          elemento_id: ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA.BOBINA,
          componente_id: COMPONENTES.CICLOS_CABLE_TONELADA_MILLA,
          numero_perforador: perforadorSeleccionado?.idPerforador,
        };

        const piezas = await getAllElementosDepositoByFilters(queryParams);
        const almacenRaw = await getAllElementosDepositoByFilters({
          ...queryParams,
          en_uso: false,
          almacen_ciclos_cable: true,
        });

        const desgasteCable = await obtenerDesgasteCablePorPerforador(
          perforadorSeleccionado?.idPerforador,
          {
            nombre_perforador: perforadorSeleccionado?.nombre,
          }
        );
        const bobina = piezas?.length > 0 ? piezas?.[0] : {};

        setAlmacen(almacenRaw);
        setBobina(bobina);
        setCableDesgastado({
          tm: desgasteCable?.total_desgaste_cable,
          actualizado_el: desgasteCable?.desgastes_cable?.[0]?.creado_el,
        });
      } catch (error) {
        setBobina({});
      } finally {
        setIsLoading(false);
      }
    }
    fetchBobina();
    return () => {
      setBobina({});
      setIsLoading(true);
    };
  }, [perforadorSeleccionado]);

  if (isLoading) {
    return (
      <div className={'p-5'}>
        <Skeleton className={'min-h-[440px] 2xl:min-h-[500px]'} />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between px-5 py-2 min-h-[440px] 2xl:min-h-[500px] gap-5">
      <Title>Estado actual del cable</Title>
      <TipoCable
        corte={bobina?.diametro?.corte ?? 0}
        largoCorte={bobina?.diametro?.largo_corte ?? 0}
        pulgadas={bobina?.diametro?.pulgadas ?? 0}
      />
      <div className="grid grid-cols-8 gap-3 items-center mb-5">
        <h2 className="font-medium col-span-1">
          Toneladas/millas <br /> del tramo actual
        </h2>
        <div className="col-span-6 me-[4.5rem]">
          <Medidor
            disabled={!bobina?.id}
            value={`${formatCurrency(cableDesgastado?.tm ?? 0)} ton.mill`}
            progress={calcularPorcentaje(
              cableDesgastado?.tm ?? 0,
              bobina?.diametro?.corte ?? 0
            )}
            minValue={`${formatCurrency(0)} ton.mill`}
            maxValue={`${formatCurrency(bobina?.diametro?.corte ?? 0)} ton.mill`}
          />
        </div>
        <div className="bg-red-100 col-span-1"></div>
      </div>
      <MapaCortes bobina={bobina} cableDesgastado={cableDesgastado} />
      <div className="flex justify-end gap-3 mt-4">
        <Link href={'/ciclos-cable-tonelada-milla/cortar-cable'}>
          <Button disabled={!bobina?.id}>cortar cable</Button>
        </Link>
        <Link
          href={
            almacen?.length === 0
              ? '/ciclos-cable-tonelada-milla/almacen'
              : '/ciclos-cable-tonelada-milla/almacen?cambiarBobina=true'
          }
        >
          <Button>{bobina?.id ? 'cambiar bobina' : 'cargar bobina'}</Button>
        </Link>
      </div>
    </div>
  );
}

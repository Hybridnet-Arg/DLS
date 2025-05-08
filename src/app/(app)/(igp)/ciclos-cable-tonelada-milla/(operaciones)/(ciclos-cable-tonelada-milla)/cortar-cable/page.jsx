'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Title from '@/components/ui/labels/Title';
import TipoCable from '../_components/TipoCable';
import GraficoCorte from './_components/GraficoCorte';
import { getAllElementosDepositoByFilters } from '@/services/elementosDeposito.service';
import usePerforadoresStore from '@/store/perforadores.store';
import { COMPONENTES } from '@/constants/componentes.constant';
import { ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA } from '@/constants/elementos.contant';
import CortarCableForm from './_components/CortarCableForm';
import { calcularPorcentaje } from '@/utils/formatters/percentage.formatter';
import { Skeleton } from '@/components/ui/shadcn/skeleton';
import { obtenerDesgasteCablePorPerforador } from '@/services/desgastesCable.service';

export default function CortarCable() {
  const router = useRouter();
  const { perforadorSeleccionado } = usePerforadoresStore();
  const [isLoading, setIsLoading] = useState(true);
  const [bobina, setBobina] = useState({});
  const [cableDesgastado, setCableDesgastado] = useState({});

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
        const piezas = await getAllElementosDepositoByFilters(queryParams, {});
        const desgasteCable = await obtenerDesgasteCablePorPerforador(
          perforadorSeleccionado?.idPerforador,
          {
            nombre_perforador: perforadorSeleccionado?.nombre,
          }
        );

        const bobina = piezas?.length > 0 ? piezas?.[0] : {};
        if (!bobina?.id) return router.push('/ciclos-cable-tonelada-milla/');

        setBobina(bobina);
        setCableDesgastado({
          tm: desgasteCable?.total_desgaste_cable || 0,
          actualizado_el: desgasteCable?.desgastes_cable?.[0]?.creado_el,
        });
      } catch (error) {
        setBobina({});
        setCableDesgastado({});
      } finally {
        setIsLoading(false);
      }
    }

    fetchBobina();
    return () => {
      setBobina({});
      setCableDesgastado({});
      setIsLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perforadorSeleccionado]);

  if (isLoading) {
    return (
      <div className={'p-5'}>
        <Skeleton className={'min-h-[440px] 2xl:min-h-[500px]'} />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between px-5 py-2 min-h-[440px] 2xl:min-h-[500px] space-y-10">
      <Title>Cortar Cable</Title>
      <TipoCable
        corte={bobina?.diametro?.corte}
        largoCorte={bobina?.diametro?.largo_corte}
        pulgadas={bobina?.diametro?.pulgadas}
      />
      <GraficoCorte
        tm={bobina?.diametro?.corte}
        progress={calcularPorcentaje(
          cableDesgastado?.tm,
          bobina?.diametro?.corte
        )}
        progressValue={cableDesgastado?.tm}
      />
      <CortarCableForm bobina={bobina} />
    </div>
  );
}

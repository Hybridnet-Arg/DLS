'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Table from '@/components/table/Table';
import Title from '@/components/ui/labels/Title';
import Button from '@/components/ui/buttons/Button';
import { SkeletonContainer } from '@/components/ui/shadcn/skeleton';
import { getAllElementosDepositoByFilters } from '@/services/elementosDeposito.service';
import { ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA } from '@/constants/elementos.contant';
import { COMPONENTES } from '@/constants/componentes.constant';
import usePerforadoresStore from '@/store/perforadores.store';

const columns = [
  {
    key: 'marca',
    title: 'Marca'.toLocaleUpperCase(),
    render: (row) => row?.marca?.nombre,
  },
  {
    key: 'diametro',
    title: 'Diametro'.toLocaleUpperCase(),
    render: (row) => row?.diametro?.pulgadas,
  },
  {
    key: 'mts',
    title: 'mts'.toLocaleUpperCase(),
    render: (row) => row?.diametro?.largo_corte,
  },
  {
    key: 'stock',
    title: 'Stock'.toLocaleUpperCase(),
    render: (row) => row?.stock,
  },
];

export default function AlmacenCiclosCable() {
  const searchParams = useSearchParams();
  const cambiarBobina = searchParams.get('cambiarBobina');

  const router = useRouter();
  const { perforadorSeleccionado } = usePerforadoresStore();
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      setIsLoading(true);
      try {
        const piezas = await getAllElementosDepositoByFilters({
          en_uso: false,
          baja: false,
          elemento_id: ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA.BOBINA,
          componente_id: COMPONENTES.CICLOS_CABLE_TONELADA_MILLA,
          numero_perforador: perforadorSeleccionado?.idPerforador,
          almacen_ciclos_cable: true,
        });

        setRecords(piezas);
      } catch (error) {
        setRecords([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecords();
    return () => {
      setRecords([]);
    };
  }, [perforadorSeleccionado?.idPerforador]);

  const handleRowClick = (row) => {
    const path = `/ciclos-cable-tonelada-milla/almacen/stock?diametro_id=${row?.diametro_id}&marca_id=${row?.marca_id}`;
    router.push(cambiarBobina ? path + '&cambiarBobina=true' : path);
  };

  if (isLoading) return <SkeletonContainer />;
  return (
    <div className="flex flex-col justify-between px-5 py-2 min-h-[440px] 2xl:min-h-[500px]">
      <div>
        <Title>Almacén de bobinas</Title>
        <Table
          title={
            !cambiarBobina ? 'Stock de piezas general' : 'Seleccione la pieza'
          }
          columns={columns}
          data={records}
          handleRowClick={handleRowClick}
        />
      </div>
      {!cambiarBobina && (
        <div className="flex justify-end gap-3 mt-4">
          <Button
            onClick={() =>
              router.push('/ciclos-cable-tonelada-milla/almacen/stock/carga')
            }
          >
            cargar bobina
          </Button>
        </div>
      )}
    </div>
  );
}

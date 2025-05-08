'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Table from '@/components/table/Table';
import Title from '@/components/ui/labels/Title';
import Button from '@/components/ui/buttons/Button';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import { SkeletonContainer } from '@/components/ui/shadcn/skeleton';
import {
  eliminarElementoDeposito,
  getAllElementosDepositoByFilters,
} from '@/services/elementosDeposito.service';
import BobinaConfirmModal from '../_components/BobinaConfirmModal';
import { ChevronLeft } from 'lucide-react';
import { COMPONENTES } from '@/constants/componentes.constant';
import { ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA } from '@/constants/elementos.contant';
import usePerforadoresStore from '@/store/perforadores.store';

const columns = [
  { key: 'id', title: 'ID Pieza'.toLocaleUpperCase() },
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
  { key: 'serie', title: 'Numero de serie'.toLocaleUpperCase() },
];

export default function StockCiclosCable() {
  const searchParams = useSearchParams();
  const cambiarBobina = searchParams.get('cambiarBobina');

  const router = useRouter();
  const { perforadorSeleccionado } = usePerforadoresStore();
  const [records, setRecords] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [isLoadingDeleted, setIsLoadingDeleted] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const piezas = await getAllElementosDepositoByFilters({
        en_uso: false,
        baja: false,
        elemento_id: ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA.BOBINA,
        componente_id: COMPONENTES.CICLOS_CABLE_TONELADA_MILLA,
        numero_perforador: perforadorSeleccionado?.idPerforador,
        marca_id: searchParams.get('marca_id'),
        diametro_id: searchParams.get('diametro_id'),
      });

      setRecords(piezas);
    } catch (error) {
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    return () => {
      setRecords([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perforadorSeleccionado]);

  const handleRowClick = (row) => setSelectedRow(row);

  const handleRemoveBobina = async () => {
    setIsLoadingDeleted(true);
    try {
      await eliminarElementoDeposito(selectedRow?.id);
      await fetchRecords();
      setShowModalSuccess(true);
    } catch (error) {
      setShowModalError(true);
    } finally {
      setIsLoadingDeleted(false);
      setShowModalConfirm(false);
    }
  };

  if (isLoading) return <SkeletonContainer />;
  return (
    <div className="flex flex-col justify-between px-5 py-2 min-h-[440px] 2xl:min-h-[500px]">
      <div>
        <div className="flex justify-between items-center">
          <Title>Almacén agrupado de bobinas</Title>
          <button
            type="button"
            className="flex gap-1 m-0 p-0 text-sm font-semibold"
            onClick={() => router.back()}
          >
            <ChevronLeft size={20} />
            volver a stock general
          </button>
        </div>
        <Table
          title="Stock de piezas por marca / Diámetro"
          columns={columns}
          data={records}
          handleRowClick={handleRowClick}
          selectedRow={selectedRow}
        />
      </div>
      {cambiarBobina ? (
        <div className="flex justify-end gap-3 mt-4">
          <Button
            disabled={!selectedRow}
            onClick={() =>
              router.push(
                `/ciclos-cable-tonelada-milla/almacen/stock/cambiar/${selectedRow?.id}`
              )
            }
          >
            cambiar bobina
          </Button>
        </div>
      ) : (
        <div className="flex justify-end gap-3 mt-4">
          <Button
            disabled={!selectedRow}
            onClick={() => setShowModalConfirm(true)}
          >
            eliminar bobina
          </Button>
          <Button
            disabled={!selectedRow}
            onClick={() =>
              router.push(
                `/ciclos-cable-tonelada-milla/almacen/stock/editar/${selectedRow?.id}`
              )
            }
          >
            modificar bobina
          </Button>
          <Button
            onClick={() =>
              router.push('/ciclos-cable-tonelada-milla/almacen/stock/carga')
            }
          >
            cargar bobina
          </Button>
        </div>
      )}
      <BobinaConfirmModal
        isOpen={showModalConfirm}
        onOk={() => handleRemoveBobina()}
        onCancel={() => setShowModalConfirm(false)}
        loading={isLoadingDeleted}
        elementoDeposito={selectedRow}
        label="se eliminará del stock"
      />
      <ModalDialog
        title={'Se ha eliminado la bobina con exito.'}
        isOpen={showModalSuccess}
        onCancel={() => setShowModalSuccess(false)}
        status={'success'}
        autoclose
      />
      <ModalDialog
        title={'No se ha podido eliminar la bobina.'}
        isOpen={showModalError}
        onCancel={() => setShowModalError(false)}
        status={'error'}
        autoclose
      />
    </div>
  );
}

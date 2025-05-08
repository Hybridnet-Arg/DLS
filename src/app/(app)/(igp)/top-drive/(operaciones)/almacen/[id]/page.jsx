'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { isSaverSub } from '../../helpers/elementType.helper';
import { eliminarElementoDeposito } from '@/services/elementosDeposito.service';
import { getElementosComponenteById } from '@/services/elementosComponente.service';
import CanioLavadorSkeleton from '../../components/CanioLavadorSkeleton';
import CanioLavadorTablaPiezas from '../../components/CanioLavadorTablaPiezas';
import ModalDialog from '@/components/ui/modal/ModalDialog';

export default function TopDriveAlmacenId({ params }) {
  
  const router = useRouter();
  const { id } = use(params);
  const [isMounted, setisMounted] = useState(false);
  const [elementoComponente, setElementoComponente] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [isLoadingOnFinish, setIsLoadingOnFinish] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const fetchElementos = async () => {
    try {
      const data = await getElementosComponenteById(id, {
        include_elementos_deposito: true,
      });

      setElementoComponente(data);
    } catch (error) {
      setElementoComponente({});
    } finally {
      setisMounted(true);
    }
  };

  useEffect(() => {
    fetchElementos();
    return () => {
      setElementoComponente({});
      setisMounted(false);
      setSelectedItem({});
    };
  }, []);

  const handleDeleteElementoDesoposito = async (id) => {
    setIsLoadingOnFinish(true);
    try {
      await eliminarElementoDeposito(id);
      await fetchElementos();
      setShowModalSuccess(true);
    } catch (error) {
      setShowModalError(true);
    } finally {
      setIsLoadingOnFinish(false);
      setShowDeletedModal(false);
    }
  };

  return !isMounted ? (
    <CanioLavadorSkeleton />
  ) : (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col justify-between">
        <CanioLavadorTablaPiezas
          isEditable
          data={elementoComponente?.elementos_deposito ?? []}
          handleDelete={(item) => {
            setSelectedItem(item);
            setShowDeletedModal(true);
          }}
          handleEdit={(item) =>
            router.push(`/top-drive/almacen/${id}/pieza/${item?.id}`)
          }
          typeOfPiece={elementoComponente?.elemento?.tipo_elemento?.nombre}
          isSaverSub={isSaverSub(elementoComponente?.elemento_id)}
        />
        <div className="flex justify-end mt-auto">
          <Link
            href={`/top-drive/almacen/${id}/pieza`}
            className="bg-dark hover:bg-dark hover:opacity-90 text-white text-sm font-bold py-2 px-4 rounded-lg"
          >
            cargar pieza
          </Link>
        </div>
      </div>
      <ModalDialog
        isOpen={showDeletedModal}
        onCancel={() => setShowDeletedModal(false)}
        title={'Esta seguro de eliminar esta pieza?'}
        onOk={() => handleDeleteElementoDesoposito(selectedItem?.id)}
        loading={isLoadingOnFinish}
      />
      <ModalDialog
        title={'Se ha eliminado la pieza con exito!.'}
        isOpen={showModalSuccess}
        onOkLabel="Ok"
        onCancelLabel="Cerrar"
        onOk={() => setShowModalSuccess(false)}
        onCancel={() => setShowModalSuccess(false)}
        status={'success'}
      />
      <ModalDialog
        title={'Ha habido un error al eliminar la pieza.'}
        isOpen={showModalError}
        onOkLabel="Ok"
        onCancelLabel="Cerrar"
        onOk={() => setShowModalError(false)}
        onCancel={() => setShowModalError(false)}
        status={'error'}
      />
    </div>
  );
}

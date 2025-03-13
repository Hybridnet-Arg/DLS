'use client';
import { useState } from 'react';
import { eliminarPerforadorPiezaPorId } from '@/services/schb/perforadorPieza.service';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import PiezaImage from '../../../../_components/PiezaImage';

export default function EliminarPiezaModal({
  showModal,
  setShowModal = () => {},
  onFinish = async () => {},
  pieza,
}) {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const handleOnOk = async () => {
    try {
      setIsLoadingSubmit(true);
      await eliminarPerforadorPiezaPorId(pieza?.idPerforadorPieza);
      alert('Pieza eliminada con exito');
      await onFinish();
    } catch (error) {
      alert('Error al eliminar la pieza');
    } finally {
      setShowModal(false);
      setIsLoadingSubmit(false);
    }
  };

  return (
    <ModalDialog
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      okLabel={'Eliminar pieza'}
      onOk={() => handleOnOk()}
      onCancel={() => setShowModal(false)}
      cancel
      isLoadingOk={isLoadingSubmit}
    >
      <h2 className="text-center font-medium text-base">
        La pieza {pieza?.pieza?.tipo}
      </h2>
      <div className="flex justify-between gap-2 border rounded-xl p-4 my-6 shadow-md">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-light">{pieza?.marca?.marca}</p>
          <p className="text-sm font-light">{pieza?.modelo?.modelo}</p>
          <p className="text-sm font-light">{pieza?.diametro?.diametro}</p>
          <p className="text-sm font-light">{pieza?.serie}</p>
        </div>
        <PiezaImage
          pieza={pieza?.pieza}
          width={100}
          height={50}
          iconProps={{ size: 60 }}
        />
      </div>
      <p className="text-center font-medium">se eliminará del stock</p>
    </ModalDialog>
  );
}

'use client';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  cargarElementoDeposito,
  recambioElementoDeposito,
} from '@/services/elementosDeposito.service';
import Button from '@/components/ui/buttons/Button';
import CanioLavadorImage from '../../../../../components/CanioLavadorImage';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import Title from '@/components/ui/labels/Title';
import { isSaverSub } from '../../../../../helpers/elementType.helper';
import { useRefreshStore } from '@/store/refresh.store';

export default function CanioLavadorCambiarPieza({
  id,
  redirectTo = '',
  elementoDeposito,
  goBack = () => {},
}) {
  const router = useRouter();
  const { triggerRefresh } = useRefreshStore();
  const [showModalError, setShowModalError] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [isLoadingOnFinish, setIsLoadingOnFinish] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleOnFinish = async () => {
    setIsLoadingOnFinish(true);
    try {
      if (!isNaN(id)) await recambioElementoDeposito(id, elementoDeposito?.id);
      else await cargarElementoDeposito(elementoDeposito?.id);
      setShowModalSuccess(true);
    } catch (error) {
      setShowModalError(true);
    } finally {
      setIsLoadingOnFinish(false);
      setShowModal(false);
    }
  };

  const handleRedirect = () => {
    router.push(redirectTo);
    router.refresh();
    triggerRefresh();
  };

  return (
    <div className="flex justify-between flex-col w-full">
      <Title>
        {elementoDeposito?.elemento_componente?.elemento?.nombre === 'WashPipe'
          ? 'Caño lavador'
          : (elementoDeposito?.elemento_componente?.elemento?.nombre ??
            '-')}{' '}
        / {!isNaN(id) ? 'Cambiar pieza' : 'Cargar pieza'}
      </Title>
      <div className="flex py-5 gap-5">
        <div className="flex-1 rounded flex justify-end">
          <CanioLavadorImage
            height={150}
            width={150}
            elementos_deposito={elementoDeposito}
            elemento={elementoDeposito?.elemento_componente?.elemento}
          />
        </div>
        <div className="flex-1 flex-col flex justify-center">
          <p className="text-sm mb-2 font-light">
            {
              elementoDeposito?.elemento_componente?.elemento?.tipo_elemento
                ?.nombre
            }
          </p>
          <p className="text-sm mb-2 font-light">
            {elementoDeposito?.modelo?.marca?.nombre ?? 'Sin marca'}
          </p>
          <p className="text-sm mb-2 font-light">
            {elementoDeposito?.modelo?.nombre ?? 'Sin modelo'}
          </p>
          {isSaverSub(elementoDeposito?.elemento_componente?.elemento_id) && (
            <p className="text-sm mb-2 font-light">
              {elementoDeposito?.tipo_rosca?.nombre}
            </p>
          )}
          <p className="text-sm mb-2 font-light">{elementoDeposito?.serie}</p>
          <p className="text-sm mb-2 font-light">
            {elementoDeposito?.condicion}
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button onClick={goBack} icon={<ChevronLeft size={20} />}>
          volver
        </Button>
        <Button onClick={() => setShowModal(true)}>
          {!isNaN(id) ? 'cambiar pieza' : 'cargar pieza'}
        </Button>
      </div>
      <ModalDialog
        loading={isLoadingOnFinish}
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleOnFinish}
      >
        <p className="text-base font-medium text-center mt-1 mb-14">
          ¿Desea {!isNaN(id) ? 'cambiar' : 'cargar'}
          {` el `}
          {elementoDeposito?.elemento_componente?.elemento?.nombre ===
          'WashPipe'
            ? 'Caño lavador'
            : (elementoDeposito?.elemento_componente?.elemento?.nombre ?? '-')}
          ?
        </p>
      </ModalDialog>
      <ModalDialog
        title={
          !isNaN(id)
            ? 'Se ha cambiado la pieza con exito!.'
            : 'Se ha cargado la pieza con exito!.'
        }
        isOpen={showModalSuccess}
        onOkLabel="Ok"
        onCancelLabel="Cerrar"
        onOk={() => handleRedirect()}
        onCancel={() => handleRedirect()}
        status={'success'}
      />
      <ModalDialog
        title={
          !isNaN(id) ? 'Error al cambiar la pieza ' : 'Error al cargarla pieza.'
        }
        isOpen={showModalError}
        onOkLabel="Ok"
        onCancelLabel="Cerrar"
        onOk={() => handleRedirect()}
        onCancel={() => handleRedirect()}
        status={'error'}
      />
    </div>
  );
}

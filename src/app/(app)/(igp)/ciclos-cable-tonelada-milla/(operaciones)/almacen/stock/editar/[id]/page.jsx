'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Title from '@/components/ui/labels/Title';
import Button from '@/components/ui/buttons/Button';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import BobinaForm from '../../../_components/BobinaForm';
import {
  actualizarElementoDeposito,
  obtenerElementoDepositoPorId,
} from '@/services/elementosDeposito.service';
import { SkeletonContainer } from '@/components/ui/skeleton';

export default function EditarBobina({ params }) {
  const { id } = params;
  const router = useRouter();
  const formRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [elementoDeposito, setElementoDeposito] = useState({});

  useEffect(() => {
    async function fetchElementoDeposito() {
      try {
        const data = await obtenerElementoDepositoPorId(id);
        const fechaIngreso =
          data?.fecha_ingreso && new Date(data?.fecha_ingreso);

        setElementoDeposito({
          marca_id: data?.marca_id,
          diametro_id: data?.diametro_id,
          serie: data?.serie,
          fecha_inicio:
            fechaIngreso && fechaIngreso.toISOString().split('T')[0],
          hora_inicio:
            fechaIngreso &&
            fechaIngreso.toISOString().split('T')[1].split('.')[0],
        });
      } catch (error) {
        setElementoDeposito({});
      } finally {
        setIsMounted(true);
      }
    }

    fetchElementoDeposito();
    return () => {
      setElementoDeposito({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnSubmit = async ({ fecha_inicio, hora_inicio, ...data }) => {
    try {
      const payload = {
        ...data,
        marca_id: !isNaN(data?.marca_id) && parseInt(data?.marca_id),
        diametro_id: !isNaN(data?.diametro_id) && parseInt(data?.diametro_id),
        fecha_ingreso: new Date(`${fecha_inicio}T${hora_inicio}:00Z`),
      };
      await actualizarElementoDeposito(id, payload);
      setShowModalSuccess(true);
    } catch (error) {
      setShowModalError(true);
    }
  };

  if (!isMounted) return <SkeletonContainer />;
  return (
    <div className="flex flex-col justify-between px-5 py-2 min-h-[440px] 2xl:min-h-[500px]">
      <Title>Bobina auxiliar</Title>
      {elementoDeposito?.serie && (
        <BobinaForm
          initialValues={elementoDeposito}
          formRef={formRef}
          handleOnSubmit={handleOnSubmit}
        />
      )}
      <div className="flex justify-end gap-3 mt-4">
        <Button icon={<ChevronLeft size={20} />} onClick={() => router.back()}>
          volver
        </Button>
        <Button onClick={() => formRef.current?.submitForm()}>
          modificar bobina
        </Button>
      </div>
      <ModalDialog
        title={'Se ha editado la bobina correctamente.'}
        isOpen={showModalSuccess}
        onCancel={() => setShowModalSuccess(false)}
        status={'success'}
        autoclose
        onAutoClose={() => router.back()}
      />
      <ModalDialog
        title={'No se ha podido editado la bobina.'}
        isOpen={showModalError}
        onCancel={() => setShowModalError(false)}
        status={'error'}
        autoclose
      />
    </div>
  );
}

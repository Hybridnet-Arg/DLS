'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Title from '@/components/ui/labels/Title';
import Button from '@/components/ui/buttons/Button';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import BobinaForm from '../../../_components/BobinaForm';
import {
  cargarElementoDeposito,
  getAllElementosDepositoByFilters,
  obtenerElementoDepositoPorId,
  recambioElementoDeposito,
} from '@/services/elementosDeposito.service';
import { SkeletonContainer } from '@/components/ui/skeleton';
import usePerforadoresStore from '@/store/perforadores.store';
import { ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA } from '@/constants/elementos.contant';
import { COMPONENTES } from '@/constants/componentes.constant';

export default function CambiarBobina({ params }) {
  const { id } = params;
  const router = useRouter();
  const formRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [elementoDeposito, setElementoDeposito] = useState({});
  const [bobinaVigente, setBobinaVigente] = useState({});

  useEffect(() => {
    const fetchBobinaVigente = async () => {
      try {
        const queryParams = {
          en_uso: true,
          baja: false,
          elemento_id: ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA.BOBINA,
          componente_id: COMPONENTES.CICLOS_CABLE_TONELADA_MILLA,
          numero_perforador:
            usePerforadoresStore.getState().perforadorSeleccionado
              ?.idPerforador,
        };
        const piezas = await getAllElementosDepositoByFilters(queryParams);
        const bobina = piezas?.length > 0 ? piezas?.[0] : {};
        setBobinaVigente(bobina);
      } catch (error) {
        setBobinaVigente({});
      }
    };

    fetchBobinaVigente();
    return () => {
      setBobinaVigente({});
    };
  }, []);

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
  }, [id]);

  const handleOnSubmit = async () => {
    try {
      if (bobinaVigente?.id) {
        await recambioElementoDeposito(bobinaVigente?.id, id);
      } else {
        await cargarElementoDeposito(id);
      }
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
          inputProps={{
            readOnly: true,
            disabled: true,
          }}
        />
      )}
      <div className="flex justify-end gap-3 mt-4">
        <Button icon={<ChevronLeft size={20} />} onClick={() => router.back()}>
          volver
        </Button>
        <Button onClick={() => formRef.current?.submitForm()}>
          {bobinaVigente?.id ? 'cambiar bobina' : 'cargar bobina'}
        </Button>
      </div>
      <ModalDialog
        title={
          bobinaVigente?.id
            ? 'Se ha cambiado la bobina'
            : 'Se ha cargado la bobina'
        }
        isOpen={showModalSuccess}
        onCancel={() => setShowModalSuccess(false)}
        status={'success'}
        autoclose
        onAutoClose={() => router.push('/ciclos-cable-tonelada-milla')}
      />
      <ModalDialog
        title={
          bobinaVigente?.id
            ? 'Ha habido un error al cambiar la bobina'
            : 'Ha habido un error al cargar la bobina'
        }
        isOpen={showModalError}
        onCancel={() => setShowModalError(false)}
        status={'error'}
        autoclose
      />
    </div>
  );
}

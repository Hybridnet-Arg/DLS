'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import usePerforadoresStore from '@/store/perforadores.store';
import { crearElementoDeposito } from '@/services/elementosDeposito.service';
import { getElementosComponenteByNumeroPerforador } from '@/services/elementosComponente.service';
import { COMPONENTES } from '@/constants/componentes.constant';
import { ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA } from '@/constants/elementos.contant';
import Title from '@/components/ui/labels/Title';
import Button from '@/components/ui/buttons/Button';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import BobinaForm from '../../_components/BobinaForm';

export default function CargaDeAlmacen() {
  const router = useRouter();
  const formRef = useRef(null);
  const { perforadorSeleccionado } = usePerforadoresStore();
  const [showModalError, setShowModalError] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [elementoComponente, setElementoComponente] = useState({});

  useEffect(() => {
    async function fetchElementoComponente() {
      try {
        const params = {
          elemento_id: ELEMENTOS_CICLOS_CABLE_TONELADA_MILLA.BOBINA,
          componente_id: COMPONENTES.CICLOS_CABLE_TONELADA_MILLA,
          nombre_perforador: perforadorSeleccionado?.nombre,
        };
        const data = await getElementosComponenteByNumeroPerforador(
          perforadorSeleccionado?.idPerforador,
          params
        );
        setElementoComponente(data);
      } catch (error) {
        setElementoComponente({});
      }
    }
    fetchElementoComponente();

    return () => {
      setElementoComponente({});
    };
  }, [perforadorSeleccionado]);

  const handleOnSubmit = async ({ fecha_inicio, hora_inicio, ...data }) => {
    try {
      const payload = {
        ...data,
        marca_id: !isNaN(data?.marca_id) && parseInt(data?.marca_id),
        diametro_id: !isNaN(data?.diametro_id) && parseInt(data?.diametro_id),
        numero_perforador: perforadorSeleccionado?.idPerforador,
        fecha_ingreso: new Date(`${fecha_inicio}T${hora_inicio}:00Z`),
        elemento_componente_id: parseInt(elementoComponente?.id),
      };
      await crearElementoDeposito(payload);
      setShowModalSuccess(true);
    } catch (error) {
      setShowModalError(true);
    }
  };

  return (
    <div className="flex flex-col justify-between px-5 py-2 min-h-[440px] 2xl:min-h-[500px]">
      <Title>Bobina auxiliar</Title>
      <BobinaForm formRef={formRef} handleOnSubmit={handleOnSubmit} />
      <div className="flex justify-end gap-3 mt-4">
        <Button icon={<ChevronLeft size={20} />} onClick={() => router.back()}>
          volver
        </Button>
        <Button onClick={() => formRef.current?.submitForm()}>
          cargar bobina
        </Button>
      </div>
      <ModalDialog
        title={'Se ha cargado la bobina correctamente.'}
        isOpen={showModalSuccess}
        onCancel={() => setShowModalSuccess(false)}
        status={'success'}
        autoclose
        onAutoClose={() => router.back()}
      />
      <ModalDialog
        title={'No se ha podido cargar la bobina.'}
        isOpen={showModalError}
        onCancel={() => setShowModalError(false)}
        status={'error'}
        autoclose
      />
    </div>
  );
}

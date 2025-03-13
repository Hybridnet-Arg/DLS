'use client';

import { Fragment, useState } from 'react';
import { eliminarPlanificacionPorTareaForecastId } from '@/services/planificaciones.service';
import ModalDialog from '@/components/ui/modal/ModalDialog';

export default function EliminarPlanificacionModal({
  showModal,
  setShowModal = () => {},
  onFinish = async () => {},
  tareaForecast,
  planificacionActividades = [],
}) {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  async function handleOk() {
    try {
      setIsLoadingSubmit(true);
      const planificacion_actividad_ids = planificacionActividades.map(
        (item) => item.id
      );
      await eliminarPlanificacionPorTareaForecastId(tareaForecast?.id, {
        planificacion_actividad_ids,
        planificacion_area_id:
          planificacionActividades?.[0]?.planificacion_area_id,
      });
      onFinish();
      setShowSuccessModal(true);
    } catch (error) {
      setShowErrorModal(true);
    } finally {
      setShowModal(false);
      setIsLoadingSubmit(false);
    }
  }

  return (
    <Fragment>
      <ModalDialog
        isOpen={showModal}
        onOkLabel="Si"
        onCancelLabel="No"
        loading={isLoadingSubmit}
        onOk={() => handleOk()}
        onCancel={() => setShowModal(false)}
      >
        <h1 className="text-lg font-semibold text-center">
          Va a eliminar todas las actividades previstas <br /> para este dia en
          esta área.
          <br /> Esta acción no se puede deshacer y deberá <br /> volver a
          cargarlas manualmente.
        </h1>
        <h1 className="mt-8 text-lg font-semibold text-center">
          ¿Esta seguro que desea eliminarlas?
        </h1>
      </ModalDialog>
      <ModalDialog
        title={`Se ha eliminado con exito`}
        isOpen={showSuccessModal}
        onOkLabel="Ok"
        onCancelLabel="Cerrar"
        onOk={() => setShowSuccessModal(false)}
        onCancel={() => {
          setShowSuccessModal(false);
        }}
        status={'success'}
      />
      <ModalDialog
        title={`Hubo un error al eliminar la planificacion`}
        isOpen={showErrorModal}
        onOkLabel="Ok"
        onCancelLabel="Cerrar"
        onOk={() => setShowErrorModal(false)}
        onCancel={() => {
          setShowErrorModal(false);
        }}
        status={'error'}
      />
    </Fragment>
  );
}

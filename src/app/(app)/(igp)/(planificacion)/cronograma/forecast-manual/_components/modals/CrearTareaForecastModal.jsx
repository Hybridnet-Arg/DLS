'use client';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import { crearTareaForecast } from '@/services/tareasForecast.service';
import Modal from '@/components/ui/modal/Modal';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import TareaForecast from '../TareaForecast';
import { TIPOS_TARIFA_FORECAST } from '@/constants/cronograma.constant';
import { useCronogramaStore } from '@/store/cronograma.store';

export default function CrearTareaForecastModal({
  tiposTareasForecast = [],
  showModal,
  setShowModal = () => {},
  onFinish = async () => {},
  perforador_forecast_id,
  locacion_perforador_cronograma_id,
  numero_pozo,
  fecha,
  id,
}) {
  const { tareasForescastPendientes, clearCronogramaStore } =
    useCronogramaStore();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [tipoTareaForecast, setTipoTareaForecast] = useState(null);
  const [error, setError] = useState('');

  async function handleSubmit() {
    try {
      setIsLoadingSubmit(true);

      let payload = {};
      if (tareasForescastPendientes?.length > 0) {
        payload.tareas_forecast = tareasForescastPendientes.map((item) => ({
          ...item,
          tipo_tarea_forecast_id: tipoTareaForecast?.id,
        }));
      } else {
        payload = {
          tipo_tarea_forecast_id: tipoTareaForecast?.id,
          perforador_forecast_id,
          locacion_perforador_cronograma_id,
          numero_pozo,
          fecha,
        };
      }

      await crearTareaForecast(payload);
      setShowSuccessModal(true);
      clearCronogramaStore();
    } catch (error) {
      setError(error?.response?.data?.error?.message);
      setShowErrorModal(true);
    } finally {
      setShowModal(false);
      setIsLoadingSubmit(false);
    }
  }

  return (
    <Fragment>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        okLabel={`${!id ? 'Guardar' : 'Modificar'} datos`}
        onOk={() => handleSubmit()}
        cancel
        isLoadingOk={isLoadingSubmit}
      >
        <div className="flex justify-between gap-2 items-center">
          <div className="w-1/3"></div>
          {tiposTareasForecast?.length > 0 &&
            tiposTareasForecast
              ?.filter(
                (tipoTarea) => tipoTarea?.tipo === TIPOS_TARIFA_FORECAST.A
              )
              ?.map((tipoTarea) => (
                <div key={tipoTarea?.id} className="w-2/3">
                  <p className="text-xs font-semibold mb-50">
                    {tipoTarea?.nombre}
                  </p>
                </div>
              ))}
        </div>
        <div className="flex justify-between gap-2 items-center mt-3">
          <h1 className="font-semibold text-sm w-1/3">TARIFA A</h1>
          {tiposTareasForecast?.length > 0 &&
            tiposTareasForecast
              ?.filter(
                (tipoTarea) => tipoTarea?.tipo === TIPOS_TARIFA_FORECAST.A
              )
              ?.map((tipoTarea) => (
                <div key={tipoTarea?.id} className="w-2/3">
                  <button
                    onClick={() => setTipoTareaForecast(tipoTarea)}
                    className={clsx(
                      'shadow-dark-sm rounded-lg cursor-pointer self-center hover:opacity-40 h-[5rem]',
                      { 'opacity-40': tipoTarea?.id === tipoTareaForecast?.id }
                    )}
                  >
                    <TareaForecast
                      tareaForecast={{ tipo_tarea_forecast: tipoTarea }}
                    />
                  </button>
                </div>
              ))}
        </div>
        <div className="flex justify-between gap-2 items-center mt-3">
          <h1 className="font-semibold text-sm w-1/3">TARIFA B</h1>
          {tiposTareasForecast?.length > 0 &&
            tiposTareasForecast
              ?.filter(
                (tipoTarea) => tipoTarea?.tipo === TIPOS_TARIFA_FORECAST.B
              )
              ?.map((tipoTarea) => (
                <div key={tipoTarea?.id} className="w-2/3">
                  <button
                    onClick={() => setTipoTareaForecast(tipoTarea)}
                    className={clsx(
                      'shadow-dark-sm rounded-lg cursor-pointer self-center hover:opacity-40 h-[5rem]',
                      { 'opacity-40': tipoTarea?.id === tipoTareaForecast?.id }
                    )}
                  >
                    <TareaForecast
                      tareaForecast={{ tipo_tarea_forecast: tipoTarea }}
                    />
                  </button>
                </div>
              ))}
        </div>
      </Modal>
      <ModalDialog
        title={`Tarea forecast ${!id ? 'cargada' : 'actualizado'} con exito.`}
        isOpen={showSuccessModal}
        onOkLabel="Ok"
        onCancelLabel="Cerrar"
        onOk={onFinish}
        onCancel={async () => {
          setShowSuccessModal(false);
          await onFinish();
        }}
        status={'success'}
      />
      <ModalDialog
        title={`Error al ${!id ? 'cargar' : 'actualizar'} la tarea forecast. ${error}`}
        isOpen={showErrorModal}
        onOkLabel="Ok"
        onCancelLabel="Cerrar"
        onOk={() => setShowErrorModal(false)}
        onCancel={() => setShowErrorModal(false)}
        status={'error'}
      />
    </Fragment>
  );
}

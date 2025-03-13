'use client';
import clsx from 'clsx';
import { Form, Formik } from 'formik';
import { Fragment, useEffect, useRef, useState } from 'react';
import {
  actualizarPlanificacion,
  crearPlanificacion,
} from '@/services/planificaciones.service';
import Modal from '@/components/ui/modal/Modal';
import InputField from '@/components/ui/inputs/Input';
import ModalDialog from '@/components/ui/modal/ModalDialog';

export default function CrearActividadesModal({
  showModal,
  setShowModal = () => {},
  onFinish = async () => {},
  id,
  initialValues = {},
  tareaForecast,
  planificacionArea,
  planificacionActividades,
}) {
  const formikRef = useRef();

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);

  useEffect(() => {
    if (initialValues?.planificacion_actividades) {
      setSelectedActivities(
        initialValues?.planificacion_actividades?.map(
          (actividad) => actividad.id
        )
      );
    }
  }, [initialValues]);

  const handleCheckboxChange = (id) => {
    setSelectedActivities((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  async function handleSubmit(values) {
    try {
      setIsLoadingSubmit(true);

      const payload = {
        planificacion_actividad_ids: selectedActivities,
        tarea_forecast_id: tareaForecast?.id,
        planificacion_area_id:
          planificacionActividades?.[0]?.planificacion_area_id,
        ...values,
      };

      if (!initialValues?.nota || !initialValues?.planificacion_actividades) {
        await crearPlanificacion(payload);
      } else {
        await actualizarPlanificacion(payload);
      }
      onFinish();
      setShowSuccessModal(true);
    } catch (error) {
      setShowErrorModal(true);
    } finally {
      setShowModal(false);
      setIsLoadingSubmit(false);
    }
  }

  function handleValidation() {
    const errors = {};

    if (selectedActivities.length === 0) {
      errors.actividades = 'Debe seleccionar al menos una actividad';
    }

    return errors;
  }

  return (
    <Fragment>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        header={
          <h1 className="mx-4 mt-4 text-lg font-semibold ">
            Seleccionar actividades de {planificacionArea?.nombre}
          </h1>
        }
        okLabel={`${!id ? 'Cargar' : 'Modificar'} datos`}
        onOk={() => formikRef.current?.submitForm()}
        cancel
        isLoadingOk={isLoadingSubmit}
      >
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validate={handleValidation}
          onSubmit={handleSubmit}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ values, errors, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              {planificacionActividades?.map((item) => (
                <div key={item?.id}>
                  <span className="text-sm">{item?.nombre}</span>{' '}
                  <input
                    type="checkbox"
                    checked={selectedActivities.includes(item?.id)}
                    onChange={() => handleCheckboxChange(item?.id)}
                  />{' '}
                </div>
              ))}
              {errors.actividades && (
                <p className={clsx('text-sm text-red-500')}>
                  {errors.actividades}
                </p>
              )}
              <InputField
                id={'nota'}
                name={'nota'}
                error={errors?.nota}
                value={values?.nota}
                label={'Nota:'}
                labelStyles="font-light text-sm"
                inputStyles="text-[8px] bg-white shadow py-[0.4rem] px-2 text-sm"
              />
            </Form>
          )}
        </Formik>
      </Modal>
      <ModalDialog
        title={`Tarea de planificacion ${initialValues?.planificacion_actividades ? 'modificada' : 'creada'} con exito`}
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
        title={`Error al ${initialValues?.planificacion_actividades ? 'modificar' : 'crear'} la tarea de planificacion`}
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

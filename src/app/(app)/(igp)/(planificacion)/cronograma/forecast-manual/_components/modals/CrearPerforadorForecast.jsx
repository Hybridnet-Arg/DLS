'use client';
import { Form, Formik } from 'formik';
import { Fragment, useRef, useState } from 'react';
import { crearPerforadorForecast } from '@/services/perforadoresForecast.service';
import Modal from '@/components/ui/modal/Modal';
import InputField from '@/components/ui/inputs/Input';
import ModalDialog from '@/components/ui/modal/ModalDialog';

const DEFAULT_VALUES = {};

export default function CrearPerforadorForecastModal({
  showModal,
  setShowModal = () => {},
  onFinish = async () => {},
  perforadores = [],
  cronograma_id,
  perforadorForecast,
}) {
  const formikRef = useRef();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [initialValues] = useState(DEFAULT_VALUES);

  async function handleSubmit(values) {
    try {
      setIsLoadingSubmit(true);

      const perforador = perforadores.find(
        (perforador) => String(perforador.numero) === values?.numero
      );

      const payload = {
        ...values,
        nombre_perforador: perforador?.nombre,
        cronograma_id,
      };

      await crearPerforadorForecast(payload);

      setShowSuccessModal(true);
    } catch (error) {
      setShowErrorModal(true);
    } finally {
      setShowModal(false);
      setIsLoadingSubmit(false);
    }
  }

  function handleValidation(values) {
    const errors = {};

    if (values?.numero === '') {
      errors.numero = 'Debe seleccionar un perforador';
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
            {!perforadorForecast ? 'Cargar' : 'Modificar'} Perforador Forecast
          </h1>
        }
        okLabel={`${!perforadorForecast ? 'Cargar' : 'Modificar'} datos`}
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
              <InputField
                id={'numero'}
                name={'numero'}
                type="select"
                options={[
                  { value: '', label: 'Selecciona un perforador' },
                  ...perforadores.map((perforador) => ({
                    value: perforador?.numero,
                    label: perforador?.nombre,
                  })),
                ]}
                error={errors?.numero}
                value={values?.numero}
                label={'Seleccione un perforador del cronograma:'}
                labelStyles="font-light text-sm"
                inputStyles="text-[8px] bg-white shadow py-[0.4rem] px-2 text-sm"
              />
            </Form>
          )}
        </Formik>
      </Modal>
      <ModalDialog
        title={`Perforador ${!perforadorForecast ? 'cargado' : 'actualizado'} con exito en el forecast`}
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
        title={`Error al ${!perforadorForecast ? 'cargar' : 'actualizar'} el perforador en el forecast`}
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

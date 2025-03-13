'use client';
import { Form, Formik } from 'formik';
import { Fragment, useEffect, useRef, useState } from 'react';
import InputField from '@/components/ui/inputs/Input';
import Modal from '@/components/ui/modal/Modal';
import { crearPerforadorCronograma } from '@/services/perforadoresCronograma.service';
import ModalDialog from '@/components/ui/modal/ModalDialog';

const DEFAULT_VALUES = {
  numero: '',
};

export default function CreatePerforadorCronogramaModal({
  showModal,
  setShowModal = () => {},
  onFinish = async () => {},
  perforadores = [],
  cronograma_id,
  perforadorCronograma,
}) {
  const formikRef = useRef();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [initialValues, setInitialValues] = useState(
    perforadorCronograma ?? DEFAULT_VALUES
  );

  useEffect(() => {
    if (perforadorCronograma) {
      setInitialValues({
        numero: perforadorCronograma.numero,
      });
    }

    return () => {
      setInitialValues(DEFAULT_VALUES);
    };
  }, [perforadorCronograma]);

  async function handleSubmit(values) {
    try {
      setIsLoadingSubmit(true);

      const perforador = perforadores.find(
        (perforador) => perforador.idPerforador === values?.numero
      );
      const payload = {
        ...values,
        nombre_perforador: perforador?.nombre,
        cronograma_id,
      };

      await crearPerforadorCronograma(payload);

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
            {!perforadorCronograma ? 'Cargar' : 'Modificar'} Perforador en
            Cronograma
          </h1>
        }
        okLabel={`${!perforadorCronograma ? 'Cargar' : 'Modificar'} datos`}
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
                    value: perforador?.idPerforador,
                    label: perforador?.nombre,
                  })),
                ]}
                error={errors?.numero}
                value={values?.numero}
                label={'Seleccione un perforador:'}
                labelStyles="font-light text-sm"
                inputStyles="text-[8px] bg-white shadow py-[0.4rem] px-2 text-sm"
              />
            </Form>
          )}
        </Formik>
      </Modal>
      <ModalDialog
        title={`Perforador ${!perforadorCronograma ? 'cargado' : 'actualizado'} con exito en el cronograma`}
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
        title={`Error al ${!perforadorCronograma ? 'cargar' : 'actualizar'} el perforador en el cronograma`}
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

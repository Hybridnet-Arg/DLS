'use client';
import { Form, Formik } from 'formik';
import { Fragment, useRef, useState } from 'react';
import InputField from '@/components/ui/inputs/Input';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import { cambiarTanque } from '@/services/tanques.service';

export default function CambiarTanqueModal({
  initialValues = {},
  onRefresh = async () => {},
  tanque = {},
  ...modalProps
}) {
  const formikRef = useRef();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  async function handleValidation(values) {
    const errors = {};

    if (!values?.litros) {
      errors.litros = 'Ingresa los litros';
    } else if (!/^[0-9]+$/.test(values.litros)) {
      errors.litros = 'Solo se permiten números enteros positivos';
    }

    return errors;
  }

  async function handleSubmit(values) {
    try {
      setIsSubmitLoading(true);
      const payload = {
        idTanqueViejo: tanque?.id,
        nuevaCapacidad: values?.litros,
      };
      await cambiarTanque(payload);
      setShowSuccessModal(true);
      await onRefresh();
    } catch (error) {
      setShowErrorModal(true);
    } finally {
      setIsSubmitLoading(false);
    }
  }

  return (
    <Fragment>
      <ModalDialog
        {...modalProps}
        loading={isSubmitLoading}
        onOk={() => formikRef?.current?.submitForm()}
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
              <p className="text-center font-medium">
                Cambiar Tanque de Gasoil
              </p>
              <InputField
                id={'litros'}
                name={'litros'}
                type="number"
                error={errors?.litros}
                value={values?.litros}
                label={'Litros'}
                labelStyles="font-light text-sm"
                inputStyles="text-[8px] bg-dark text-warning shadow py-3 px-2 text-sm opacity-100"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, '');
                  formikRef.current.setFieldValue('litros', e.target.value);
                }}
              />
            </Form>
          )}
        </Formik>
      </ModalDialog>
      <ModalDialog
        isOpen={showErrorModal}
        onOk={() => setShowErrorModal(false)}
        title={'Hubo un error al cambiar el tanque'}
        status={'error'}
        onOkLabel={'ok'}
        showCancelButton={false}
        closable={false}
      />
      <ModalDialog
        isOpen={showSuccessModal}
        onOk={() => setShowSuccessModal(false)}
        title={'Se ha cambiado el tanque correctamente'}
        status={'success'}
        closable={false}
        onOkLabel={'ok'}
        showCancelButton={false}
      />
    </Fragment>
  );
}

'use client';
import { Form, Formik } from 'formik';
import { Fragment, useRef, useState } from 'react';
import InputField from '@/components/ui/inputs/Input';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import { actualizarTanque } from '@/services/tanques.service';

export default function ActivarTanqueModal({
  activo = false,
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

    if (!values?.fecha) {
      errors.fecha = 'Ingresa una fecha';
    }
    if (!values?.hora) {
      errors.hora = 'Ingresa una hora';
    }
    /* if (!values?.responsable) {
      errors.responsable = 'Ingresa un responsable';
    } */

    return errors;
  }

  async function handleSubmit(values) {
    try {
      setIsSubmitLoading(true);
      const payload = {
        id: tanque?.id,
        habilitado: activo,
        fecha: new Date(`${values.fecha}T${values.hora}`).toISOString(),
      };
      await actualizarTanque(payload);
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
                {!activo ? 'Desactivar' : 'Activar'} Tanque de Gasoil
              </p>
              <InputField
                id={'fecha'}
                name={'fecha'}
                type={'date'}
                error={errors?.fecha}
                value={values?.fecha}
                label={'Fecha'}
                labelStyles="font-light text-sm"
                inputStyles="text-[8px] bg-dark text-warning shadow py-3 px-2 text-sm opacity-100 custom-date-icon"
              />
              <InputField
                id={'hora'}
                name={'hora'}
                type="time"
                error={errors?.hora}
                value={values?.hora}
                label={'Hora'}
                labelStyles="font-light text-sm"
                inputStyles="text-[8px] bg-dark text-warning shadow py-3 px-2 text-sm opacity-100 custom-date-icon"
              />
              {/* <InputField
                id={'responsable'}
                name={'responsable'}
                error={errors?.responsable}
                value={values?.responsable}
                label={'Persona responsable'}
                labelStyles="font-light text-sm"
                inputStyles="text-[8px] bg-dark text-warning shadow py-3 px-2 text-sm opacity-100"
              /> */}
            </Form>
          )}
        </Formik>
      </ModalDialog>
      <ModalDialog
        isOpen={showErrorModal}
        onCancel={() => setShowErrorModal(false)}
        onOk={() => setShowErrorModal(false)}
        title={`Hubo un error al ${activo ? 'desactivar' : 'activar'} el tanque`}
        status={'error'}
        onOkLabel={'ok'}
        showCancelButton={false}
        closable={false}
      />
      <ModalDialog
        isOpen={showSuccessModal}
        onOk={() => setShowSuccessModal(false)}
        title={`Se ha ${activo ? 'activado' : 'desactivado'} correctamente el tanque`}
        status={'success'}
        closable={false}
        onOkLabel={'ok'}
        showCancelButton={false}
      />
    </Fragment>
  );
}

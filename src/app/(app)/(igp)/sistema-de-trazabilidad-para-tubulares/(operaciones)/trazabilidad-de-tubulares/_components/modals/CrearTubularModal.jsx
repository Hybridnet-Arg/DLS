import { Form, Formik } from 'formik';
import { Fragment, useRef, useState } from 'react';
import { crearTubular } from '@/services/tubularesMovimientos.service';
import InputField from '@/components/ui/inputs/Input';
import ModalDialog from '@/components/ui/modal/ModalDialog';

export default function CrearTubularModal({
  initialValues = {},
  onRefresh = async () => {},
  planPozo = {},
  perforadorLocaciones = [],
  ...modalProps
}) {
  const formikRef = useRef();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  async function handleValidation(values) {
    const errors = {};

    if (!values?.perforador_locacion_id) {
      errors.perforador_locacion_id = 'Selecciona una locación';
    }

    return errors;
  }

  async function handleSubmit(values) {
    try {
      setIsSubmitLoading(true);
      await crearTubular({
        ...values,
        plan_pozo_id: planPozo?.id,
        perforador_id: planPozo?.perforador_id,
      });
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
                Perforador sin locación asignada
              </p>
              <InputField
                id={'perforador_locacion_id'}
                name={'perforador_locacion_id'}
                type="select"
                disabled
                options={
                  perforadorLocaciones?.length > 0
                    ? [
                        { value: '', label: 'Selecciona una locación' },
                        ...perforadorLocaciones?.map((locacion) => ({
                          value: locacion?.id,
                          label: locacion?.locacion?.nombre,
                        })),
                      ]
                    : [{ value: '', label: 'Selecciona una locación' }]
                }
                error={errors?.perforador_locacion_id}
                value={values?.perforador_locacion_id}
                labelStyles="font-light text-sm"
                inputStyles="text-[8px] bg-dark text-warning shadow py-3 px-2 text-sm opacity-100"
              />
              <p className="text-center font-medium">
                ¿Desea iniciar la trazabilidad?
              </p>
            </Form>
          )}
        </Formik>
      </ModalDialog>
      <ModalDialog
        isOpen={showErrorModal}
        onCancel={() => setShowErrorModal(false)}
        onOk={() => setShowErrorModal(false)}
        title={'Hubo un error al iniciar la trazabilidad, intenta nuevamente.'}
        status={'error'}
      />
    </Fragment>
  );
}

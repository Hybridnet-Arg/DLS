import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { Fragment, useRef, useState } from 'react';
import {
  actualizarTubular,
  crearDocumentosTubularMovimiento,
} from '@/services/tubularesMovimientos.service';
import { TIPOS_DOCUMENTO_TUBULARES } from '@/constants';
import InputField from '@/components/ui/inputs/Input';
import ModalDialog from '@/components/ui/modal/ModalDialog';

export default function CargarLocacionTubularModal({
  initialValues = {},
  tubular,
  tubularesMovimientoId,
  onRefresh = async () => {},
  planPozo = {},
  perforadorLocaciones = [],
  ...modalProps
}) {
  const formikRef = useRef();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  async function handleValidation() {
    const errors = {};

    if (!file) {
      errors.enlace_documento = 'El documento es requerido';
    }

    return errors;
  }

  async function handleSubmit(values) {
    try {
      setIsSubmitLoading(true);

      await actualizarTubular(tubular?.id, {
        plan_pozo_id: planPozo?.id,
        tubulares_movimiento_id: tubularesMovimientoId,
        perforador_locacion_id: values?.perforador_locacion_id,
      });
      await crearDocumentosTubularMovimiento({
        archivo: file,
        fecha: new Date(),
        tipo_documento: TIPOS_DOCUMENTO_TUBULARES.TALLY,
        tubulares_movimiento_id: tubularesMovimientoId,
      });
      await onRefresh();
    } catch (error) {
      setShowErrorModal(true);
    } finally {
      setIsSubmitLoading(false);
    }
  }

  const handleOnOk = () => {
    if (!planPozo?.id) return router.replace('/avances-de-pozo/plan-pozo');
    formikRef?.current?.submitForm();
  };

  return (
    <Fragment>
      <ModalDialog
        {...modalProps}
        loading={isSubmitLoading}
        onOk={() => handleOnOk()}
      >
        {planPozo?.id ? (
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
                <h3>Cargar datos de locación</h3>
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
                  label={'Locación'}
                  labelStyles="font-light text-sm"
                  inputStyles="text-[8px] bg-dark text-warning shadow py-3 px-2 text-sm opacity-100"
                />
                <InputField
                  id="enlace_documento"
                  name="enlace_documento"
                  type="file"
                  label="Documento"
                  onChange={handleFileChange}
                  errorStyles="mt-2"
                  error={errors?.enlace_documento}
                />
                <p className="text-center font-medium">
                  ¿Desea aplicar estos cambios?
                </p>
              </Form>
            )}
          </Formik>
        ) : (
          <div>
            <h3 className="text-center font-semibold">
              {' '}
              No hay plan de pozo asociado a este perforador{' '}
            </h3>
            <p className="text-center mt-3">¿Desea iniciar un plan de pozo?</p>
          </div>
        )}
      </ModalDialog>
      <ModalDialog
        isOpen={showErrorModal}
        onCancel={() => setShowErrorModal(false)}
        onOk={() => setShowErrorModal(false)}
        title={
          'Hubo un error al cargar la partida inicial, intentelo nuevamente.'
        }
        status={'error'}
      />
    </Fragment>
  );
}

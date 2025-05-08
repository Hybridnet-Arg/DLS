import { Form, Formik } from 'formik';
import { Fragment, useRef, useState } from 'react';
import { crearTubularMovimiento } from '@/services/tubularesMovimientos.service';
import {
  DESTINOS_TUBULARES,
  ESTADOS_MOVIMIENTOS_TUBULARES,
  TIPOS_DOCUMENTO_TUBULARES,
} from '@/constants';
import InputField from '@/components/ui/inputs/Input';
import ModalDialog from '@/components/ui/modal/ModalDialog';

export default function CargarPartidaInicialTubularModal({
  initialValues = {},
  tubular,
  onRefresh = async () => {},
  ...modalProps
}) {
  const formikRef = useRef();
  const [file, setFile] = useState(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  async function handleValidation(values) {
    const errors = {};

    if (!values?.cantidad) {
      errors.cantidad = 'Ingresa una cantidad';
    }
    if (!file) {
      errors.enlace_documento = 'El documento es requerido';
    }

    return errors;
  }

  async function handleSubmit(values) {
    try {
      setIsSubmitLoading(true);
      await crearTubularMovimiento({
        cantidad: values?.cantidad,
        archivo: file,
        tipo_documento: TIPOS_DOCUMENTO_TUBULARES.TALLY,
        tubular_id: tubular?.id,
        tubulares_destino_id: DESTINOS_TUBULARES.LOCACION,
        partida_inicial: true,
        estado: ESTADOS_MOVIMIENTOS_TUBULARES.DOCUMENTACION_COMPLETADA,
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
                Cargar partida inicial de tubulares
              </p>
              <InputField
                id={'cantidad'}
                name={'cantidad'}
                type="number"
                onKeyDown={(e) => {
                  if (e.key === '.' || e.key === ',') {
                    e.preventDefault();
                  }
                }}
                error={errors?.cantidad}
                value={values?.cantidad}
                labelStyles="font-light text-sm"
                label="Cantidad"
                inputStyles="text-[8px] bg-white shadow py-3 px-2 text-sm"
              />
              <InputField
                id="enlace_documento"
                name="enlace_documento"
                type="file"
                label="Documento Tally"
                onChange={handleFileChange}
                errorStyles="mt-2"
                error={errors?.enlace_documento}
              />
            </Form>
          )}
        </Formik>
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

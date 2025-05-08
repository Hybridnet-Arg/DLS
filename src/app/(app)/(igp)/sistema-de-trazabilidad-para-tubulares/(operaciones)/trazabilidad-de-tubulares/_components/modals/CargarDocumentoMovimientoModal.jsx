import { Form, Formik } from 'formik';
import { Fragment, useRef, useState } from 'react';
import { crearDocumentosTubularMovimiento } from '@/services/tubularesMovimientos.service';
import { TIPOS_DOCUMENTO_TUBULARES } from '@/constants';
import InputField from '@/components/ui/inputs/Input';
import ModalDialog from '@/components/ui/modal/ModalDialog';

export default function CargarDocumentoMovimientoModal({
  initialValues = {},
  tubularesMovimientoId,
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

    if (!values?.numero) {
      errors.numero = 'Ingresa un número';
    }
    if (!values?.tipo_documento) {
      errors.tipo_documento = 'Selecciona un tipo de archivo';
    }
    if (!values?.fecha) {
      errors.fecha = 'Ingresa una fecha';
    }
    if (!file) {
      errors.enlace_documento = 'El documento es requerido';
    }

    return errors;
  }

  async function handleSubmit(values) {
    try {
      setIsSubmitLoading(true);

      await crearDocumentosTubularMovimiento({
        archivo: file,
        fecha: values?.fecha,
        numero: values?.numero,
        tipo_documento: values?.tipo_documento,
        tubulares_movimiento_id: tubularesMovimientoId,
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
              <p className=" font-medium">Cargar documento</p>
              <InputField
                id={'tipo_documento'}
                name={'tipo_documento'}
                type="select"
                error={errors?.tipo_documento}
                value={values?.tipo_documento}
                labelStyles="font-light text-sm"
                label="Tipo de archivo"
                options={[
                  { value: '', label: 'Selecciona un tipo de archivo' },
                  {
                    value: TIPOS_DOCUMENTO_TUBULARES.INFORME,
                    label: TIPOS_DOCUMENTO_TUBULARES.INFORME,
                  },
                  {
                    value: TIPOS_DOCUMENTO_TUBULARES.REMITO,
                    label: TIPOS_DOCUMENTO_TUBULARES.REMITO,
                  },
                ]}
                inputStyles="text-[8px] bg-white shadow py-3 px-2 text-sm"
              />
              <InputField
                id={'numero'}
                name={'numero'}
                error={errors?.numero}
                value={values?.numero}
                labelStyles="font-light text-sm"
                label="Número"
                inputStyles="text-[8px] bg-white shadow py-3 px-2 text-sm"
              />
              <InputField
                id={'fecha'}
                name={'fecha'}
                type="date"
                error={errors?.fecha}
                value={values?.fecha}
                labelStyles="font-light text-sm"
                label="Fecha"
                inputStyles="text-[8px] bg-white shadow py-3 px-2 text-sm"
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

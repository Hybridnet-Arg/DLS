import { useState } from 'react';
import { Form, Formik } from 'formik';
import Button from '@/components/ui/buttons/Button';
import InputField from '@/components/ui/inputs/Input';
import Title from '@/components/ui/labels/Title';
import { crearCronograma } from '@/services/cronograma.service';
import ModalDialog from '@/components/ui/modal/ModalDialog';

export default function CreateCronogramaForm({
  ubicacion_id,
  onReload = () => {},
}) {
  const [isLoadingOnFinish, setIsLoadingOnFinish] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  function handleValidation(values) {
    const errors = {};
    if (!values.nombre) {
      errors.nombre = 'El nombre es requerido';
    }
    if (!values.fecha_inicio) {
      errors.fecha_inicio = 'La fecha de inicio es requerida';
    }
    if (!values.fecha_fin) {
      errors.fecha_fin = 'La fecha de fin es requerida';
    }
    return errors;
  }

  const handleOnFinish = async (data) => {
    try {
      setIsLoadingOnFinish(true);
      const fechaInicio = new Date(data?.fecha_inicio).setUTCHours(0, 0, 0, 0);
      const fechaFin = new Date(data?.fecha_fin).setUTCHours(23, 59, 59, 999);
      const payload = {
        ...data,
        fecha_inicio: new Date(fechaInicio),
        fecha_fin: new Date(fechaFin),
        ubicacion_id: Number(ubicacion_id),
      };

      await crearCronograma(payload);
      setShowSuccessModal(true);
    } catch (error) {
      setShowErrorModal(true);
    } finally {
      setIsLoadingOnFinish(false);
    }
  };

  return (
    <div className="bg-white px-3 py-2 rounded min-h-[360px]">
      <Formik
        initialValues={{}}
        validate={handleValidation}
        onSubmit={(data) => handleOnFinish(data)}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
          <Form onSubmit={handleSubmit} className="space-y-4">
            <Title>Crear cronograma</Title>
            <InputField
              id="nombre"
              name="nombre"
              onChange={(event) => {
                handleChange(event);
              }}
              errorStyles="mt-2"
              label={'Nombre del cronograma'}
              onBlur={handleBlur}
              value={values?.nombre}
              error={errors?.nombre}
            />
            <InputField
              id="fecha_inicio"
              name="fecha_inicio"
              type="date"
              onChange={(event) => {
                handleChange(event);
              }}
              errorStyles="mt-2"
              onBlur={handleBlur}
              label={'Fecha de inicio'}
              value={values?.fecha_inicio}
              error={errors?.fecha_inicio}
            />
            <InputField
              id="fecha_fin"
              name="fecha_fin"
              type="date"
              label={'Fecha de fin'}
              onChange={(event) => {
                handleChange(event);
              }}
              errorStyles="mt-2"
              onBlur={handleBlur}
              value={values?.fecha_fin}
              error={errors?.fecha_fin}
              min={
                values?.fecha_inicio &&
                new Date(values?.fecha_inicio).toISOString().split('T')[0]
              }
            />
            <div className="flex flex-col items-end">
              <Button loading={isLoadingOnFinish} type="submit">
                Crear cronograma
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <ModalDialog
        title={'Cronograma creado exitosamente'}
        isOpen={showSuccessModal}
        onOkLabel="Ok"
        onCancelLabel="Cerrar"
        onOk={onReload}
        onCancel={() => {
          setShowSuccessModal(false);
          onReload();
        }}
        status={'success'}
      />
      <ModalDialog
        title={'Error al crear el cronograma'}
        isOpen={showErrorModal}
        onOkLabel="Ok"
        onCancelLabel="Cerrar"
        onOk={() => setShowErrorModal(false)}
        onCancel={() => setShowErrorModal(false)}
        status={'error'}
      />
    </div>
  );
}

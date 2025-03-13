import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import InputField from '@/components/ui/inputs/Input';
import CanioLavadorImage from './BobinaImage';
import { getAllMarcas } from '@/services/marcas.service';
import { obtenerDiametros } from '@/services/diametros.service';

export default function BobinaForm({
  formRef,
  handleOnSubmit = () => {},
  initialValues = {
    serie: '',
    marca_id: '',
    diametro_id: '',
    fecha_inicio: '',
    hora_inicio: '',
  },
  inputProps = {},
}) {
  const [marcas, setMarcas] = useState([]);
  const [diametros, setDiametros] = useState([]);

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const data = await getAllMarcas();
        setMarcas(data?.marcas);
      } catch (error) {
        setMarcas([]);
      }
    };

    fetchMarcas();
    return () => {
      setMarcas([]);
    };
  }, []);

  useEffect(() => {
    const fetchDiametros = async () => {
      try {
        const data = await obtenerDiametros();
        setDiametros(data?.diametros);
      } catch (error) {
        setDiametros([]);
      }
    };

    fetchDiametros();
    return () => {
      setDiametros([]);
    };
  }, []);

  const validateFields = (values) => {
    let errors = {};

    if (!values?.serie) {
      errors.serie = 'Debe ingresar el nro. de serie';
    }
    if (!values?.marca_id) {
      errors.marca_id = 'Debe ingresar la marca';
    }
    if (!values?.diametro_id) {
      errors.diametro_id = 'Debe ingresar el diametro';
    }
    if (!values?.fecha_inicio) {
      errors.fecha_inicio = 'Debe ingresar la fecha de inicio';
    }
    if (!values?.hora_inicio) {
      errors.hora_inicio = 'Debe ingresar el horario de inicio';
    }
    return errors;
  };

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      onSubmit={(data) => handleOnSubmit(data)}
      validate={(values) => validateFields(values)}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
        <Form ref={formRef} onSubmit={handleSubmit} className="flex gap-7">
          <div className="flex flex-1 justify-end">
            <CanioLavadorImage width={380} />
          </div>
          <div className="flex flex-1 flex-1 space-y-6 gap-2">
            <div className="flex-1 space-y-6">
              <InputField
                {...inputProps}
                id="serie"
                name="serie"
                label={'Número de serie'}
                inputStyles="rounded-lg w-full px-3"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.serie}
                error={errors?.serie}
              />
              <InputField
                {...inputProps}
                id="marca_id"
                name="marca_id"
                label="Marca"
                type="select"
                inputStyles="rounded-lg w-full"
                options={[
                  { value: '', label: 'Seleccione una marca' },
                  ...marcas.map((marca) => ({
                    value: marca?.id,
                    label: marca?.nombre,
                  })),
                ]}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.marca_id}
                error={errors?.marca_id}
              />
              <InputField
                {...inputProps}
                id="diametro_id"
                name="diametro_id"
                label="Diámetro"
                type="select"
                inputStyles="rounded-lg w-full"
                options={[
                  { value: '', label: 'Seleccione un diámetro' },
                  ...diametros.map((diametro) => ({
                    value: diametro?.id,
                    label: diametro?.pulgadas,
                  })),
                ]}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.diametro_id}
                error={errors?.diametro_id}
              />
              <InputField
                {...inputProps}
                id={'fecha_inicio'}
                name={'fecha_inicio'}
                label="Fecha de inicio"
                type="date"
                inputStyles="rounded-lg w-full px-3"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.fecha_inicio}
                error={errors?.fecha_inicio}
              />
              <InputField
                {...inputProps}
                id={'hora_inicio'}
                name={'hora_inicio'}
                label="Hora de inicio"
                type="time"
                inputStyles="rounded-lg w-full px-3"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.hora_inicio}
                error={errors?.hora_inicio}
              />
            </div>
            <div className="flex-1">
              <div className="flex gap-2 mt-[8.5rem]">
                <InputField
                  disabled
                  label={'Metros de cable total'}
                  inputStyles="rounded-lg w-full px-3"
                  value={
                    values?.diametro_id
                      ? diametros?.find(
                          (diametro) => diametro?.id == values?.diametro_id
                        )?.metros_cable
                      : ''
                  }
                />
                <InputField
                  disabled
                  label={'Metros de despliegue'}
                  inputStyles="rounded-lg w-full px-3"
                  value={
                    values?.diametro_id
                      ? diametros?.find(
                          (diametro) => diametro?.id == values?.diametro_id
                        )?.metros_despliegue
                      : ''
                  }
                />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

'use client';
import { Formik, Form } from 'formik';
import { useRef, useState, useEffect } from 'react';

import Button from '@/components/ui/buttons/Button';
import InputField from '@/components/ui/inputs/Input';
import ModalDialog from '@/components/ui/modal/ModalDialog';

import { FechaInputPlanPozo, PozosInputs } from './PlanPozoInputs';
import { createPlanPozo } from '@/services/planesPozo.services';
import { obtenerLocacionesDisponibles } from '@/services/locaciones.service';

import { CANTIDAD_DE_POZOS_OPCIONES, FASES_POZO } from '@/constants';
import { useRefreshStore } from '@/store/refresh.store';

const initialValues = {
  perforador_locacion_id: '',
  fecha_fin_date: '',
  fecha_fin_time: '',
  fecha_inicio_date: '',
  fecha_inicio_time: '',
  cantidad_pozos: 3,
  pozo1: '3',
  pozo2: '3',
  pozo3: '3',
  pozo4: '3',
  pozo5: '3',
  pozo6: '3',
  pozo7: '3',
  pozo8: '3',
};

export default function CreatePlanPozo({
  reloadData = async () => {},
  perforadorId = '',
  locacionesPerforador = [],
}) {
  const formRef = useRef(null);

  const { triggerRefresh } = useRefreshStore();
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [cantidadPozos, setCantidadPozos] = useState(
    initialValues.cantidad_pozos
  );
  const [locaciones, setLocaciones] = useState([]);

  useEffect(() => {
    fetchAvailablesLocations();
    return () => {
      setLocaciones([]);
    };
  }, []);

  const fetchAvailablesLocations = async () => {
    try {
      const data = await obtenerLocacionesDisponibles();
      setLocaciones(data);
    } catch (error) {
      setLocaciones([]);
    }
  };

  const getTipoEtapaPozo = (index, phases) => {
    const fase = FASES_POZO?.[index]?.id;
    if (phases === 3 && index === 2) {
      return FASES_POZO?.[FASES_POZO?.length - 1]?.id;
    }
    return fase;
  };

  const handleOnSubmit = async (data) => {
    setIsLoadingBtn(true);
    try {
      const {
        cantidad_pozos,
        fecha_fin_time,
        fecha_inicio_time,
        fecha_fin_date,
        fecha_inicio_date,
        nombre,
        ...rest
      } = data;
      const fechaFin = new Date(`${fecha_fin_date}T${fecha_fin_time}:00`);
      const fechaInicio = new Date(
        `${fecha_inicio_date}T${fecha_inicio_time}:00`
      );

      const pozos = Array.from({ length: parseInt(cantidad_pozos) }, (_, i) => {
        const cantidadEstados = rest?.[`pozo${i + 1}`];
        if (!cantidadEstados) return;
        const estadosPozo = Array.from(
          { length: parseInt(cantidadEstados) },
          (_, i) => ({
            tipo_etapa_pozo_id: getTipoEtapaPozo(i, parseInt(cantidadEstados)),
          })
        );

        return {
          etapas_pozo: estadosPozo,
        };
      });

      const payload = {
        nombre,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        locacion_id: data?.locacion_id,
        perforador_id: perforadorId,
        pozos,
      };

      await createPlanPozo(payload);
      setShowModalSuccess(true);
    } catch (error) {
      setShowModalError(true);
      setError(error.message);
    } finally {
      setIsLoadingBtn(false);
    }
  };

  const validateFields = (values) => {
    let errors = {};

    if (!values?.fecha_fin_date) {
      errors.fecha_fin_date = 'fecha fin requerida';
    }
    if (!values?.fecha_fin_time) {
      errors.fecha_fin_time = 'horario de fin requerido';
    }
    if (!values?.fecha_inicio_date) {
      errors.fecha_inicio_date = 'fecha inicio requerida';
    }
    if (!values?.fecha_inicio_time) {
      errors.fecha_inicio_time = 'horario de inicio requerido';
    }
    if (!values?.locacion_id) {
      errors.locacion_id = 'Debe seleccionar una locación';
    }
    return errors;
  };

  const handleOnFinish = () => {
    triggerRefresh();
    reloadData();
  };

  return (
    <div className="p-6">
      <div className="text-center mb-5">
        <h1 className="text-base font-semibold">
          Este perforador aún no posee ningún plan de pozo.
        </h1>
        <h2 className="text-base font-light">
          En esta instancia previa se solicita que se indiquen los siguiente
          datos:
        </h2>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(data) => handleOnSubmit(data)}
        innerRef={formRef}
        validate={validateFields}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="col-span-2 flex gap-4">
                <div className="flex-1 min-w-0">
                  <label className="block font-medium text-sm">Inicio</label>
                  <FechaInputPlanPozo
                    inputDateName="fecha_inicio_date"
                    inputTimeName="fecha_inicio_time"
                    errors={errors}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <div className="mt-7">
                    <InputField
                      id="cantidad_pozos"
                      name="cantidad_pozos"
                      type="select"
                      label="Cantidad de pozos previstos"
                      disabled={false}
                      inputStyles="bg-dark text-yellow-400 rounded-lg w-full"
                      options={CANTIDAD_DE_POZOS_OPCIONES}
                      onChange={(event) => {
                        const value = event?.target?.value;
                        if (isNaN(value)) return;
                        setCantidadPozos(parseInt(value));
                        handleChange(event);
                      }}
                      onBlur={handleBlur}
                      value={values.cantidad_pozos}
                      error={errors?.cantidad_pozos}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block font-medium text-sm">Fin</label>
                  <FechaInputPlanPozo
                    inputDateName="fecha_fin_date"
                    inputTimeName="fecha_fin_time"
                    errors={errors}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </div>
              </div>

              <div className="col-span-2 space-y-4">
                <div className="flex gap-4">
                  <InputField
                    id="locacion_id"
                    name="locacion_id"
                    type="select"
                    label="Locación"
                    inputStyles="bg-dark text-yellow-400 rounded-lg w-full"
                    options={[
                      { value: '', label: 'Seleccione una locación' },
                      ...locaciones.map((locacion) => ({
                        value: locacion?.id,
                        label: locacion.nombre,
                      })),
                    ]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.locacion_id}
                    error={errors?.locacion_id}
                  />
                </div>
                <div>
                  <label className="block mb-2 font-light text-sm">
                    Cantidad de Fases por Pozo Previstas
                  </label>
                  <PozosInputs
                    cantidadPozos={cantidadPozos}
                    errors={errors}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div className="text-center mt-10">
        <p>¿Desea crear un nuevo plan con estos datos?</p>
        <div className="flex justify-center mt-4">
          <Button
            loading={isLoadingBtn}
            onClick={() => formRef.current?.submitForm()}
            className="rounded-xl"
          >
            comenzar plan de pozo
          </Button>
        </div>
      </div>
      <ModalDialog
        title={'Plan de pozo creado exitosamente'}
        isOpen={showModalSuccess}
        onOkLabel="Ok"
        onCancelLabel="Cerrar"
        onOk={() => handleOnFinish()}
        onCancel={() => handleOnFinish()}
        status={'success'}
      />
      <ModalDialog
        title={error || 'Ocurrio un error al crear el plan de pozo.'}
        isOpen={showModalError}
        onOkLabel="Ok"
        onCancelLabel="Cerrar"
        onOk={() => setShowModalError(false)}
        onCancel={() => setShowModalError(false)}
        status={'error'}
      />
    </div>
  );
}

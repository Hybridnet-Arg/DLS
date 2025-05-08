import clsx from 'clsx';
import { Loader } from 'lucide-react';
import { Form, Formik } from 'formik';
import { Fragment, useEffect, useRef, useState } from 'react';
import {
  crearTubularMovimiento,
  obtenerTubularesTalleres,
} from '@/services/tubularesMovimientos.service';
import {
  obtenerTubularesRangos,
  obtenerTubularesTiposBarra,
  obtenerTubularesTiposConexion,
} from '@/services/tubularesAdquisiciones.service';
import {
  DESTINOS_TUBULARES,
  ESTADOS_BARRA_TUBULARES,
  ESTADOS_MOVIMIENTOS_TUBULARES,
} from '@/constants';
import InputField from '@/components/ui/inputs/Input';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import {
  DescarteRefIcon,
  OperativasRefIcon,
  ReparacionRefIcon,
} from '../icons/referencias';
import { getAllPerforadores } from '@/services/perforadores.services';
import usePerforadoresStore from '@/store/perforadores.store';

export default function CrearMovimientoTubularModal({
  isOpen,
  initialValues = {},
  tubular,
  tubularesMovimiento,
  destinos = [],
  onRefresh = async () => {},
  ...modalProps
}) {
  const formikRef = useRef();

  const { perforadorSeleccionado } = usePerforadoresStore();

  const [rangos, setRangos] = useState([]);
  const [talleres, setTalleres] = useState([]);
  const [tiposBarra, setTiposBarra] = useState([]);
  const [tiposConexion, setTiposConexion] = useState([]);
  const [perforadores, setPerforadores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [rango, setRango] = useState({});
  const [estadoBarra, setEstadoBarra] = useState('');
  const [tipoBarra, setTipoBarra] = useState({});
  const [tipoConexion, setTipoConexion] = useState({});

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [
          rangosRaw,
          tiposBarraRaw,
          tiposConexionRaw,
          talleresRaw,
          perforadoresRaw,
        ] = await Promise.all([
          obtenerTubularesRangos(),
          obtenerTubularesTiposBarra(),
          obtenerTubularesTiposConexion(),
          obtenerTubularesTalleres(),
          getAllPerforadores({ not_null_tubulares_movimientos: true }),
        ]);

        const perforadores =
          perforadoresRaw?.perforadores?.length > 0
            ? perforadoresRaw?.perforadores?.filter(
                (perforador) =>
                  perforador.numero !==
                    Number(perforadorSeleccionado?.idPerforador) &&
                  perforador.nombre !== perforadorSeleccionado?.nombre
              )
            : [];

        setRangos(rangosRaw);
        setTiposBarra(tiposBarraRaw);
        setTiposConexion(tiposConexionRaw);
        setTalleres(talleresRaw);
        setPerforadores(perforadores);
      } catch (error) {
        alert('Error al cargar los datos');
      } finally {
        setIsLoading(false);
      }
    }
    isOpen && fetchData();
    if (!isOpen) {
      setRango({});
      setEstadoBarra('');
      setTipoBarra({});
      setTipoConexion({});
    }
  }, [isOpen]);

  async function handleValidation(values) {
    const errors = {};

    if (!values?.cantidad) {
      errors.cantidad = 'Ingresa una cantidad';
    }
    if (values?.cantidad && values?.cantidad <= 0) {
      errors.cantidad = 'La cantidad debe ser mayor a 0';
    }
    if (values?.cantidad && values?.cantidad > initialValues?.disponible) {
      errors.cantidad = 'La cantidad debe ser menor a la disponible';
    }
    if (!values?.tubulares_destino_id) {
      errors.tubulares_destino_id = 'El destino es requerido';
    }
    if (!tipoBarra?.id) {
      errors.tubulares_tipo_barra_id = 'Elige un tipo de barra';
    }
    if (!tipoConexion?.id) {
      errors.tubulares_tipo_conexion_id = 'Elige un tipo de conexión';
    }
    if (!rango?.id) {
      errors.tubulares_rango_id = 'Elige un rango';
    }
    if (!estadoBarra) {
      errors.estadoBarra = 'El estado barra es requerido';
    }
    if (
      values?.tubulares_destino_id ===
        DESTINOS_TUBULARES.OTRO_PERFORADOR.toString() &&
      !values?.otro_perforador_id
    ) {
      errors.otro_perforador_id = 'El perforador es requerido';
    }
    if (
      values?.tubulares_destino_id === DESTINOS_TUBULARES.TALLER.toString() &&
      !values?.tubulares_taller_id
    ) {
      errors.tubulares_taller_id = 'El taller es requerido';
    }

    return errors;
  }

  async function handleSubmit(values) {
    setIsSubmitLoading(true);
    try {
      const payload = {
        cantidad: values?.cantidad,
        tubular_id: tubular?.id,
        tubulares_destino_id: values?.tubulares_destino_id,
        tubulares_taller_id: values?.tubulares_taller_id,
        tubulares_movimiento_origen_id: tubularesMovimiento?.id,
        tubulares_estado_barra_id: estadoBarra && parseInt(estadoBarra),
        tubulares_rango_id: rango?.id,
        tubulares_tipo_barra_id: tipoBarra?.id,
        tubulares_tipo_conexion_id: tipoConexion?.id,
        estado: ESTADOS_MOVIMIENTOS_TUBULARES.DOCUMENTACION_PENDIENTE,
      };
      if (values?.otro_perforador_id) {
        payload.otro_perforador_id = values?.otro_perforador_id;
      }

      await crearTubularMovimiento(payload);
      await onRefresh();
    } catch (error) {
      setErrorMessage(error?.response?.data?.error?.message);
      setShowErrorModal(true);
    } finally {
      setIsSubmitLoading(false);
    }
  }

  function OptionalInput({ values, errors }) {
    switch (values?.tubulares_destino_id) {
      case DESTINOS_TUBULARES.TALLER.toString():
        return (
          <InputField
            id={'tubulares_taller_id'}
            name={'tubulares_taller_id'}
            type="select"
            options={[
              { value: '', label: 'Selecciona un taller' },
              ...talleres.map((taller) => ({
                value: taller?.id,
                label: taller?.nombre,
              })),
            ]}
            error={errors?.tubulares_taller_id}
            value={values?.tubulares_taller_id}
            labelStyles="font-light text-sm"
            label="Nombre"
            inputStyles="text-[8px] bg-white shadow py-2 px-2 text-sm"
          />
        );
      case DESTINOS_TUBULARES.OTRO_PERFORADOR.toString():
        return (
          <InputField
            id={'otro_perforador_id'}
            name={'otro_perforador_id'}
            type="select"
            options={[
              { value: '', label: 'Selecciona un perforador' },
              ...(perforadores?.length > 0
                ? perforadores?.map((perforadores) => ({
                    value: perforadores?.id,
                    label: perforadores?.nombre,
                  }))
                : []),
            ]}
            error={errors?.otro_perforador_id}
            value={values?.otro_perforador_id}
            labelStyles="font-light text-sm"
            label="Nombre"
            inputStyles="text-[8px] bg-white shadow py-2 px-2 text-sm"
          />
        );
      default:
        return (
          <InputField
            id={'nombre'}
            name={'nombre'}
            disabled
            error={errors?.nombre}
            value={values?.nombre}
            labelStyles="font-light text-gray-400 cursor-not-allowed text-sm"
            label="Nombre"
            inputStyles="text-[8px] bg-white shadow py-2 px-2 text-sm"
          />
        );
    }
  }

  return (
    <Fragment>
      <ModalDialog
        isOpen={isOpen}
        {...modalProps}
        containerStyles="max-w-7xl"
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
          {({ values, errors, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h1 className="font-medium text-lg mb-1">
                  Movimiento de tubulares
                </h1>
                <p className="text-xs">Caracteristicas de tubulares</p>
              </div>
              <div className="flex gap-2">
                <div
                  id="radio-buttons"
                  className="flex flex-col border rounded border-backgroundGray shadow-md p-2 space-y-2"
                >
                  {isLoading ? (
                    <Loader
                      size={50}
                      className="animate-spin text-dark w-60 my-auto"
                    />
                  ) : (
                    <Fragment>
                      <div className="flex flex-1 gap-2">
                        <div className="flex-1">
                          <h2 className="text-sm font-semibold">
                            TIPO DE BARRA
                          </h2>
                          {tiposBarra?.map((item) => (
                            <div key={item?.id} className="text-sm">
                              <input
                                type="radio"
                                id="tubulares_tipo_barra_id"
                                checked={tipoBarra?.id === item?.id}
                                className="form-checkbox h-3 w-4 text-warning cursor-pointer"
                                onChange={(event) => {
                                  handleChange(event);
                                  setTipoBarra(item);
                                }}
                              />
                              {item?.nombre}
                            </div>
                          ))}
                          <p className="text-red-500 text-sm">
                            {errors?.tubulares_tipo_barra_id}
                          </p>
                        </div>
                        <div className="flex-1">
                          <h2 className="text-sm font-semibold">
                            TIPO DE CONEXION
                          </h2>
                          {tiposConexion?.map((item) => (
                            <div key={item?.id} className="text-sm">
                              <input
                                type="radio"
                                checked={tipoConexion?.id === item?.id}
                                id="tubulares_tipo_conexion_id"
                                className="form-checkbox h-3 w-4 text-warning cursor-pointer"
                                onChange={(event) => {
                                  handleChange(event);
                                  setTipoConexion(item);
                                }}
                              />
                              {item?.nombre}
                            </div>
                          ))}
                          <p className="text-red-500 text-sm">
                            {errors?.tubulares_tipo_conexion_id}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 gap-2">
                        <div className="flex-1">
                          <h2 className="text-sm font-semibold">RANGO</h2>
                          {rangos?.map((item) => (
                            <div key={item?.id} className="text-sm">
                              <input
                                type="radio"
                                id="tubulares_rango_id"
                                checked={rango?.id === item?.id}
                                className="form-checkbox h-3 w-4 text-warning cursor-pointer"
                                onChange={(event) => {
                                  handleChange(event);
                                  setRango(item);
                                }}
                              />
                              {item?.nombre}
                            </div>
                          ))}
                          <p className="text-red-500 text-sm">
                            {errors?.tubulares_rango_id}
                          </p>
                        </div>
                        <div className="flex flex-col flex-1 justify-end">
                          <h2 className="text-xs uppercase">
                            Estado de las barras
                          </h2>
                          <div className="flex gap-3 mt-2">
                            <button
                              type="button"
                              onClick={() =>
                                setEstadoBarra(
                                  ESTADOS_BARRA_TUBULARES.OPERATIVAS
                                )
                              }
                            >
                              <OperativasRefIcon width={24} height={24} />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setEstadoBarra(
                                  ESTADOS_BARRA_TUBULARES.INSPECCION
                                )
                              }
                            >
                              <ReparacionRefIcon width={24} height={24} />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setEstadoBarra(ESTADOS_BARRA_TUBULARES.DESCARTE)
                              }
                            >
                              {' '}
                              <DescarteRefIcon width={24} height={24} />
                            </button>
                          </div>
                          <p className="text-red-500 text-sm">
                            {errors?.estadoBarra}
                          </p>
                        </div>
                      </div>
                    </Fragment>
                  )}
                </div>
                <div className="space-y-2" id="cantidades">
                  <InputField
                    id={'disponible'}
                    name={'disponible'}
                    type="number"
                    error={errors?.disponible}
                    disabled
                    value={
                      Number(values?.disponible ?? 0) -
                      Number(values?.cantidad ?? 0)
                    }
                    labelStyles="font-light text-sm"
                    label="Disponible"
                    inputStyles="text-[8px] bg-dark text-white shadow py-2 px-2 text-lg font-semibold"
                  />
                  <InputField
                    id={'cantidad'}
                    name={'cantidad'}
                    type="number"
                    error={errors?.cantidad}
                    value={values?.cantidad}
                    min={1}
                    max={Number(values?.disponible ?? 0)}
                    onKeyDown={(e) => {
                      if (e.key === '.' || e.key === ',') {
                        e.preventDefault();
                      }
                    }}
                    labelStyles="font-light text-sm"
                    label="Cantidad a enviar"
                    inputStyles={clsx(
                      'text-[8px]  shadow py-2 px-2 text-lg font-semibold',
                      {
                        'bg-success text-white':
                          estadoBarra === ESTADOS_BARRA_TUBULARES.OPERATIVAS,
                        'bg-warning text-dark':
                          estadoBarra === ESTADOS_BARRA_TUBULARES.INSPECCION,
                        'bg-danger text-white':
                          estadoBarra === ESTADOS_BARRA_TUBULARES.DESCARTE,
                        'bg-white text-dark': !estadoBarra,
                      }
                    )}
                  />
                  <InputField
                    id={'tubulares_destino_id'}
                    name={'tubulares_destino_id'}
                    type="select"
                    options={[
                      { value: '', label: 'Selecciona un destino' },
                      ...destinos
                        ?.filter(
                          (destino) =>
                            destino?.id !== DESTINOS_TUBULARES.LOCACION
                        )
                        ?.map((destino) => ({
                          value: destino?.id,
                          label: destino?.nombre,
                        })),
                    ]}
                    error={errors?.tubulares_destino_id}
                    value={values?.tubulares_destino_id}
                    labelStyles="font-light text-sm"
                    label="Destino"
                    inputStyles="text-[8px] bg-white shadow py-2 px-2 text-sm"
                  />
                  <OptionalInput errors={errors} values={values} />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </ModalDialog>
      <ModalDialog
        isOpen={showErrorModal}
        onCancel={() => setShowErrorModal(false)}
        onOk={() => setShowErrorModal(false)}
        title={
          errorMessage ||
          'Hubo un error al crear el movimiento, intente nuevamente.'
        }
        status={'error'}
      />
    </Fragment>
  );
}

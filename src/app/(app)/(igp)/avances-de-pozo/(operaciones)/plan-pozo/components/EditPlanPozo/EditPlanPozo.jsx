'use client';
import { Form, Formik } from 'formik';
import { Fragment, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  updatePlanPozo,
  finalizarPlanPozo,
} from '@/services/planesPozo.services';
import {
  FASE_AISLACION,
  FASE_INTERMEDIA_SECUNDARIA,
  LOCALE_TIME,
  DATE_FORMATS,
} from '@/constants';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import { obtenerEtapaPorCampo } from '../../../(avance-de-pozo)/helpers/etapasPozos.helper';
import LabelFases from './LabelFases';
import EtapaPozoInput from './EtapaPozoInput';
import Title from '@/components/ui/labels/Title';
import Button from '@/components/ui/buttons/Button';
import InputField from '@/components/ui/inputs/Input';

function PlanPozoItemDesc({ title = '', value = '' }) {
  return (
    <div className="mb-3">
      <h2 className="text-start text-sm mb-2 font-medium">{title}</h2>
      <div className="bg-dark text-yellow-400 py-2 rounded-lg flex-row justify-center items-end text-sm tracking-[0.3rem]">
        <h2 className="text-start text-sm px-4">{value}</h2>
      </div>
    </div>
  );
}
function PlanPozoFecha({ title, date }) {
  return (
    <div className="mt-2 font-semibold">
      <h2 className="mb-4 text-center text-xs uppercase">{title ?? '-'}</h2>
      <div className="bg-gray-300 p-3 my-[0.1rem] rounded-md">
        <p
          className={`text-[13px] text-center font-extralight py-[1px] ${!date ? 'opacity-50' : ''}`}
        >
          {date
            ? new Date(date).toLocaleDateString(
                LOCALE_TIME,
                DATE_FORMATS.DD_MM_YYYY
              )
            : 'DD/MM/AAAA'}
        </p>
        <p
          className={`text-xs text-center font-medium ${!date ? 'opacity-50' : ''}`}
        >
          {date
            ? new Date(date).toLocaleTimeString(LOCALE_TIME, DATE_FORMATS.HH_MM)
            : '00:00'}{' '}
          hs
        </p>
      </div>
    </div>
  );
}

export default function EditPlanPozo({ planPozo = {} }) {
  const scrollRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFinishWellPlan, setIsLoadingFinishWellPlan] = useState(false);

  const [showModalError, setShowModalError] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalErrorFinishWellPlan, setShowModalErrorFinishWellPlan] =
    useState(false);
  const [showModalSuccessFinishWellPlan, setShowModalSuccessFinishWellPlan] =
    useState(false);

  const etapasPozo = planPozo?.pozos?.map(
    (pozo) => pozo?.etapas_pozo?.length ?? []
  );

  const maxEtapas = etapasPozo?.length > 0 ? Math?.max(...etapasPozo) : 0;

  const initialValues = {
    pozos: planPozo?.pozos?.map((pozo) => ({
      nombre: pozo?.nombre ?? '',
      fecha_inicio: pozo?.fecha_inicio
        ? new Date(pozo?.fecha_inicio).toISOString().split('T')[0]
        : '',
      fecha_fin: pozo?.fecha_fin
        ? new Date(pozo?.fecha_fin).toISOString().split('T')[0]
        : '',
      id: pozo?.id,
    })),
    etapasPozo: planPozo?.pozos?.map((pozo) => pozo?.etapas_pozo ?? []),
  };

  const handleValidation = (values) => {
    const errors = {};
    errors.pozos = [];

    values.pozos.forEach((pozo, index) => {
      if (!pozo.nombre) {
        errors.pozos[index] = { nombre: 'El nombre del pozo es requerido' };
      }
      // if (!pozo?.fecha_inicio) {
      //   errors.pozos[index] = {
      //     ...errors.pozos[index],
      //     fecha_inicio: 'requerido',
      //   };
      // }
      // if (!pozo?.fecha_fin) {
      //   errors.pozos[index] = {
      //     ...errors.pozos[index],
      //     fecha_fin: 'requerido',
      //   };
      // }
    });
    values.etapasPozo.forEach((etapas, indexPozo) => {
      etapas.forEach((etapa, indexEtapa) => {
        const etapaErrors = {};
        const profundidad = {
          desde: !isNaN(parseFloat(etapa?.profundidad_desde))
            ? parseFloat(etapa?.profundidad_desde)
            : null,
          hasta: !isNaN(parseFloat(etapa?.profundidad_hasta))
            ? parseFloat(etapa?.profundidad_hasta)
            : null,
        };
        if (profundidad.desde !== 0 && !profundidad.desde) {
          etapaErrors.profundidad_desde = 'Prof. desde es requerida';
        }
        if (!profundidad.hasta) {
          etapaErrors.profundidad_hasta = 'Prof. hasta es requerida';
        }
        if (profundidad.hasta <= profundidad.desde) {
          etapaErrors.profundidad_hasta = 'Prof. debe ser valida';
        }
        if (!etapa?.casing) {
          etapaErrors.casing = 'Casing es requerido';
        }

        if (etapa?.tipo_etapa_pozo_id === 2) {
          const profundidadIntermedia =
            etapas &&
            obtenerEtapaPorCampo({
              field: 'profundidad_hasta',
              property: 'id',
              value: 1,
              etapasPozo: etapas,
            });
          if (
            profundidadIntermedia &&
            profundidad.desde != profundidadIntermedia
          ) {
            etapaErrors.profundidad_desde = 'Prof. debe ser valida';
          }
        }

        if (etapa?.tipo_etapa_pozo_id === 3) {
          const profundidadIntermedia =
            etapas &&
            obtenerEtapaPorCampo({
              field: 'profundidad_hasta',
              property: 'id',
              value: 2,
              etapasPozo: etapas,
            });
          if (
            profundidadIntermedia &&
            profundidad.desde != profundidadIntermedia
          ) {
            etapaErrors.profundidad_desde = 'Prof. debe ser valida';
          }
        }

        if (etapa?.tipo_etapa_pozo_id === FASE_AISLACION) {
          const profundidadIntermedia =
            etapas &&
            obtenerEtapaPorCampo({
              field: 'profundidad_hasta',
              property: 'id',
              value: 3,
              etapasPozo: etapas,
            });
          if (
            profundidadIntermedia &&
            profundidad.desde != profundidadIntermedia
          ) {
            etapaErrors.profundidad_desde = 'Prof. debe ser valida';
          }
        }

        const duracion = parseInt(etapa?.duracion);
        if (isNaN(duracion) || duracion < 0 || duracion > 60) {
          etapaErrors.duracion = 'La duración debe ser entre 0 y 60';
        }

        if (Object.keys(etapaErrors).length > 0) {
          if (!errors.etapasPozo) errors.etapasPozo = [];
          if (!errors.etapasPozo[indexPozo]) errors.etapasPozo[indexPozo] = [];
          errors.etapasPozo[indexPozo][indexEtapa] = etapaErrors;
        }
      });
    });

    if (!errors?.pozos || errors?.pozos?.length === 0) {
      delete errors.pozos;
    }

    return errors;
  };
  const handleOnFinish = async (data) => {
    setIsLoading(true);
    try {
      const payload = data?.pozos?.map((pozo, index) => ({
        id: pozo?.id,
        nombre: pozo?.nombre,
        // fecha_inicio: pozo?.fecha_inicio && new Date(pozo?.fecha_inicio),
        // fecha_fin: pozo?.fecha_fin && new Date(pozo?.fecha_fin),
        etapas_pozo: data?.etapasPozo[index],
      }));

      await updatePlanPozo(planPozo?.id, { pozos: payload });
      setShowModalSuccess(true);
    } catch (error) {
      setShowModalError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -200,
      behavior: 'smooth',
    });
  };

  const handleScrollRight = () => {
    scrollRef.current.scrollBy({
      left: 200,
      behavior: 'smooth',
    });
  };

  const handleOnFinishPlanPozo = async () => {
    setIsLoadingFinishWellPlan(true);
    try {
      await finalizarPlanPozo({ plan_pozo_id: planPozo?.id });
      setShowModalSuccessFinishWellPlan(true);
      window.location.reload();
    } catch (error) {
      setShowModalErrorFinishWellPlan(true);
    } finally {
      setIsLoadingFinishWellPlan(false);
      setShowModalConfirm(false);
    }
  };

  return (
    <div>
      <Title containerStyles="px-5 pt-5 pb-2">
        {planPozo?.actualizado_el !== planPozo?.creado_el
          ? 'Plan de pozo cargado'
          : 'Cargar datos del plan de pozo'}
      </Title>
      <Formik
        initialValues={initialValues}
        validate={handleValidation}
        onSubmit={(data) => handleOnFinish(data)}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit} className="flex">
            <div className="flex flex-[1.5] px-5 pt-8 relative max-w-3xl 2xl:max-w-4xl">
              <div
                className="whitespace-nowrap rounded-md overflow-x-auto flex gap-5"
                ref={scrollRef}
              >
                {planPozo?.pozos?.map((pozo, index) => (
                  <div key={pozo?.id}>
                    <div className="flex flex-col mb-6">
                      <InputField
                        id={`pozos.${index}.nombre`}
                        name={`pozos.${index}.nombre`}
                        label={
                          planPozo?.creado_el === planPozo?.actualizado_el &&
                          `Nombre pozo ${index + 1}`
                        }
                        error={errors?.pozos?.[index]?.nombre}
                        inputStyles="w-full bg-dark text-yellow-400 px-2 shadow"
                      />
                      {/* <div className="flex items-center my-2">
                    <InputField
                      id={`pozos.${index}.fecha_inicio`}
                      name={`pozos.${index}.fecha_inicio`}
                      type="date"
                      error={errors?.pozos?.[index]?.fecha_inicio}
                      inputStyles="text-[8px] bg-backgroundGray shadow"
                    />
                    <ChevronRight size={15} />
                    <InputField
                      id={`pozos.${index}.fecha_fin`}
                      name={`pozos.${index}.fecha_fin`}
                      type="date"
                      error={errors?.pozos?.[index]?.fecha_fin}
                      inputStyles="text-[8px] bg-backgroundGray shadow"
                    />
                  </div> */}
                    </div>
                    {pozo?.etapas_pozo?.map((etapa, etapaIndex) => {
                      const esAislacion =
                        pozo?.etapas_pozo?.length ===
                          FASE_INTERMEDIA_SECUNDARIA &&
                        maxEtapas === FASE_AISLACION &&
                        etapaIndex === FASE_INTERMEDIA_SECUNDARIA - 1;

                      const ultimaEtapa =
                        pozo?.etapas_pozo?.[pozo?.etapas_pozo?.length - 1]?.id;

                      return (
                        <Fragment key={etapa?.id}>
                          {esAislacion && (
                            <div className="py-4 flex flex-col rounded-lg w-60 h-[10.9rem]"></div>
                          )}
                          <EtapaPozoInput
                            numeroEtapa={etapaIndex + 1}
                            namePrefix={`etapasPozo.${index}.${etapaIndex}`}
                            nextNamePrefix={
                              ultimaEtapa !== etapa?.id &&
                              `etapasPozo.${index}.${etapaIndex + 1}`
                            }
                            etapas_pozo={pozo?.etapas_pozo}
                          />
                        </Fragment>
                      );
                    })}
                  </div>
                ))}
              </div>
              {planPozo?.pozos?.length < 3 && (
                <LabelFases className={'ms-10'} maxEtapas={maxEtapas} />
              )}
              {planPozo?.pozos?.length > 3 && (
                <Fragment>
                  <div className="absolute inset-y-0 left-0 flex items-center justify-center">
                    <button
                      type="button"
                      className="bg-yellow-400 hover:opacity-90 rounded-full p-2"
                      onClick={() => handleScrollLeft()}
                    >
                      <ChevronLeft className="text-dark" />
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center justify-center">
                    <button
                      type="button"
                      className="bg-yellow-400 hover:opacity-90 rounded-full p-2"
                      onClick={() => handleScrollRight()}
                    >
                      <ChevronRight className="text-dark" />
                    </button>
                  </div>
                </Fragment>
              )}
            </div>
            {planPozo?.pozos?.length >= 3 && (
              <LabelFases maxEtapas={maxEtapas} />
            )}
            <div className="flex flex-[0.37] flex-col justify-between mb-10 pe-5">
              <div>
                <PlanPozoItemDesc
                  title="Locación"
                  value={planPozo?.perforador_locacion?.locacion?.nombre ?? '-'}
                />
              </div>
              <div className="flex">
                <div className="w-[40%]"></div>
                <div className="w-[60%]">
                  <h2 className="text-center text-sm font-semibold text-gray-500">
                    Fecha y hora
                  </h2>
                  <PlanPozoFecha
                    date={planPozo?.fecha_inicio}
                    title={'Inicio'}
                  />
                  <PlanPozoFecha date={new Date()} title={'Actual'} />
                  <PlanPozoFecha date={planPozo?.fecha_fin} title={'Final'} />
                </div>
              </div>
              <div>
                <Button
                  type="button"
                  className="w-full"
                  labelStyles="text-base"
                  onClick={() => setShowModalConfirm(true)}
                  loading={isLoadingFinishWellPlan}
                >
                  finalizar plan
                </Button>
                <Button
                  type="submit"
                  className="w-full mt-3"
                  labelStyles="text-base"
                  loading={isLoading}
                >
                  {planPozo?.creado_el === planPozo?.actualizado_el
                    ? 'cargar plan'
                    : 'modificar plan'}
                </Button>
                <Button
                  className="w-full mt-3"
                  labelStyles="text-base"
                  disabled
                >
                  eliminar plan
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ModalDialog
        title={'Se ha actualizado el Plan de Pozo correctamente.'}
        isOpen={showModalSuccess}
        onCancel={() => setShowModalSuccess(false)}
        status={'success'}
        autoclose
      />
      <ModalDialog
        title={'Hubo un error al actualizar el Plan de Pozo.'}
        isOpen={showModalError}
        onCancel={() => setShowModalError(false)}
        status={'error'}
        autoclose
      />
      <ModalDialog
        title={'Se ha finalizado el Plan de Pozo correctamente.'}
        isOpen={showModalSuccessFinishWellPlan}
        onCancel={() => setShowModalSuccessFinishWellPlan(false)}
        status={'success'}
        autoclose
      />
      <ModalDialog
        title={'Hubo un error al finalizar el Plan de Pozo.'}
        isOpen={showModalErrorFinishWellPlan}
        onCancel={() => setShowModalErrorFinishWellPlan(false)}
        status={'error'}
        autoclose
      />
      <ModalDialog
        isOpen={showModalConfirm}
        onOk={() => handleOnFinishPlanPozo()}
        onCancel={() => setShowModalConfirm(false)}
      >
        <div className="flex flex-col gap-2">
          <p className="text-center font-medium">
            Ud. está FINALIZANDO el plan de pozo vigente. Asegúrese que la
            perforación de cada pozo se haya completado para poder iniciar el
            DMT del Equipo.
          </p>

          <p className="text-center font-medium">¿Desea finalizar el plan?</p>
        </div>
      </ModalDialog>
    </div>
  );
}

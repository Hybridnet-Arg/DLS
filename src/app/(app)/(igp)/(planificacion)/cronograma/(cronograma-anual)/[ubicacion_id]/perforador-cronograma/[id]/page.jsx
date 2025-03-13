'use client';
import clsx from 'clsx';
import { es } from 'date-fns/locale';
import { Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import { useParams, useRouter } from 'next/navigation';
import { CANTIDAD_DE_POZOS_OPCIONES } from '@/constants';
import { obtenerLocaciones } from '@/services/locaciones.service';
import { obtenerPerforadorCronogramaPorId } from '@/services/perforadoresCronograma.service';
import { crearLocacionPerforadorCronograma } from '@/services/locacionesPerforadorCronograma.service';
import { obtenerMesesEntreFechas } from '../../../../_helpers/meses.helper';
import Title from '@/components/ui/labels/Title';
import Button from '@/components/ui/buttons/Button';
import InputField from '@/components/ui/inputs/Input';
import ModalDialog from '@/components/ui/modal/ModalDialog';
import SkeletonCronograma from '../../../../_components/SkeletonCronograma';
import PerforadorCronograma from '../../../../_components/PerforadorCronograma';
import LocacionPerforadorCronograma from '../../../../_components/LocacionPerforadorCronograma';
import { getValidatedDate } from '@/utils/formatters/date.formatter';
import FechaCronograma from '../../../../_components/FechaCronograma';

export default function PerforadorCronogramaIdPage() {
  const router = useRouter();
  const { id, ubicacion_id } = useParams();

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [meses, setMeses] = useState([]);
  const [perforadorCronograma, setPerforadorCronograma] = useState({});
  const [cronograma, setCronograma] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [locaciones, setLocaciones] = useState([]);
  const [isLoadingOnFinish, setIsLoadingOnFinish] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    const fetchAvailablesLocations = async () => {
      try {
        const data = await obtenerLocaciones({
          ubicacion_id,
          none_locaciones_perforador_cronograma: true,
        });
        setLocaciones(data);
      } catch (error) {
        setLocaciones([]);
      }
    };

    fetchAvailablesLocations();
    return () => {
      setLocaciones([]);
    };
  }, [ubicacion_id]);

  useEffect(() => {
    const fetchCronograma = async () => {
      setIsLoading(true);
      try {
        const data = await obtenerPerforadorCronogramaPorId(id);

        const meses = obtenerMesesEntreFechas(
          data?.cronograma?.fecha_inicio,
          data?.cronograma?.fecha_fin
        );
        const totalMeses = meses?.length;

        const totalLocaciones = data?.locaciones_perforador_cronograma?.length;

        const lastLocacionPerforadorCronograma =
          totalLocaciones > 0 &&
          data?.locaciones_perforador_cronograma?.[totalLocaciones - 1];

        const getPerforadorLocaciones = (item) => {
          if (totalLocaciones < totalMeses) {
            const locacionesRestantes = totalMeses - totalLocaciones;

            const nuevosElementos = Array.from(
              { length: locacionesRestantes },
              (_, index) => ({
                id: Math.random(),
                isFirst: index === 0,
              })
            );

            return {
              ...item,
              locaciones_perforador_cronograma: [
                ...(item?.locaciones_perforador_cronograma ?? []),
                ...nuevosElementos,
              ],
            };
          }

          return item;
        };

        const startDate = lastLocacionPerforadorCronograma?.fecha_fin
          ? new Date(lastLocacionPerforadorCronograma?.fecha_fin)
          : new Date(data?.cronograma?.fecha_inicio);
        startDate.setDate(startDate.getDate() + 1);

        setRange([
          {
            startDate: startDate,
            endDate: startDate,
            key: 'selection',
          },
        ]);
        setMeses(meses);
        setPerforadorCronograma(getPerforadorLocaciones(data));
        setCronograma({
          ...data?.cronograma,
          last_locacion_perforador_cronograma: lastLocacionPerforadorCronograma,
        });
      } catch (error) {
        setCronograma({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchCronograma();
  }, [id]);

  function handleValidation(values) {
    const errors = {};

    if (!values?.locacion_id) {
      errors.locacion_id = 'La locación es requerida';
    }
    if (!values.cantidad_pozos) {
      errors.cantidad_pozos = 'La cantidad de pozos es requerida';
    }

    const dateRange = range?.[0];
    if (
      !dateRange?.startDate ||
      !dateRange?.endDate ||
      dateRange?.startDate === dateRange?.endDate
    ) {
      errors.fecha = 'La fecha es requerida';
    }

    return errors;
  }

  const handleOnFinish = async (data) => {
    try {
      setIsLoadingOnFinish(true);

      const fechaInicio = new Date(range?.[0]?.startDate).setHours(0, 0, 0, 0);
      const fechaFin = new Date(range?.[0]?.endDate).setHours(23, 59, 59, 999);
      const payload = {
        ...data,
        fecha_inicio: new Date(fechaInicio),
        fecha_fin: new Date(fechaFin),
        perforador_cronograma_id: Number(id),
      };

      await crearLocacionPerforadorCronograma(payload);
      router.push(`/cronograma/${ubicacion_id}`);
    } catch (error) {
      setShowErrorModal(true);
    } finally {
      setIsLoadingOnFinish(false);
    }
  };

  if (isLoading) return <SkeletonCronograma />;

  return (
    <div className="w-full overflow-x-auto relative">
      <div className="flex gap-2">
        <div className="py-2 px-1 me-[5.7rem]"></div>
        <FechaCronograma
          fechaFin={cronograma?.fecha_fin}
          fechaInicio={cronograma?.fecha_inicio}
          radarStyles="h-[6rem]"
          ubicacionId={ubicacion_id}
          mostrarFechaActual={false}
        />
      </div>
      <div key={perforadorCronograma?.id} className="flex flex-wrap mt-2 mb-4">
        <div className="flex-shrink-0 h-[80px]">
          <PerforadorCronograma
            nombre={perforadorCronograma?.perforador?.nombre}
            className="me-2"
            completed={perforadorCronograma?.perforador}
          />
        </div>
        {perforadorCronograma?.locaciones_perforador_cronograma?.map(
          (locacionPerforadorCronograma, index) => (
            <div
              key={index}
              className={clsx(
                'flex-1 py-2 px-1 bg-white text-center flex justify-center items-center h-[80px]',
                {
                  'rounded-s-md': index === 0,
                  'rounded-e-md': index === meses.length - 1,
                }
              )}
            >
              {locacionPerforadorCronograma?.perforador_cronograma_id ? (
                <LocacionPerforadorCronograma
                  locacionPerforadorCronograma={locacionPerforadorCronograma}
                  index={index}
                  locacionesPerforadorCronograma={
                    perforadorCronograma?.locaciones_perforador_cronograma
                  }
                  fechaInicioCronograma={cronograma?.fecha_inicio}
                  fechaFinCronograma={cronograma?.fecha_fin}
                />
              ) : (
                <></>
              )}
            </div>
          )
        )}
      </div>
      <Formik
        initialValues={{}}
        validate={handleValidation}
        onSubmit={(data) => handleOnFinish(data)}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ handleSubmit, values, errors }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-white p-2 space-y-2 rounded"
          >
            <Title>Agregar locacion</Title>
            <div className="flex gap-3 mb-10">
              <InputField
                id={'locacion_id'}
                name={'locacion_id'}
                type="select"
                options={[
                  { value: '', label: 'Selecciona una locación' },
                  ...locaciones.map((locacion) => ({
                    value: locacion?.id,
                    label: locacion?.nombre,
                  })),
                ]}
                error={errors?.locacion_id}
                value={values?.locacion_id}
                label={'Nombrar nueva locación'}
                inputStyles="text-[8px] shadow py-[0.4rem] px-2 text-sm"
              />
              <InputField
                id="cantidad_pozos"
                name="cantidad_pozos"
                type="select"
                inputStyles="text-[8px] shadow py-[0.4rem] px-2 text-sm"
                options={[
                  { value: '', label: 'Selecciona una cantidad de pozos' },
                  ...CANTIDAD_DE_POZOS_OPCIONES,
                ]}
                value={values.cantidad_pozos}
                label="Cantidad de pozos previstos"
                error={errors?.cantidad_pozos}
              />
            </div>
            <div className="flex flex-1 items-center overflow-x-auto">
              <DateRange
                ranges={range}
                onChange={(item) => {
                  setRange([item.selection]);
                }}
                minDate={
                  cronograma?.last_locacion_perforador_cronograma?.fecha_fin
                    ? getValidatedDate(
                        cronograma?.last_locacion_perforador_cronograma
                          ?.fecha_fin
                      )
                    : getValidatedDate(cronograma?.fecha_inicio)
                }
                maxDate={getValidatedDate(cronograma?.fecha_fin)}
                rangeColors={['#25303B']}
                months={12}
                direction="horizontal"
                scroll={true}
                locale={es}
                showDateDisplay={false}
              />
            </div>
            <p className="text-red-500 text-sm">{errors?.fecha ?? ''}</p>
            <div className="flex flex-col items-end">
              <Button loading={isLoadingOnFinish} type="submit">
                agregar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <ModalDialog
        title={'Error al crear la locación en el cronograma'}
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

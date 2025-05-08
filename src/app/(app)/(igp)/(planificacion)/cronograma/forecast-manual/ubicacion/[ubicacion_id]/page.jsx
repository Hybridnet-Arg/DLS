'use client';
import clsx from 'clsx';
import { useState, useEffect, Fragment, useRef } from 'react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { MESES_ES } from '@/constants/cronograma.constant';
import { obtenerCronogramas } from '@/services/cronograma.service';
import { obtenerTiposTareaForecast } from '@/services/tareasForecast.service';
import FilaTareasForecast from '../../_components/FilaTareasForecast';
import SkeletonCronograma from '../../../_components/SkeletonCronograma';
import CrearPerforadorForecast from '../../_components/modals/CrearPerforadorForecast';

const obtenerDiasDelMes = (mes, anio, diaInicio, diaFin) => {
  const currentDay = new Date();

  const dateRaw = new Date(parseInt(anio), parseInt(mes) + 1, 0);
  const diasEnMes = dateRaw.getDate();

  let diasDelMes = Array.from({ length: diasEnMes }, (_, i) => i + 1);

  if (diaInicio && diaFin) {
    diasDelMes = diasDelMes.filter(
      (dia) => dia >= parseInt(diaInicio) && dia <= parseInt(diaFin)
    );
  } else if (diaInicio) {
    diasDelMes = diasDelMes.filter((dia) => dia >= parseInt(diaInicio));
  } else if (diaFin) {
    diasDelMes = diasDelMes.filter((dia) => dia <= parseInt(diaFin));
  }

  currentDay.setHours(0, 0, 0, 0);

  const semanas = diasDelMes.reduce((acc, dia) => {
    const semana = Math.ceil(dia / 7);
    const fecha = new Date(anio, mes, dia);
    fecha.setHours(0, 0, 0, 0);

    acc[semana - 1] = acc[semana - 1] || [];
    acc[semana - 1].push({
      dia,
      fecha,
      data: {
        dia,
        fecha,
        esHoy: currentDay.toISOString() === fecha.toISOString(),
      },
    });
    return acc;
  }, []);

  return semanas;
};

export default function ForecastManualUbicacionIdPage() {
  const searchParams = useSearchParams();
  const mes = searchParams.get('mes');
  const anio = searchParams.get('anio');
  const diaFin = searchParams.get('diaFin');
  const diaInicio = searchParams.get('diaInicio');

  const { ubicacion_id } = useParams();
  const router = useRouter();

  const dayRef = useRef(null);
  const forecastRef = useRef(null);
  const [cronograma, setCronograma] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [perforadoresPorUbicacion, setPerforadoresPorUbicacion] = useState([]);
  const [tiposTareasForecast, setTiposTareasForecast] = useState([]);
  const [reload, setReload] = useState(false);
  const [semanas, setSemanas] = useState([]);
  const [expandible, setExpandible] = useState(false);
  const [expandibleLeft, setExpandibleLeft] = useState(false);
  const [futureDate, setFutureDate] = useState(null);

  const [showCreatePerforadorCronograma, setShowCreatePerforadorCronograma] =
    useState(false);

  useEffect(() => {
    if (!mes || !anio) {
      return router.push(`/cronograma/${ubicacion_id}`);
    }
    if (!ubicacion_id) {
      return router.push('/cronograma');
    }
  }, [mes, anio, ubicacion_id, router]);

  useEffect(() => {
    const fetchTiposTareasForecast = async () => {
      try {
        const tiposTareasForecast = await obtenerTiposTareaForecast();
        setTiposTareasForecast(tiposTareasForecast);
      } catch (error) {
        setTiposTareasForecast([]);
      }
    };

    fetchTiposTareasForecast();
    return () => {
      setTiposTareasForecast([]);
    };
  }, []);

  useEffect(() => {
    const fetchCronograma = async () => {
      setIsLoading(true);
      try {
        const semanas = obtenerDiasDelMes(mes, anio, diaInicio, diaFin);
        if (expandible) {
          const dateRaw = new Date(parseInt(anio), parseInt(mes) + 1, 0);
          dateRaw.setDate(dateRaw.getDate() + 10);
          const diasFuturos = obtenerDiasDelMes(
            dateRaw.getMonth(),
            dateRaw.getFullYear(),
            0,
            dateRaw.getUTCDate()
          );
          setFutureDate(new Date(dateRaw));
          semanas.push(...diasFuturos);
        }

        const fechaInicio = semanas?.[0]?.[0]?.fecha;
        const ultimaSemana = semanas?.[semanas?.length - 1];
        const fechaFin = ultimaSemana?.[ultimaSemana?.length - 1]?.fecha;

        const data = await obtenerCronogramas({
          ubicacion_id,
          include_perforadores_forecast: true,
          fecha_inicio_tarea_forecast: fechaInicio,
          fecha_fin_tarea_forecast: fechaFin,
        });

        if (data?.length === 0) {
          throw new Error('No existe un cronograma');
        }

        const cronograma = data?.[0];
        const perforadoresPorUbicacion =
          cronograma.perforadores_cronograma?.map((item) => ({
            ...item?.perforador,
            nombre: item?.perforador?.nombre,
          }));

        const diasTotales = semanas?.flat()?.length;

        const perforadoresFiltrados = perforadoresPorUbicacion.filter(
          (perf) =>
            !cronograma?.perforadores_forecast?.some(
              (item) => item?.perforador?.numero === parseInt(perf?.numero)
            )
        );

        const forecastRaw = cronograma?.perforadores_forecast ?? [];
        const perforadoresForecast = [...forecastRaw, ...perforadoresFiltrados];

        const dias = semanas.flat();
        cronograma.perforadores_forecast = perforadoresForecast.map((item) => {
          const totalTareasForecast = item?.tareas_forecast?.length || 0;
          if (totalTareasForecast === diasTotales) return item;

          const tareas_forecast = dias?.map((dia) => {
            const tareas = item?.tareas_forecast?.find(
              (tarea) =>
                new Date(tarea?.fecha).getDate() ===
                  new Date(dia?.fecha).getDate() &&
                new Date(tarea?.fecha).getMonth() ===
                  new Date(dia?.fecha).getMonth()
            );
            if (tareas) return tareas;
            return {
              id: Math.random(),
              data: dia,
            };
          });

          return {
            ...item,
            tareas_forecast,
          };
        });

        setSemanas(semanas);
        setCronograma(cronograma);
        setPerforadoresPorUbicacion(perforadoresPorUbicacion);
      } catch (error) {
        setCronograma({});
      } finally {
        setIsLoading(false);
      }
    };
    fetchCronograma();

    return () => {
      setCronograma({});
      setIsLoading(true);
      setSemanas([]);
      setPerforadoresPorUbicacion([]);
    };
  }, [
    ubicacion_id,
    reload,
    mes,
    anio,
    expandible,
    expandibleLeft,
    diaInicio,
    diaFin,
  ]);

  const onReload = () => {
    setReload((reload) => !reload);
  };

  if (isLoading) return <SkeletonCronograma />;
  return (
    <div className="w-full">
      <div className="flex">
        <div className="flex flex-col justify-between">
          <h1 className="text-sm text-center font-medium">Referencia</h1>
          <div className="flex flex-col items-center text-center text-sm bg-white w-[100px] rounded p-1">
            <h1 className="text-xs uppercase mb-1">Tarifa</h1>
            <div className="flex flex-1 w-full gap-1">
              <div className="flex-1 rounded-sm bg-[#6A5144] text-white">A</div>
              <div className="flex-1 rounded-sm bg-warning">B</div>
            </div>
          </div>
        </div>
        <button onClick={() => setExpandibleLeft((value) => !value)}>
          {expandibleLeft ? (
            <ChevronsRight size={20} />
          ) : (
            <ChevronsLeft size={20} />
          )}
        </button>
        <div className="flex-1">
          <div className="flex gap-1">
            <div
              className={clsx(
                'bg-dark text-sm text-center text-warning rounded-lg py-1 uppercase',
                {
                  'w-[75%]': expandible,
                  'w-full': !expandible,
                }
              )}
            >
              {MESES_ES?.[mes]} {anio}
            </div>
            {expandible && (
              <div
                className="bg-dark text-sm text-center text-warning rounded-lg py-1 uppercase w-[25%]"
                ref={dayRef}
              >
                {futureDate && MESES_ES?.[futureDate.getMonth()]}{' '}
                {futureDate ? futureDate.getFullYear() : anio}
              </div>
            )}
          </div>
          <div className="flex gap-1 mt-1">
            {semanas?.map((semanaRaw, semana) => {
              const daysInWeek = semanaRaw?.length;
              const flexBasis = `calc(${daysInWeek} / ${semanas.flat().length} * 100%)`;

              return (
                <button
                  onClick={() => {
                    const dias = semanaRaw;
                    const fechaInicio = dias?.[0]?.fecha;
                    const fechaFin = dias?.[dias?.length - 1]?.fecha;

                    const params = new URLSearchParams({
                      cronograma_id: cronograma?.id,
                      semana: semana + 1,
                      mes,
                      anio,
                      fechaInicio,
                      fechaFin,
                    });

                    router.push(
                      `/cronograma/planificacion-semanal/ubicacion/${ubicacion_id}?${params.toString()}`
                    );
                  }}
                  className={clsx(
                    'bg-dark uppercase text-xs text-warning text-center py-1 rounded-lg hover:opacity-80'
                  )}
                  key={`${semana}-forecast-week`}
                  style={{ flexBasis }}
                >
                  Semana {semana + 1}
                </button>
              );
            })}
          </div>
          <div className="flex flex-1 gap-1 mt-[2px]">
            {semanas?.flat()?.map((dia, indexDay) => (
              <Fragment key={`${dia?.dia}-${indexDay}-forecast-day`}>
                <div className="flex-1 bg-dark uppercase text-xs text-white text-center py-1 rounded-lg relative">
                  {dia?.dia}
                  {dia?.data?.esHoy && (
                    <div
                      className="active-radar-cronograma absolute min-h-[50vh] 2xl:min-h-[60vh]"
                      style={{
                        top: 'calc(100%)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    ></div>
                  )}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <button onClick={() => setExpandible((value) => !value)}>
          {expandible ? (
            <ChevronsLeft size={20} />
          ) : (
            <ChevronsRight size={20} />
          )}
        </button>
      </div>
      <div
        className="overflow-y-auto min-h-[50vh] 2xl:min-h-[60vh]"
        ref={forecastRef}
      >
        {cronograma?.perforadores_forecast?.map(
          (perforadorForecast, indexPerforadorForecast) => (
            <FilaTareasForecast
              key={`${perforadorForecast?.id}-${indexPerforadorForecast}-perforador-forecast`}
              perforadorForecast={perforadorForecast}
              onReload={onReload}
              dayRef={dayRef}
              expandibleDays={expandible}
              setShowCreatePerforadorCronograma={
                setShowCreatePerforadorCronograma
              }
              tiposTareasForecast={tiposTareasForecast}
            />
          )
        )}
      </div>
      <CrearPerforadorForecast
        cronograma_id={cronograma?.id}
        showModal={showCreatePerforadorCronograma}
        perforadores={perforadoresPorUbicacion ?? []}
        setShowModal={setShowCreatePerforadorCronograma}
        onFinish={() => onReload()}
      />
    </div>
  );
}

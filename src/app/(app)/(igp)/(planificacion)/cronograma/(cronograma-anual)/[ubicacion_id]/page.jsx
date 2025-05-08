'use client';
import clsx from 'clsx';
import { ChevronRight, Plus } from 'lucide-react';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PERFORADORES_POR_PROVINCIA } from '@/constants';
import usePerforadoresStore from '@/store/perforadores.store';
import { obtenerCronogramas } from '@/services/cronograma.service';
import { obtenerMesesEntreFechas } from '../../_helpers/meses.helper';
import FechaCronograma from '../../_components/FechaCronograma';
import SkeletonCronograma from '../../_components/SkeletonCronograma';
import CreateCronogramaForm from './_components/CreateCronogramaForm';
import PerforadorCronograma from '../../_components/PerforadorCronograma';
import LocacionPerforadorCronograma from '../../_components/LocacionPerforadorCronograma';
import CreatePerforadorCronogramaModal from './_components/modals/CreatePerforadorCronogramaModal';

export default function CronogramaAnualPorUbicacionId() {
  const router = useRouter();
  const containerRef = useRef(null);
  const { ubicacion_id } = useParams();
  const { perforadores } = usePerforadoresStore();

  const mesRef = useRef(null);
  const [mesWidth, setMesWidth] = useState(0);

  const [meses, setMeses] = useState([]);
  const [cronograma, setCronograma] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [anchoLocacionesContenedor, setAnchoLocacionesContenedor] = useState(0);

  const [showCreatePerforadorCronograma, setShowCreatePerforadorCronograma] =
    useState(false);

  useEffect(() => {
    function getPerforadoresPorUbicacion() {
      const provincias =
        ubicacion_id === '1'
          ? PERFORADORES_POR_PROVINCIA.NQN
          : PERFORADORES_POR_PROVINCIA.CRD;
      const perforadoresPorUbicacion = perforadores.filter((perforador) =>
        provincias.includes(perforador.idPerforador)
      );

      return perforadoresPorUbicacion;
    }

    const fetchCronograma = async () => {
      setIsLoading(true);
      try {
        const data = await obtenerCronogramas({ ubicacion_id });
        if (data?.length === 0) {
          throw new Error('No existe un cronograma');
        }

        const cronograma = data?.[0];
        const perforadoresPorUbicacion = getPerforadoresPorUbicacion();
        const meses = obtenerMesesEntreFechas(
          cronograma?.fecha_inicio,
          cronograma?.fecha_fin
        );

        const totalMeses = meses?.length;

        const perforadoresFiltrados = perforadoresPorUbicacion.filter(
          (perf) =>
            !cronograma?.perforadores_cronograma?.some(
              (item) =>
                item?.perforador?.numero === parseInt(perf?.idPerforador)
            )
        );

        const perforadoresCronograma = [
          ...cronograma?.perforadores_cronograma,
          ...perforadoresFiltrados,
        ];

        cronograma.perforadores_cronograma = perforadoresCronograma.map(
          (item) => {
            const totalLocaciones =
              item?.locaciones_perforador_cronograma?.length || 0;

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
          }
        );

        setMeses(meses);
        setCronograma(cronograma);
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
    };
  }, [ubicacion_id, perforadores, reload]);

  useEffect(() => {
    const obtenerAnchoLocacionesContenedor = () => {
      const anchoLocacionesContenedor = meses.length * 100 + 100;
      if (
        containerRef?.current?.offsetWidth > 0 &&
        containerRef?.current?.offsetWidth > anchoLocacionesContenedor
      ) {
        setAnchoLocacionesContenedor(containerRef.current.offsetWidth);
        return;
      }
      setAnchoLocacionesContenedor(meses.length * 100 + 100);
    };
    if (meses.length > 0) {
      obtenerAnchoLocacionesContenedor();
    }
  }, [meses]);

  useLayoutEffect(() => {
    if (mesRef?.current?.offsetWidth) {
      setMesWidth(mesRef.current.offsetWidth);
    }
  }, [anchoLocacionesContenedor, meses]);

  const onReload = () => {
    setReload((reload) => !reload);
  };

  if (isLoading) return <SkeletonCronograma />;
  return !cronograma?.id ? (
    <CreateCronogramaForm
      ubicacion_id={ubicacion_id}
      onReload={() => onReload()}
    />
  ) : (
    <div className="w-full overflow-x-auto relative">
      <div className="flex gap-2">
        <div className="flex items-center py-2 px-1 text-center text-sm">
          Forecast <br /> mensual xd <ChevronRight className="me-3" />
        </div>
        <FechaCronograma
          mesRef={mesRef}
          fechaFin={cronograma?.fecha_fin}
          fechaInicio={cronograma?.fecha_inicio}
          ubicacionId={ubicacion_id}
          mostrarFechaActual={true}
        />
      </div>
      <div ref={containerRef}>
        {cronograma?.perforadores_cronograma.map(
          (perforadorCronograma, indexPerforadorCronograma) => (
            <div
              key={`perforador-cronograma-${perforadorCronograma?.id}-${indexPerforadorCronograma}`}
              className="flex flex-nowrap mt-2 bg-white rounded-s-md rounded-e-md"
              style={{
                width:
                  anchoLocacionesContenedor > 0
                    ? `${anchoLocacionesContenedor}px`
                    : 'auto',
              }}
            >
              <div className="flex-shrink-0">
                <PerforadorCronograma
                  nombre={perforadorCronograma?.perforador?.nombre}
                  className="me-2"
                  completed={perforadorCronograma?.perforador}
                  handleOnPlus={() => setShowCreatePerforadorCronograma(true)}
                />
              </div>
              {perforadorCronograma?.locaciones_perforador_cronograma?.map(
                (locacionPerforadorCronograma, index) => (
                  <div
                    key={`locacion-perforador-cronograma-${locacionPerforadorCronograma?.id}-${index}`}
                    className={clsx(
                      'py-1 px-0.5 bg-white text-center flex justify-center items-center h-[80px]',
                      {
                        'rounded-s-md': index === 0,
                        'rounded-e-md': index === meses.length - 1,
                      }
                    )}
                  >
                    {locacionPerforadorCronograma?.perforador_cronograma_id ||
                    locacionPerforadorCronograma?.tipo === 'DTM' ? (
                      <LocacionPerforadorCronograma
                        locacionPerforadorCronograma={
                          locacionPerforadorCronograma
                        }
                        index={index}
                        locacionesPerforadorCronograma={
                          perforadorCronograma?.locaciones_perforador_cronograma
                        }
                        fechaInicioCronograma={cronograma?.fecha_inicio}
                        fechaFinCronograma={cronograma?.fecha_fin}
                        onRefresh={onReload}
                        mesWidth={mesWidth}
                      />
                    ) : (
                      <button
                        hidden={
                          !perforadorCronograma?.id ||
                          !locacionPerforadorCronograma?.isFirst
                        }
                        onClick={() =>
                          router.replace(
                            `/cronograma/${ubicacion_id}/perforador-cronograma/${perforadorCronograma?.id}`
                          )
                        }
                        className={clsx(
                          'bg-white shadow-dark-sm p-2 rounded-full hover:bg-dark hover:text-warning z-10'
                        )}
                      >
                        <Plus size={15} className="font-bold" />
                      </button>
                    )}
                  </div>
                )
              )}
            </div>
          )
        )}
      </div>
      <CreatePerforadorCronogramaModal
        cronograma_id={cronograma?.id}
        showModal={showCreatePerforadorCronograma}
        perforadores={
          cronograma?.perforadores_cronograma?.filter(
            (perforador) => perforador?.idPerforador
          ) ?? []
        }
        setShowModal={setShowCreatePerforadorCronograma}
        onFinish={() => onReload()}
      />
    </div>
  );
}

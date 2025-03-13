'use client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { MESES_ES } from '@/constants/cronograma.constant';
import usePerforadoresStore from '@/store/perforadores.store';
import { obtenerAreasPlanificacion } from '@/services/planificacionAreas.service';
import SkeletonCronograma from '../../../_components/SkeletonCronograma';
import PlanificacionSemanalGeneral from './_components/PlanificacionSemanalGeneral';
import PlanificacionPerforador from './_components/PlanificacionPerforador/PlanificacionPerforador';
import { obtenerPlanificaciones } from '@/services/planificaciones.service';
import AreaGeneralIcon from './_components/icons/areas/AreaGeneralIcon';
import AreaITIcon from './_components/icons/areas/AreaITIcon';
import AreaLogisticaIcon from './_components/icons/areas/AreaLogisticaIcon';
import AreaMantenimientoIcon from './_components/icons/areas/AreaMantenimientoIcon';
import AreaRRHHIcon from './_components/icons/areas/AreaRRHHIcon';
import AreaSSMACIcon from './_components/icons/areas/AreaSSMACIcon';
import AreaSupplyChainIcon from './_components/icons/areas/AreaSupplyChainIcon';
import AreaTubularesIcon from './_components/icons/areas/AreaTubularesIcon';

const areaIcons = {
  'Supply chain': <AreaSupplyChainIcon width={20} height={20} />,
  RRHH: <AreaRRHHIcon width={20} height={20} />,
  Logistica: <AreaLogisticaIcon width={20} height={20} />,
  SSMAC: <AreaSSMACIcon width={20} height={20} />,
  IT: <AreaITIcon width={20} height={20} />,
  Tubulares: <AreaTubularesIcon width={20} height={20} />,
  'Servicios Generales': <AreaGeneralIcon width={20} height={20} />,
  Mantenimiento: <AreaMantenimientoIcon width={20} height={20} />,
};

export default function PlanificacionSemanalUbicacionIdPage() {
  const searchParams = useSearchParams();

  const mes = searchParams.get('mes');
  const anio = searchParams.get('anio');
  const semana = searchParams.get('semana');
  const fechaInicio = searchParams.get('fechaInicio');
  const fechaFin = searchParams.get('fechaFin');
  const cronogramaId = searchParams.get('cronograma_id');

  const { perforadorSeleccionado } = usePerforadoresStore();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [areas, setAreas] = useState([]);
  const [planificacionSemanal, setPlanificacionSemanal] = useState([]);
  const [planificacionPorPerforador, setPlanificacionPorPerforador] = useState(
    []
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const areas = await obtenerAreasPlanificacion();

        setAreas(areas);
      } catch (error) {
        setAreas([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [perforadorSeleccionado, cronogramaId]);

  useEffect(() => {
    async function obtenerPlanificacionSemanal() {
      try {
        const fechaInicioDate = new Date(fechaInicio);
        const fechaFinDate = new Date(fechaFin);

        const diffTime = Math.abs(fechaFinDate - fechaInicioDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const planificacion = [];
        for (let i = 0; i <= diffDays; i++) {
          const fechaActual = new Date(fechaInicioDate);
          fechaActual.setDate(fechaInicioDate.getDate() + i);

          planificacion.push({
            dia: fechaActual.getDate(),
            fecha: fechaActual,
            nombre: fechaActual.toLocaleDateString('es-ES', {
              weekday: 'long',
            }),
          });
        }

        const planificacionesAreas = await obtenerPlanificaciones({
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
          group_by_fecha: true,
          cronograma_id: cronogramaId,
        });
        const totalAreas = areas?.length;

        const planificacionRaw = planificacion.map((dia) => {
          const planificaciones = planificacionesAreas.filter((area) => {
            const fechaArea = new Date(area?.fecha);
            fechaArea.setHours(0, 0, 0, 0);

            return fechaArea.getTime() === dia?.fecha.getTime();
          });
          const totalPlanificaciones = planificaciones?.length;
          const totalFechas = totalAreas - totalPlanificaciones;

          if (totalFechas === 0) {
            return {
              ...dia,
              planificaciones,
            };
          }

          const existingIds = planificaciones
            .filter((p) => p.actividad_id !== null)
            .map((p) => p.actividad_id);

          const totalIds = Array.from(
            { length: totalAreas },
            (_, index) => index + 1
          );
          const missingIds = totalIds.filter((id) => !existingIds.includes(id));
          const areasFaltantes = missingIds.map((id) => ({ actividad_id: id }));

          const updatedPlanificaciones = [
            ...planificaciones,
            ...areasFaltantes,
          ];
          updatedPlanificaciones.sort(
            (a, b) => a.actividad_id - b.actividad_id
          );

          return {
            ...dia,
            planificaciones: updatedPlanificaciones,
          };
        });

        setPlanificacionSemanal(planificacionRaw);
      } catch (error) {
        setPlanificacionSemanal([]);
      }
    }

    obtenerPlanificacionSemanal();
  }, [fechaInicio, fechaFin, areas, cronogramaId]);

  if (isLoading && !isMounted) return <SkeletonCronograma />;
  return (
    <div className="flex flex-1 gap-4">
      <div className="flex flex-col flex-[0.15]">
        {areas?.length > 0 &&
          areas.map((tarea, index) => (
            <div
              key={tarea?.nombre}
              style={
                perforadorSeleccionado?.idPerforador &&
                planificacionPorPerforador.length === 0
                  ? { display: 'none' }
                  : {}
              }
              className={clsx(
                'bg-gray-500 text-sm text-center text-white rounded-lg uppercase flex items-center justify-center',
                {
                  'py-[0.7rem] mb-[16px]':
                    !perforadorSeleccionado?.idPerforador,
                  'py-[62px] mb-[8px]': perforadorSeleccionado?.idPerforador,
                  'mt-[5.8rem]':
                    index === 0 && !perforadorSeleccionado?.idPerforador,
                  'mt-[6.6rem]':
                    index === 0 && perforadorSeleccionado?.idPerforador,
                }
              )}
            >
              <span className="flex items-center space-x-2">
                {' '}
                {areaIcons?.[tarea?.nombre]}
                <span>{tarea?.nombre}</span>
              </span>
            </div>
          ))}
      </div>
      {!perforadorSeleccionado?.idPerforador ? (
        <PlanificacionSemanalGeneral
          selectedColumn={selectedColumn}
          setSelectedColumn={setSelectedColumn}
          planificacionAreas={areas}
          planificacionSemanal={planificacionSemanal}
          title={`${MESES_ES[mes]} ${anio} / Semana ${semana}`}
          cronogramaId={cronogramaId}
        />
      ) : (
        <PlanificacionPerforador
          mes={mes}
          anio={anio}
          semana={semana}
          perforador={perforadorSeleccionado}
          cronogramaId={cronogramaId}
          fechaFin={fechaFin}
          fechaInicio={fechaInicio}
          areas={areas}
          isMounted={isMounted}
          setIsMounted={setIsMounted}
          planificacionSemanal={planificacionPorPerforador}
          setPlanificacionSemanal={setPlanificacionPorPerforador}
        />
      )}
    </div>
  );
}

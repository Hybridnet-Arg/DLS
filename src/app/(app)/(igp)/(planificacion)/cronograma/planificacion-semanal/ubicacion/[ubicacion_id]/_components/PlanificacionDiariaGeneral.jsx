'use client';
import { useEffect, useState } from 'react';
import { obtenerPlanificaciones } from '@/services/planificaciones.service';

export default function PlanificacionDiariaGeneral({
  planificacionAreas = {},
  cronogramaId,
}) {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    async function fetchAreas() {
      try {
        const fechaInicio = new Date(planificacionAreas?.fecha);
        fechaInicio.setHours(0, 0, 0, 0);
        const fechaFin = new Date(planificacionAreas?.fecha);
        fechaFin.setHours(23, 59, 59, 999);

        const data = await obtenerPlanificaciones({
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
          cronograma_id: cronogramaId,
        });

        setAreas(data);
      } catch (error) {
        setAreas([]);
      }
    }
    fetchAreas();
  }, [planificacionAreas, cronogramaId]);

  return (
    <div className="bg-white mb-4 min-h-[485px] rounded p-3 flex flex-row gap-4">
      {areas?.map((area) => (
        <div
          key={`${area?.id}-area`}
          className="flex flex-1 flex-col justify-between"
        >
          <div>
            <h2 className="font-semibold text-sm text-start uppercase">
              {area?.nombre}
            </h2>
            <div className="text-sm mt-4">
              {area?.planificacion_actividades?.map(
                (planificacionActividad) => (
                  <div key={planificacionActividad?.nombre}>
                    <input
                      type="checkbox"
                      readOnly
                      checked={
                        planificacionActividad?.planificaciones?.length
                          ? true
                          : false
                      }
                      className="me-2"
                    />
                    {planificacionActividad?.nombre} (
                    {planificacionActividad?.planificaciones?.length ?? 0})
                  </div>
                )
              )}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h2>Notas:</h2>

            <div className="bg-gray-200 rounded p-2 min-h-[7rem] max-h-[7rem] overflow-y-scroll">
              {area?.planificacion_actividades
                ?.map((actividades) => actividades?.planificaciones ?? [])
                ?.flat()
                ?.filter(
                  (item, index, self) =>
                    index ===
                    self.findIndex(
                      (actividad) =>
                        actividad?.tarea_forecast?.perforador_forecast_id ===
                        item?.tarea_forecast.perforador_forecast_id
                    )
                )
                ?.map((planificacion) => (
                  <p key={planificacion?.id} className="mb-2">
                    <b>
                      {
                        planificacion?.tarea_forecast
                          ?.locacion_perforador_cronograma
                          ?.perforador_cronograma?.perforador?.nombre
                      }
                      :
                    </b>
                    {planificacion?.tarea_forecast?.planificacion_notas?.find(
                      (nota) => nota?.planificacion_area_id === area?.id
                    )?.nota ?? '-'}
                  </p>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

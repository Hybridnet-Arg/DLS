'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { MESES_ES } from '@/constants/cronograma.constant';
import { obtenerTareasForecast } from '@/services/tareasForecast.service';
import Button from '@/components/ui/buttons/Button';
import PlanificacionPerforadorDiaria from './PlanificacionPerforadorDiaria';

export default function PlanificacionPerforador({
  mes,
  anio,
  semana,
  perforador,
  fechaInicio,
  fechaFin,
  cronogramaId,
  areas,
  isMounted,
  setIsMounted = () => {},
  planificacionSemanal,
  setPlanificacionSemanal = () => {},
}) {
  const router = useRouter();

  async function fetchPlainifacionSemanal() {
    if (!perforador) return;
    try {
      setIsMounted(false);
      const data = await obtenerTareasForecast({
        cronograma_id: cronogramaId,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        include_areas: true,
      });
      setPlanificacionSemanal(data);
    } catch (error) {
      setPlanificacionSemanal([]);
    } finally {
      setIsMounted(true);
    }
  }

  useEffect(() => {
    fetchPlainifacionSemanal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cronogramaId, fechaFin, fechaInicio, perforador]);

  if (!isMounted) return;
  return (
    <div className="flex flex-col flex-[0.85]">
      <div className="flex">
        <div className="bg-dark text-sm text-center text-warning rounded-lg py-1 uppercase flex-1">
          {MESES_ES[mes]} {anio} / SEMANA {semana}
        </div>
      </div>
      <div className="flex flex-row gap-4 my-2">
        {planificacionSemanal && planificacionSemanal?.length > 0 ? (
          planificacionSemanal?.map((tareaForecast, index) => (
            <PlanificacionPerforadorDiaria
              index={index}
              key={`dia-${index}`}
              tareaForecast={tareaForecast}
              areas={areas}
              onReload={fetchPlainifacionSemanal}
            />
          ))
        ) : (
          <div className="bg-white flex flex-1 min-h-[22rem] rounded shadow items-center justify-center">
            No hay planificacion disponible para el perforador seleccionado
          </div>
        )}
      </div>
      <div className="flex gap-3 justify-end self-end">
        <Button icon={<ChevronLeft size={20} />} onClick={() => router.back()}>
          volver
        </Button>
      </div>
    </div>
  );
}

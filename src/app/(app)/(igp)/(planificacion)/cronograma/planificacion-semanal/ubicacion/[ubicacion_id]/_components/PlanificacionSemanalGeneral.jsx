import DiaPlanificacion from './DiaPlanificacion';
import PlanificacionDiariaGeneral from './PlanificacionDiariaGeneral';
import { ChevronLeft } from 'lucide-react';
import Button from '@/components/ui/buttons/Button';
import { useRouter } from 'next/navigation';

export default function PlanificacionSemanalGeneral({
  planificacionSemanal = [],
  selectedColumn,
  setSelectedColumn = () => {},
  title = '',
  cronogramaId,
}) {
  const router = useRouter();

  const handleGoBack = () => {
    if (!selectedColumn) {
      router.back();
    }
    setSelectedColumn(null);
  };

  return (
    <div className="flex flex-col flex-[0.85]">
      <div className="flex flex-1">
        <div className="bg-dark text-sm text-center text-warning rounded-lg py-1 uppercase flex-1">
          {title}
        </div>
      </div>
      <div className="flex flex-row gap-4 my-2">
        {planificacionSemanal?.map((planificacion, index) => (
          <DiaPlanificacion
            selectedColumn={selectedColumn}
            key={`planificacion-${planificacion?.dia}-${index}`}
            setSelectedColumn={setSelectedColumn}
            planificacion={planificacion}
          />
        ))}
      </div>
      {selectedColumn && (
        <PlanificacionDiariaGeneral
          planificacionAreas={selectedColumn}
          cronogramaId={cronogramaId}
        />
      )}
      <div className="flex gap-3 justify-end self-end">
        <Button icon={<ChevronLeft size={20} />} onClick={() => handleGoBack()}>
          volver
        </Button>
      </div>
    </div>
  );
}

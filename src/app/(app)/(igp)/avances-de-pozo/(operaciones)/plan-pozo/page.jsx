'use client';
import { useEffect, useState } from 'react';
import { getPerforadorByNumero } from '@/services/perforadores.services';
import usePerforadoresStore from '@/store/perforadores.store';
import { Skeleton } from '@/components/ui/skeleton';
import EditPlanPozo from './components/EditPlanPozo/EditPlanPozo';
import CreatePlanPozo from './components/CreatePlanPozo/CreatePlanPozo';

export default function PlanPozo() {
  const { perforadorSeleccionado } = usePerforadoresStore();

  const [driller, setDriller] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);

  const fetchDrillerByNumber = async () => {
    try {
      const numero = perforadorSeleccionado?.idPerforador;
      if (!numero) throw new Error('No se ha seleccionado un perforador');
      const data = await getPerforadorByNumero(numero, {
        include_locaciones: true,
        include_plan_pozo: true,
      });
      setDriller(data);
    } catch (error) {
      setDriller({});
    } finally {
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    fetchDrillerByNumber();
    return () => {
      setDriller({});
      setIsLoaded(true);
    };
  }, [perforadorSeleccionado?.idPerforador]);

  if (isLoaded) {
    return (
      <div className="flex flex-col md:flex-row gap-5 p-4">
        <div className="flex flex-col flex-1 ">
          <Skeleton className="w-full h-[27rem] rounded" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {!driller || driller?.planes_pozo?.length === 0 ? (
        <CreatePlanPozo
          perforadorId={driller?.id}
          locacionesPerforador={driller?.perforador_locaciones}
          reloadData={fetchDrillerByNumber}
        />
      ) : (
        <EditPlanPozo planPozo={driller?.planes_pozo?.[0]} />
      )}
    </div>
  );
}

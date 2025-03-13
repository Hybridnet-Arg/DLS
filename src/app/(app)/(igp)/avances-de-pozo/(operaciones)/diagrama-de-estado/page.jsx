'use client';
import { useState, useEffect, Suspense } from 'react';
import usePerforadoresStore from '@/store/perforadores.store';
import { getEstadoDiagramaByNumeroPerforador } from '@/services/estadosDiagrama.service';
import SkeletonDiagram from './components/SkeletonDiagram';
import StateDiagram from './components/StateDiagram/StateDiagram';

const StateDiagramPage = () => {
  const { perforadorSeleccionado: perforador } = usePerforadoresStore();

  const [stateDiagram, setStateDiagram] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const fetchStateDiagram = async () => {
      setIsLoaded(true);
      const numero = perforador?.idPerforador;
      try {
        if (!numero) {
          throw new Error('No existe un numero de perforador');
        }
        const data = await getEstadoDiagramaByNumeroPerforador(numero);
        setStateDiagram(data);
      } catch (error) {
        setStateDiagram({});
      } finally {
        setIsLoaded(false);
      }
    };
    fetchStateDiagram();
    return () => {
      setStateDiagram({});
      setIsLoaded(true);
    };
  }, [perforador?.idPerforador]);

  return (
    <div className="rounded-lg">
      <Suspense fallback={<SkeletonDiagram />}>
        {isLoaded ? (
          <SkeletonDiagram />
        ) : (
          <StateDiagram nodeData={stateDiagram} />
        )}
      </Suspense>
    </div>
  );
};

export default StateDiagramPage;

'use client';
import { useState, useEffect } from 'react';

import { getAllPozos } from '@/services/pozos.services';
import usePerforadoresStore from '@/store/perforadores.store';

import AdvancementCurve from './components/AdvancementCurveGraphic/AdvancementCurve';
import AdvancementCurveSkeleton from './components/AdvancementCurveSkeleton';
import AdvancementCurveStadistics from './components/AdvancementCurveStadistics/AdvancementCurveStadistics';
import {
  calcularProgresoTotalPorEtapa,
  obtenerProgresoPorEtapasPozo,
} from './helpers/etapasPozos.helper';

export default function AvancesDePozoByPerforador() {
  const { perforadorSeleccionado: perforador } = usePerforadoresStore();

  const [pozos, setPozos] = useState([]);
  const [hole, setHole] = useState({});
  const [progress, setProgress] = useState(0);
  const [progressNivelTrepano, setProgressNivelTrepano] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);

  const handleProgress = (hole) => {
    const profundidad = hole?.avances_pozo?.[0]?.profundidad ?? 0;
    const nivelTrepano = hole?.avances_pozo?.[0]?.nivel_trepano ?? 0;
    const listaEtapas = hole?.etapas_pozo ?? [];

    const progresoPorEtapa = obtenerProgresoPorEtapasPozo(
      listaEtapas,
      profundidad,
      true
    );

    const progresoPorEtapaNivelTrepano = obtenerProgresoPorEtapasPozo(
      listaEtapas,
      nivelTrepano,
      true
    );

    const progresoTotal = calcularProgresoTotalPorEtapa(progresoPorEtapa);
    const progresoTotalNivelTrepano = calcularProgresoTotalPorEtapa(
      progresoPorEtapaNivelTrepano
    );

    setProgress(progresoTotal);
    return setProgressNivelTrepano(progresoTotalNivelTrepano);
  };

  useEffect(() => {
    const fetchDriller = async () => {
      setIsLoaded(true);
      const numero = perforador?.idPerforador;
      try {
        if (!numero) {
          throw new Error('No existe un numero de perforador');
        }
        const data = await getAllPozos({
          numero_perforador: numero,
          has_plan_pozo: true,
          activo: true,
        });

        handleProgress(data?.pozos?.[0]);

        setHole(data?.pozos?.[0]);
        setPozos(data?.pozos);
      } catch (error) {
        setHole({});
        setPozos([]);
      } finally {
        setIsLoaded(false);
      }
    };
    fetchDriller();
    return () => {
      setHole({});
      setPozos([]);
      setIsLoaded(true);
    };
  }, [perforador?.idPerforador]);

  const handleSelectHole = async (value) => {
    if (!value) return;
    const hole = pozos?.find((pozo) => pozo?.id === parseInt(value));
    handleProgress(hole);
    setHole(hole);
  };

  return (
    <div className=" rounded-lg p-4">
      {isLoaded ? (
        <AdvancementCurveSkeleton />
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col flex-1 md:flex-[1.5]">
              <AdvancementCurve
                holeName={hole?.nombre}
                progress={progress}
                progressNivelTrepano={progressNivelTrepano}
                holeDepth={hole?.avances_pozo?.[0]?.profundidad ?? 0}
                trepanLevel={hole?.avances_pozo?.[0]?.nivel_trepano ?? 0}
                velocity={hole?.avances_pozo?.[0]?.velocidad ?? 0}
                etapasPozo={hole?.etapas_pozo ?? []}
              />
            </div>
            <div className="flex flex-col flex-1 md:flex-1 justify-between">
              <AdvancementCurveStadistics
                pozos={pozos}
                hole={hole}
                handleSelectHole={handleSelectHole}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

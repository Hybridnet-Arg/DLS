'use client';

import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import usePerforadoresStore from '@/store/perforadores.store';
import { usePlantaStore } from '@/store/planta.store';

import TanqueGasoilCard from '../_components/TanqueGasoilCard';
import TanqueGasoilPerforador from '../_components/TanqueGasoilPerforador';
import { getTanquesNiveles } from '@/services/tanques.service';
import ExcelLink from '../_components/ExcelLink';

export default function TanquesGasoilPage() {
  const { perforadores, perforadorSeleccionado } = usePerforadoresStore();
  const { getLastUpdateTanques } = usePlantaStore();
  const [tanques, setTanques] = useState([]);
  const [tanque, setTanque] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTanques = async () => {
      try {
        const data = await getTanquesNiveles();
        const tanquesFiltrados = filtrarTanques(perforadores, data);
        const tanques = tanquesFiltrados?.map(transformarTanque) || [];
        setTanques(tanques);
      } catch (error) {
        setTanques([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (!perforadorSeleccionado?.idPerforador) {
      fetchTanques();
      getLastUpdateTanques({});
    } else {
      fetchTanqueById();
      getLastUpdateTanques({
        idPerforador: perforadorSeleccionado?.idPerforador,
      });
    }

    return () => {
      setTanques([]);
      setTanque({});
      setIsLoading(true);
    };
  }, [perforadorSeleccionado]);

  const filtrarTanques = (array1, array2) => {
    return array2.filter((item2) => {
      return array1.some((item1) => {
        return (
          parseInt(item1.idPerforador) === parseInt(item2.perforador_numero)
        );
      });
    });
  };

  const fetchTanqueById = async () => {
    try {
      const data = await getTanquesNiveles({
        perforador: perforadorSeleccionado?.idPerforador,
      });

      const tanque = data?.length ? transformarTanque(data[0]) : {};
      setTanque(tanque);
    } catch (error) {
      setTanque({});
    } finally {
      setIsLoading(false);
    }
  };

  const actualizarTanque = () => {
    fetchTanqueById();
  };

  const transformarTanque = (tanque) => ({
    id: tanque?.tanque_id,
    nombre: tanque?.perforador_nombre,
    capacidad: tanque?.lts,
    minimo: 0,
    maximo: tanque?.capacidad,
    fecha: tanque?.fecha,
    nivel_critico: tanque?.nivel_critico,
    nivel_alerta: tanque?.nivel_alerta,
    activo: tanque?.habilitado,
    ymmCm: tanque?.ymmCm || 0,
  });

  return isLoading ? (
    <div className="flex justify-center items-center min-h-[440px]">
      <Loader size={50} className="animate-spin" />
    </div>
  ) : perforadorSeleccionado?.idPerforador ? (
    <TanqueGasoilPerforador
      tanque={tanque}
      onActualizarTanque={actualizarTanque}
    />
  ) : (
    <>
      <ExcelLink />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pr-4 pb-4 pl-4">
        {tanques.length > 0 ? (
          tanques.map((tanque) => (
            <TanqueGasoilCard key={tanque?.id} tanque={tanque} />
          ))
        ) : (
          <div className="flex justify-center items-center min-h-[440px]">
            <p>No hay tanques disponibles.</p>
          </div>
        )}
      </div>
    </>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { Inbox, Loader } from 'lucide-react';
import Title from '@/components/ui/labels/Title';
import PiezaItem from './_components/PiezaItem';
import { obtenerPiezas } from '@/services/schb/pieza.service';
import usePerforadoresStore from '@/store/perforadores.store';

export default function AlmacenAgrupadoPage() {
  const { perforadorSeleccionado } = usePerforadoresStore();

  const [piezas, setPiezas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const piezas = await obtenerPiezas({
          perforador: perforadorSeleccionado?.idPerforador,
        });

        setPiezas(piezas);
      } catch (error) {
        setPiezas([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      setPiezas([]);
    };
  }, [perforadorSeleccionado?.idPerforador]);

  return (
    <div className="mx-3 my-2">
      <Title>Almacén agrupado</Title>
      {isLoading ? (
        <div className="flex flex-col space-y-2 justify-center items-center mt-[8rem]">
          <Loader size={40} className="animate-spin" />
          <p className="text-base font-semibold">Cargando...</p>
        </div>
      ) : piezas?.length > 0 ? (
        <div className="grid grid-cols-4 gap-5 mt-2">
          {piezas?.map((pieza) => (
            <PiezaItem
              key={pieza?.idPieza}
              id={pieza?.idPieza}
              tipo={pieza?.tipo}
              min={pieza?.piezaPerforador?.[0]?.stock}
              un={pieza?._count?.perforadorPieza}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col space-y-2 justify-center items-center mt-[8rem]">
          <Inbox size={40} />
          <p className="text-base font-semibold">No hay datos disponibles</p>
        </div>
      )}
    </div>
  );
}

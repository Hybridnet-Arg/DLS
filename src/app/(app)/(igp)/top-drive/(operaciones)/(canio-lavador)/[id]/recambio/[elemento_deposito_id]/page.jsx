'use client';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { use, useEffect, useState } from 'react';
import { getElementosComponenteById } from '@/services/elementosComponente.service';
import { getAllElementosDepositoByFilters } from '@/services/elementosDeposito.service';
import CanioLavadorImage from '../../../../components/CanioLavadorImage';
import CanioLavadorTablaPiezas from '../../../../components/CanioLavadorTablaPiezas';
import CanioLavadorSkeleton from '../../../../components/CanioLavadorSkeleton';
import CanioLavadorCambiarPieza from './components/CanioLavadorCambiarPieza';
import Title from '@/components/ui/labels/Title';
import { isSaverSub } from '../../../../helpers/elementType.helper';

export default function RecambioPieza({ params }) {
  const { id, elemento_deposito_id } = use(params);
  const [elemento, setElemento] = useState({});
  const [isMounted, setisMounted] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [elementosDeposito, setElementosDeposito] = useState([]);

  useEffect(() => {
    const fetchElementos = async () => {
      try {
        const componentItems = await getElementosComponenteById(id);
        const depositItems = await getAllElementosDepositoByFilters({
          en_uso: false,
          baja: false,
          elemento_componente_id: id,
        });

        setElemento(componentItems?.elemento);
        setElementosDeposito(depositItems);
      } catch (error) {
        setElementosDeposito([]);
      } finally {
        setisMounted(true);
      }
    };
    fetchElementos();
    return () => {
      setElementosDeposito([]);
      setisMounted(false);
    };
  }, [id]);

  if (!isMounted) return <CanioLavadorSkeleton />;
  return (
    <div className="flex h-full">
      {!selectedRow ? (
        <div className="flex">
          <div className="flex-[0.8] mb-8">
            <Title>Seleccionar pieza</Title>
            <CanioLavadorTablaPiezas
              data={elementosDeposito}
              handleRowClick={(rowData) => setSelectedRow(rowData)}
              isSaverSub={isSaverSub(elemento?.id)}
            />
          </div>
          <div className="flex-[0.2] flex-col flex justify-end items-end">
            <div>
              {elemento && (
                <CanioLavadorImage
                  elemento={elemento}
                  elementos_deposito={{ horas_en_uso: 0 }}
                />
              )}
            </div>
            <div className="mt-5">
              <Link
                href={`/top-drive/${id}`}
                className="ps-5 pe-8 bg-dark hover:bg-dark flex items-center space-x-2 hover:opacity-90 text-white py-2 rounded-lg font-bold text-sm"
              >
                <ChevronLeft size={20} />
                <span>volver</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <CanioLavadorCambiarPieza
          id={elemento_deposito_id}
          goBack={() => setSelectedRow(null)}
          elementoDeposito={selectedRow}
          redirectTo={`/top-drive/${id}?elemento_id=${elemento?.id}`}
        />
      )}
    </div>
  );
}

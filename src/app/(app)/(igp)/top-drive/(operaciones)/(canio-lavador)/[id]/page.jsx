'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MessageSquareWarning } from 'lucide-react';
import Title from '@/components/ui/labels/Title';
import CanioLavadorPozo from './components/CanioLavadorPozo';
import CanioLavadorFecha from './components/CanioLavadorFecha';
import CanioLavadorFicha from './components/CanioLavadorFicha';
import { getElementosComponenteById } from '@/services/elementosComponente.service';
import { usePlanPozoStore } from '@/store/planPozo.store';
import CanioLavadorSkeleton from '../../components/CanioLavadorSkeleton';

export default function CanioLavadorId() {
  const { id } = useParams();
  const { planPozo, isLoading } = usePlanPozoStore();

  const [data, setData] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchElementos = async () => {
      setIsLoadingData(true);
      try {
        const data = await getElementosComponenteById(id, {
          include_elementos_deposito_disponibles: true,
        });
        setData(data);
      } catch (error) {
        setData({});
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchElementos();
    return () => {
      setData({});
      setIsLoadingData(true);
    };
  }, [id]);

  const getWithdrawalDate = () => {
    const dateRaw = data?.elementos_deposito?.[0]?.fecha_instalacion;
    const horasHasta = data?.elemento?.tipo_elemento?.horas_hasta;

    if (!dateRaw || !horasHasta) return;

    const date = new Date(dateRaw);
    date.setHours(date.getHours() + horasHasta);
    return date;
  };

  if (isLoading || isLoadingData) return <CanioLavadorSkeleton />;

  return !planPozo?.id ? (
    <div className="bg-gray-200 rounded h-full">
      {!planPozo?.id && !isLoading && !isLoadingData && (
        <div className="flex flex-col items-center justify-center h-full">
          <MessageSquareWarning className="text-gray-500" size={50} />
          <h1 className="font-bold text-gray-500">
            No posee un plan de pozo activo
          </h1>
        </div>
      )}
    </div>
  ) : (
    <div className="flex h-full gap-5">
      <div className="flex-[1.6] flex flex-col justify-between">
        <Title>
          Horas de{' '}
          {data?.elemento?.nombre === 'WashPipe'
            ? 'Caño lavador'
            : (data?.elemento?.nombre ?? '-')}
        </Title>
        <CanioLavadorFecha
          elementoDepositoId={data?.elementos_deposito?.[0]?.id}
          hours={data?.elementos_deposito?.[0]?.horas_en_uso}
          maxHours={data?.elemento?.tipo_elemento?.horas_hasta}
          instalationDate={data?.elementos_deposito?.[0]?.fecha_instalacion}
          withdrawalDate={getWithdrawalDate()}
        />
        <CanioLavadorFicha {...data} />
      </div>
      <div className="flex-[0.4]">
        <CanioLavadorPozo
          id={id}
          elementoDepositoId={data?.elementos_deposito?.[0]?.id}
          elemento={data?.elemento}
          hasElementos={data?.elementos_disponibles?.length > 0}
        />
      </div>
    </div>
  );
}

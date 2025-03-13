'use client';
import Tabs from '@/components/ui/tabs/Tabs';
import { useSearchParams } from 'next/navigation';

export default function PlanificacionSemanalLayout({ children }) {
  const searchParams = useSearchParams();
  const mes = searchParams.get('mes');
  const anio = searchParams.get('anio');
  const semana = searchParams.get('semana');
  const fechaInicio = searchParams.get('fechaInicio');
  const fechaFin = searchParams.get('fechaFin');

  return (
    <div>
      <Tabs
        itemTabs={[
          {
            key: 1,
            name: 'Planificacion semanal de Neuquén',
            link: `/cronograma/planificacion-semanal/ubicacion/1?mes=${mes}&anio=${anio}&semana=${semana}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
          },
          {
            key: 2,
            name: 'Planificacion semanal de Comodoro Rivadavia',
            link: `/cronograma/planificacion-semanal/ubicacion/2?mes=${mes}&anio=${anio}&semana=${semana}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
          },
        ]}
      />
      <div className="rounded-b-md mb-5 bg-backgroundGray pt-5 pb-3 px-3 min-h-[440px] 2xl:min-h-[500px]">
        {children}
      </div>
    </div>
  );
}

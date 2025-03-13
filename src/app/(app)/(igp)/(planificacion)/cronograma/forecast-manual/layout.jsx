'use client';
import Tabs from '@/components/ui/tabs/Tabs';

export default function ForecastMensualLayout({ children }) {
  return (
    <div>
      <Tabs
        itemTabs={[
          {
            key: 1,
            name: 'Forecast mensual Neuquén',
            link: '/cronograma/forecast-manual/ubicacion/1',
          },
          {
            key: 2,
            name: 'Forecast mensual Comodoro Rivadavia',
            link: '/cronograma/forecast-manual/ubicacion/2',
          },
        ]}
      />
      <div className="rounded-b-md mb-5 bg-backgroundGray pt-5 pb-3 ps-3 min-h-[50vh] 2xl:min-h-[60vh]">
        {children}
      </div>
    </div>
  );
}

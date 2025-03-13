'use client';
import Tabs from '@/components/ui/tabs/Tabs';

export default function OperacionesLayout({ children }) {
  return (
    <div>
      <Tabs
        itemTabs={[
          {
            key: 1,
            name: 'Cronograma anual Neuquén',
            link: '/cronograma/1',
          },
          {
            key: 2,
            name: 'Cronograma anual Comodoro Rivadavia',
            link: '/cronograma/2',
          },
        ]}
      />
      <div className="rounded-b-md mb-5 bg-backgroundGray pt-5 pb-3 px-3 min-h-[50vh] 2xl:min-h-[60vh]">
        {children}
      </div>
    </div>
  );
}

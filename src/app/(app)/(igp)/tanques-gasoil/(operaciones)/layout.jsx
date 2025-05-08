'use client';
import Submenu from '@/components/ui/tabs/Submenu';
import { TanqueGasoilIcon } from '@/components/icons/MenuIcons';
import LastUpdateLabel from '@/components/ui/labels/LastUpdateLabel';
import { usePlantaStore } from '@/store/planta.store';

export default function TanqueGasoilOperacionesLayout({ children }) {
  const { lastUpdateTanques } = usePlantaStore();

  const options = [
    {
      key: 'tanques-gasoil',
      title: 'Tanques de gasoil',
      disabled: false,
      component: null,
      link: '/tanques-gasoil',
      links: ['/tanques-gasoil'],
      icon: <TanqueGasoilIcon height={35} width={35} />,
    },
    {
      key: 'almacen',
      title: 'Almacén',
      disabled: true,
      component: null,
      link: '/tanques-gasoil/almacen',
      icon: <TanqueGasoilIcon height={35} width={35} />,
    },
    {
      key: 'registros-historicos',
      title: 'Registros históricos',
      disabled: true,
      component: null,
      link: '/tanques-gasoil/registros-historicos',
      icon: <TanqueGasoilIcon height={35} width={35} />,
    },
  ];

  return (
    <div>
      <div className="bg-backgroundGray pt-4 rounded-t-md flex items-center justify-between">
        <h2 className="uppercase font-medium text-sm text-ellipsis overflow-hidden whitespace-nowrap ps-20">
          Operaciones
        </h2>
        <LastUpdateLabel fecha={lastUpdateTanques} />
      </div>
      <Submenu items={options}>{children}</Submenu>
    </div>
  );
}

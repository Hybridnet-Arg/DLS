'use client';
import Submenu from '@/components/ui/tabs/Submenu';
import { TopDriveIcon } from '@/components/icons/MenuIcons';

export default function TopDriveOperacionesLayout({ children }) {
  const options = [
    {
      key: 'caño_lavador',
      title: 'Top drive',
      disabled: false,
      component: null,
      link: '/top-drive',
      links: [
        '/top-drive/',
        '/top-drive/:id',
        '/top-drive/:id/recambio',
        '/top-drive/:id/recambio/:id',
      ],
      icon: <TopDriveIcon height={35} width={35} />,
    },
    {
      key: 'almacen',
      title: 'Almacén',
      disabled: false,
      component: null,
      link: '/top-drive/almacen',
      links: [
        '/top-drive/almacen',
        '/top-drive/almacen/:id',
        '/top-drive/almacen/:id/pieza',
        '/top-drive/almacen/:id/pieza/:id',
      ],
      icon: <TopDriveIcon height={35} width={35} />,
    },
    {
      key: 'historico-cambio-de-elementos',
      title: 'Histórico cambio de elementos',
      disabled: true,
      component: null,
      link: '/top-drive/historico-cambio-de-elementos',
      icon: <TopDriveIcon height={35} width={35} />,
    },
    {
      key: 'historico-uso-de-elementos',
      title: 'Histórico uso de elementos',
      disabled: true,
      component: null,
      link: '/top-drive/historico-uso-de-elementos',
      icon: <TopDriveIcon height={35} width={35} />,
    },
  ];

  return (
    <div>
      <div className="bg-backgroundGray pt-4 rounded-t-md flex items-center justify-between">
        <h2 className="uppercase font-medium text-sm text-ellipsis overflow-hidden whitespace-nowrap ps-20">
          Operaciones
        </h2>
        <div></div>
      </div>
      <Submenu items={options}>{children}</Submenu>
    </div>
  );
}

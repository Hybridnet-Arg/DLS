import Submenu from '@/components/ui/tabs/Submenu';
import { BombaIcon } from '@/components/icons/MenuIcons';
import LastUpdateLabel from '@/components/ui/labels/LastUpdateLabel';

export default function OperacionesLayout({ children }) {
  const options = [
    {
      key: 'sistema-de-horas-de-bomba',
      title: 'Bombas',
      disabled: false,
      component: null,
      link: '/schb',
      icon: <BombaIcon height={35} width={30} />,
    },
    {
      key: 'almacen',
      title: 'Almacén agrupado',
      disabled: false,
      component: null,
      link: '/sistema-de-horas-de-bomba/almacen-agrupado',
      icon: <BombaIcon height={35} width={30} />,
    },
    {
      key: 'historico-cambio-elementos',
      title: 'Stock de almacen',
      disabled: false,
      component: null,
      link: '/sistema-de-horas-de-bomba/stock-almacen',
      icon: <BombaIcon height={35} width={30} />,
    },
    {
      key: 'historico-uso-de-elementos',
      title: 'Registros historicos',
      disabled: true,
      component: null,
      link: '/sistema-de-horas-de-bomba/registros-historicos',
      icon: <BombaIcon height={35} width={30} />,
    },
  ];

  return (
    <div>
      <div className="bg-backgroundGray pt-4 rounded-t-md flex items-center justify-between">
        <h2 className="uppercase font-medium text-sm text-ellipsis overflow-hidden whitespace-nowrap ps-20">
          Operaciones
        </h2>
        <LastUpdateLabel fecha={new Date()} />
      </div>
      <Submenu items={options}>{children}</Submenu>
    </div>
  );
}

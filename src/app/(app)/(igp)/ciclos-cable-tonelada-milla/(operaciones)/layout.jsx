import Submenu from '@/components/ui/tabs/Submenu';
import { CableMillaIcon } from '@/components/icons/MenuIcons';

export default function OperacionesLayout({ children }) {
  const options = [
    {
      key: 'ciclos-cable-tonelada-milla',
      title: 'Ciclos de cable tonelada milla',
      disabled: false,
      component: null,
      link: '/ciclos-cable-tonelada-milla',
      links: [
        '/ciclos-cable-tonelada-milla',
        '/ciclos-cable-tonelada-milla/cortar-cable',
      ],
      icon: <CableMillaIcon height={35} width={30} />,
    },
    {
      key: 'almacen',
      title: 'Almacén',
      disabled: false,
      component: null,
      link: '/ciclos-cable-tonelada-milla/almacen',
      links: [
        '/ciclos-cable-tonelada-milla/almacen',
        '/ciclos-cable-tonelada-milla/almacen/stock',
        '/ciclos-cable-tonelada-milla/almacen/stock/carga',
        '/ciclos-cable-tonelada-milla/almacen/stock/editar/:id',
      ],
      icon: <CableMillaIcon height={35} width={30} />,
    },
    {
      key: 'historico-cambio-elementos',
      title: 'Historico cambio de elementos',
      disabled: false,
      component: null,
      link: '/ciclos-cable-tonelada-milla/historico-cambio-elementos',
      links: [
        '/ciclos-cable-tonelada-milla/historico-cambio-elementos',
        '/ciclos-cable-tonelada-milla/historico-cambio-elementos/filtro',
      ],
      icon: <CableMillaIcon height={35} width={30} />,
    },
    {
      key: 'historico-uso-de-elementos',
      title: 'Historico uso de elementos',
      disabled: true,
      component: null,
      link: '/ciclos-cable-tonelada-milla/historico-uso-de-elementos',
      icon: <CableMillaIcon height={35} width={30} />,
    },
  ];

  return (
    <div>
      <div className="bg-backgroundGray pt-4 rounded-t-md flex items-center justify-between">
        <h2 className="uppercase font-medium text-sm text-ellipsis overflow-hidden whitespace-nowrap ps-20">
          Operaciones
        </h2>
      </div>
      <Submenu items={options}>{children}</Submenu>
    </div>
  );
}

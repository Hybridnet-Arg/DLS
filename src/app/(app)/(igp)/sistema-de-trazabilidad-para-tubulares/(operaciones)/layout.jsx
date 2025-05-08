'use client';
import Submenu from '@/components/ui/tabs/Submenu';
import { TubularesIcon } from '@/components/icons/MenuIcons';

export default function TubularesOperacionesLayout({ children }) {
  const options = [
    {
      key: 'status',
      title: 'Status actual general',
      disabled: false,
      component: null,
      link: '/sistema-de-trazabilidad-para-tubulares',
      icon: <TubularesIcon height={35} width={35} />,
    },
    {
      key: 'trazabilidad-de-tubulares',
      title: 'Trazabilidad de tubulares',
      disabled: false,
      component: null,
      link: '/sistema-de-trazabilidad-para-tubulares/trazabilidad-de-tubulares',
      icon: <TubularesIcon height={35} width={35} />,
    },
    {
      key: 'adquisicion-de-tubulares',
      title: 'Adquisición de tubulares',
      component: null,
      link: '/sistema-de-trazabilidad-para-tubulares/adquisicion-de-tubulares',
      links: [
        '/sistema-de-trazabilidad-para-tubulares/adquisicion-de-tubulares',
        '/sistema-de-trazabilidad-para-tubulares/adquisicion-de-tubulares/adquirir',
      ],
      icon: <TubularesIcon height={35} width={35} />,
    },
    {
      key: 'historico-de-trazabilidad',
      title: 'Histórico de trazabilidad',
      disabled: true,
      component: null,
      link: '/sistema-de-trazabilidad-para-tubulares/historico-de-trazabilidad',
      icon: <TubularesIcon height={35} width={35} />,
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

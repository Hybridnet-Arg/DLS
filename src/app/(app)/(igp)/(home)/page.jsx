'use client';

import Submenu from '@/components/ui/tabs/Submenu';
import PlantaIcon from '@/components/icons/PlantaIcon';
import {
  BombaIcon,
  BOPIcon,
  CableMillaIcon,
  LineasAltaPresionIcon,
  PozoIcon,
  TanqueGasoilIcon,
  TelaZarandaIcon,
  TopDriveIcon,
  TubularesIcon,
  ValvulaPiletaIcon,
} from '@/components/icons/MenuIcons';
import { CONFIG } from '@/constants';
import { usePlantaStore } from '@/store/planta.store';

export default function OperatingSystem() {
  const { setActiveSection, setInitial } = usePlantaStore();

  const options = [
    {
      key: 'schb',
      title: 'Sistema de horas de bomba',
      disabled: false,
      link: '/sistema-de-horas-de-bomba',
      icon: <BombaIcon height={35} width={35} />,
      onMouseEnter: () => setActiveSection('schb'),
      onMouseLeave: () => {
        setActiveSection(null), setInitial(true);
      },
    },
    {
      key: 'adp',
      title: 'Avances de pozo',
      disabled: false,
      component: null,
      link: '/avances-de-pozo',
      icon: <PozoIcon height={35} width={35} />,
      onMouseEnter: () => setActiveSection('adp'),
      onMouseLeave: () => {
        setActiveSection(null), setInitial(true);
      },
    },
    {
      key: 'td',
      title: 'Top Drive',
      disabled: false,
      component: null,
      link: '/top-drive',
      icon: <TopDriveIcon height={35} width={35} />,
      onMouseEnter: () => setActiveSection('td'),
      onMouseLeave: () => {
        setActiveSection(null), setInitial(true);
      },
    },
    {
      key: 'cctm',
      title: 'Ciclos cable tonelada milla',
      disabled: false,
      hidden: false,
      component: null,
      link: '/ciclos-cable-tonelada-milla',
      icon: <CableMillaIcon height={35} width={35} />,
      onMouseEnter: () => setActiveSection('cctm'),
      onMouseLeave: () => {
        setActiveSection(null), setInitial(true);
      },
    },
    {
      key: 'ldap',
      title: 'Lineas de alta presión',
      disabled: true,
      hidden: true,
      component: null,
      icon: <LineasAltaPresionIcon height={35} width={35} />,
    },
    {
      key: 'hdtz',
      title: 'Horas de tela zaranda',
      disabled: true,
      hidden: true,
      component: null,
      icon: <TelaZarandaIcon height={35} width={35} />,
    },
    {
      key: 'cdb',
      title: 'Ciclos de BOP',
      disabled: true,
      hidden: true,
      component: null,
      icon: <BOPIcon height={35} width={35} />,
    },
    {
      key: 'hvp',
      title: 'Horas de válvula de pileta',
      disabled: true,
      hidden: true,
      component: null,
      icon: <ValvulaPiletaIcon height={35} width={35} />,
    },
    {
      key: 'stpt',
      title: 'Sist. de trazabilidad p/ tubulares',
      component: null,
      disabled: false,
      hidden: false,
      link: '/sistema-de-trazabilidad-para-tubulares',
      icon: (
        <TubularesIcon height={35} width={28} className="mr-[0.30rem] ml-1" />
      ),
      onMouseEnter: () => setActiveSection('stpt'),
      onMouseLeave: () => {
        setActiveSection(null), setInitial(true);
      },
    },
    {
      key: 'er',
      title: 'Tanques de Gasoil',
      disabled: false,
      hidden: false,
      component: null,
      link: '/tanques-gasoil',
      icon: <TanqueGasoilIcon height={35} width={35} />,
      onMouseEnter: () => setActiveSection('er'),
      onMouseLeave: () => {
        setActiveSection(null), setInitial(true);
      },
    },
  ];

  return (
    <Submenu
      items={options}
      defaultView={<PlantaIcon className="p-2 rounded-lg" />}
    />
  );
}

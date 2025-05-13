import Link from 'next/link';
import Image from 'next/image';
import { Logout } from './Logout';
import { NavLink } from './NavLink';
import {
  ComercialIcon,
  FinancieroIcon,
  MantenimientoIcon,
  OperacionesIcon,
  PlanificacionIcon,
  SeguridadIcon,
} from './NavIcons';
import AyudaLink from './AyudaLink';
import BgHeaderImg from '~/static/images/bg-header.png';
import { CONFIG } from '@/constants';

const OPERACIONES_NAV = [
  {
    key: 'operaciones-0',
    label: 'Sistema de horas de bomba',
    href: '/sistema-de-horas-de-bomba',
  },
  {
    key: 'operaciones-1',
    label: 'Avance de pozo',
    href: '/avances-de-pozo',
  },
  {
    key: 'operaciones-2',
    label: 'Top Drive',
    href: '/top-drive',
  },
  {
    key: 'operaciones-3',
    label: 'Ciclos cable tonelada milla',
    href: '/ciclos-cable-tonelada-milla',
  },
  {
    key: 'operaciones-4',
    label: 'Lineas de alta presión',
    href: '#',
    disabled: true,
  },
  {
    key: 'operaciones-5',
    label: 'Horas de tela zaranda',
    href: '#',
    disabled: true,
  },
  {
    key: 'operaciones-6',
    label: 'Ciclos de BOP(Blow out Preventer)',
    href: '#',
    disabled: true,
  },
  {
    key: 'operaciones-7',
    label: 'Horas de válvula de pileta',
    href: '#',
    disabled: true,
  },
  {
    key: 'operaciones-8',
    label: 'Sistema de trazabilidad para tubulares',
    href: '/sistema-de-trazabilidad-para-tubulares',
  },
  {
    key: 'operaciones-9',
    label: 'Tanques de Gasoil',
    href: '/tanques-gasoil',
  },
];

const FINANCIERO_NAV = [
  {
    key: 'financiero-0',
    label: 'Avance de cobros',
    href: '#',
    disabled: true,
  },
  {
    key: 'financiero-1',
    label: 'Horas de facturación',
    href: '#',
    disabled: true,
  },
];

const COMERCIAL_NAV = [
  {
    key: 'comercial-0',
    label: 'Documento contrato',
    href: '#',
    disabled: true,
  },
  {
    key: 'comercial-1',
    label: 'Vencimiento contrato',
    href: '#',
    disabled: true,
  },
  {
    key: 'comercial-2',
    label: 'Nuevo contrato',
    href: '#',
    disabled: true,
  },
];

const MANTENIMIENTO_NAV = [
  {
    key: 'mantenimiento-0',
    label: 'Cumplimiento mantenimiento preventivo',
    href: '#',
    disabled: true,
  },
  {
    key: 'mantenimiento-1',
    label: 'Cantidad de fallas por reparación',
    href: '#',
    disabled: true,
  },
];

const SEGURIDAD_NAV = [
  {
    key: 'seguridad-0',
    label: 'Cantidad de accidentes',
    href: '#',
    disabled: true,
  },
  {
    key: 'seguridad-1',
    label: 'Dias sin accidentes',
    href: '#',
    disabled: true,
  },
];

const PLANIFICACION_NAV = [
  {
    key: 'planificacion-0',
    label: 'Carga de locación',
    href: '/locaciones',
    disabled: false,
  },
  {
    key: 'planificacion-1',
    label: 'Cronograma/Forecast/Planificación',
    href: '/cronograma',
  },
];

export default function Navbar() {
  return (
    <header
      className="bg-cover text-white py-2 px-6"
      style={{ backgroundImage: `url(${BgHeaderImg.src})` }}
    >
      <div className="container mx-auto flex justify-between items-center min-h-[64px]">
        {/* <Link href="/">
          <Image
            src={'/static/images/logo.png'}
            width={40}
            height={30}
            alt="Logo"
            blurDataURL={'/static/images/logo.png'}
            unoptimized
          />
        </Link> */}
        <div className="flex flex-grow justify-end space-x-5 sm:flex-col sm:items-end md:flex-col md:items-end lg:flex-row">
          <nav className="flex items-center md:items-end">
            <NavLink options={PLANIFICACION_NAV} firstItem lastItem blue>
              <PlanificacionIcon height={16} />
              Planificación
            </NavLink>
          </nav>
          <nav className="flex items-center md:items-end">
            <NavLink options={OPERACIONES_NAV} firstItem>
              <OperacionesIcon />
              Operaciones
            </NavLink>
            <NavLink options={FINANCIERO_NAV}>
              <FinancieroIcon />
              Financiero
            </NavLink>
            <NavLink options={COMERCIAL_NAV}>
              <ComercialIcon />
              Comercial
            </NavLink>
            <NavLink options={MANTENIMIENTO_NAV}>
              <MantenimientoIcon />
              Mantenimiento
            </NavLink>
            <NavLink options={SEGURIDAD_NAV} lastItem>
              <SeguridadIcon />
              Seguridad
            </NavLink>
          </nav>
          <nav className="flex items-center md:items-end">
            <AyudaLink />
            <Logout />
          </nav>
        </div>
      </div>
    </header>
  );
}

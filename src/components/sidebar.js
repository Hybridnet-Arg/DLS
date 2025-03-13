'use client';
import Link from 'next/link';
import classNames from 'classnames';
import { signOut } from 'next-auth/react';
import { useState, useContext } from 'react';
import AuthContext from '@/context/auth/authContext';

import {
  ArticleIcon,
  CollapsIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  UsersIcon,
  VideosIcon,
} from './icons';

const menuItems = [
  { key: 1, id: 1, label: 'Bombas', icon: HomeIcon, link: '/schb' },
  {
    key: 2,
    id: 2,
    label: 'Planificador',
    icon: VideosIcon,
    link: '/schb/plan',
  },
  {
    key: 3,
    id: 3,
    label: 'Almacen',
    icon: UsersIcon,
    link: '/sistema-de-horas-de-bomba/almacen-agrupado',
  },
  //{ key: 3, id: 3, label: 'Almacen', icon: UsersIcon, link: '/schb/almacen' },
  { key: 4, id: 4, label: 'Logs', icon: ArticleIcon, link: '/schb/logs' },
  {
    key: 5,
    id: 5,
    label: 'Instructivo',
    icon: LogoIcon,
    link: '/InstructivoDMS.pdf',
  },
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const authContext = useContext(AuthContext);
  const { logout, usuario, perforador } = authContext;

  const handleClick = async () => {
    logout();
    await signOut({ callbackUrl: '/login' });
  };

  const wrapperClasses = classNames(
    'px-4 pb-1 bg-light flex justify-between flex-col text-slate-600 ease-out duration-500',
    {
      ['w-55']: !toggleCollapse,
      ['w-20']: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames('p-4 rounded  absolute right-0', {
    'rotate-180': toggleCollapse,
  });

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
    >
      <div className="flex flex-col ">
        <div className="flex items-center justify-between relative pt-6">
          <div className="flex items-center  pl-1 gap-4">
            <span
              className={classNames(' text-lg font-medium text-text', {
                hidden: toggleCollapse,
              })}
            >
              DMS-SCHB
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon />
            </button>
          )}
        </div>
        {perforador && perforador.acceso === 'GASOIL' ? (
          <></>
        ) : (
          <div className="flex flex-col items-start mt-8">
            {menuItems.map(({ icon: Icon, ...menu }) => {
              return (
                <div
                  key={menu.key}
                  className="flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap"
                >
                  <Link
                    key={menu.key}
                    href={menu.link}
                    className="flex py-4 px-3 items-center w-full h-full"
                  >
                    <div style={{ width: '2.5rem' }}>
                      <Icon />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          'text-md font-medium text-text-light'
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className=" px-3 py-4">
        <Link
          href=""
          onClick={handleClick}
          className="flex py-4 px-3 items-center w-full h-full"
        >
          <div style={{ width: '2.5rem' }}>
            <LogoutIcon />
          </div>
          {!toggleCollapse && (
            <>
              <span
                className={classNames('text-md font-medium text-text-light')}
              >
                {usuario}
              </span>
            </>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

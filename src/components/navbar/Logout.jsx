'use client';
import { useContext } from 'react';
import { signOut } from 'next-auth/react';
import AuthContext from '@/context/auth/authContext';

import { NavLink } from './NavLink';
import usePerforadoresStore from '@/store/perforadores.store';

function ProfilePicture() {
  return (
    <button className={'relative inline-block w-5 h-5'}>
      <img
        src={
          'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
        }
        alt="User Profile"
        className="object-cover w-full h-full rounded-full border-2 border-gray-300"
      />
    </button>
  );
}

export function Logout() {
  const { limpiarPerforadores } = usePerforadoresStore();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    logout();
    limpiarPerforadores();
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <NavLink lastItem alert handleOnClick={() => handleLogout()}>
      <div className="flex items-center space-x-2">
        <span className="text-xs md:text-sm whitespace-nowrap truncate">
          Cerrar sesión
        </span>
        <ProfilePicture />
      </div>
    </NavLink>
  );
}

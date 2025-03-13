'use client';
import React, { useContext } from 'react';
import ListaPerforadores from './listaPerforadores';
import AuthContext from '@/context/auth/authContext';
import FechaActual from './fechaActual';

const Header = () => {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  return (
    <>
      {usuario && (
        <header className="h-1/6 flex flex-col md:flex-row items-center justify-between ">
          <img className="w-14 ml-2 mb-1" src="/static/images/logo.png" />
          <ListaPerforadores />
          <FechaActual />
        </header>
      )}
    </>
  );
};
export default Header;

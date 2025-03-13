'use client';
/* eslint-disable react-hooks/rules-of-hooks */
import AuthContext from './authContext';
import React, { useReducer } from 'react';
import authReducer from './authReducer';
import {
  REGISTRAR_USUARIO,
  SELECCIONAR_PERFORADOR,
  LOGOUT,
} from '@/constants/dispachTypes.constant';

const authState = ({ children }) => {
  const initialState = {
    usuario: null,
    permisos: [],
    perforador: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registrarUsuario = (datos) => {
    dispatch({
      type: REGISTRAR_USUARIO,
      payload: datos,
    });
  };

  const seleccionarPerforador = (perforador) => {
    dispatch({
      type: SELECCIONAR_PERFORADOR,
      payload: perforador,
    });
  };
  const logout = () => {
    dispatch({
      type: LOGOUT,
      payload: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        usuario: state.usuario,
        permisos: state.permisos,
        perforador: state.perforador,
        registrarUsuario,
        seleccionarPerforador,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default authState;

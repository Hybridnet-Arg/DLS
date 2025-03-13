'use client';
import BaseContext from './baseContext';
import React, { useReducer } from 'react';
import baseReducer from './baseReducer';
import {
  GUARDAR_PIEZAS,
  GUARDAR_HORAS,
} from '@/constants/dispachTypes.constant';

const baseState = ({ children }) => {
  const initialState = {
    piezas: [],
    estado: null,
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, dispatch] = useReducer(baseReducer, initialState);

  const guardarPiezas = (data) => {
    dispatch({
      type: GUARDAR_PIEZAS,
      payload: data,
    });
  };

  const guardarEstado = (data) => {
    dispatch({
      type: GUARDAR_HORAS,
      payload: data,
    });
  };

  return (
    <BaseContext.Provider
      value={{
        piezas: state.piezas,
        estado: state.estado,
        guardarPiezas,
        guardarEstado,
      }}
    >
      {children}
    </BaseContext.Provider>
  );
};

export default baseState;

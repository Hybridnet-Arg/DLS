import axios from 'axios';
import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const getAllPerforadores = async (params) => {
  const { data } = await axios.get(ENDPOINTS.PERFORADORES.BASE, { params });
  return data;
};

export const getPerforadorByNumero = async (numero, params) => {
  const { data } = await axios.get(
    `${ENDPOINTS.PERFORADORES.BY_NUMERO}/${numero}`,
    {
      params,
    }
  );
  return data;
};

export const obtenerPerforadorSeleccionado = async (params) => {
  const { data } = await axios.get(
    ENDPOINTS.PERFORADORES.PERFORADOR_SELECCIONADO,
    { params }
  );
  return data;
};

export const guardarPerforadorSeleccionado = async (payload) => {
  const { data } = await clientAxios.post(
    ENDPOINTS.PERFORADORES.PERFORADOR_SELECCIONADO,
    payload
  );
  return data;
};

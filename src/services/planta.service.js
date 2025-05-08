import axios from 'axios';
import { ENDPOINTS } from '@/constants';

export const getBombasEstado = async (params) => {
  const { data } = await axios.get(ENDPOINTS.PLANTA.BOMBAS_ESTADO, { params });
  return data;
};

export const getTopDriveEstado = async (params) => {
  const { data } = await axios.get(ENDPOINTS.PLANTA.TOPDRIVE_ESTADO, {
    params,
  });
  return data;
};

export const getCableEstado = async (params) => {
  const { data } = await axios.get(ENDPOINTS.PLANTA.CABLE_ESTADO, {
    params,
  });
  return data;
};

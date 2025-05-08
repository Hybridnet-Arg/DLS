import axios from 'axios';
import { ENDPOINTS } from '@/constants';

export const getTanquesNiveles = async (params) => {
  const { data } = await axios.get(ENDPOINTS.TANQUES.NIVELES, { params });
  return data;
};

export const actualizarTanque = async (payload) => {
  const { data } = await axios.patch(ENDPOINTS.TANQUES.NIVELES, payload);
  return data;
};

export const cambiarTanque = async (payload) => {
  const { data } = await axios.post(ENDPOINTS.TANQUES.NIVELES, payload);
  return data;
};

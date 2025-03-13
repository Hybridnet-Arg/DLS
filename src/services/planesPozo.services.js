import axios from 'axios';
import { ENDPOINTS } from '@/constants';

export const createPlanPozo = async (payload) => {
  try {
    const { data } = await axios.post(ENDPOINTS.PLANES_POZO.BASE, payload);
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error desconocido';
    throw new Error(errorMessage);
  }
};

export const updatePlanPozo = async (id, payload) => {
  const { data } = await axios.put(
    `${ENDPOINTS.PLANES_POZO.BASE}/${id}`,
    payload
  );
  return data;
};

export const getAllPlanesPozo = async (params) => {
  const { data } = await axios.get(ENDPOINTS.PLANES_POZO.BASE, { params });
  return data;
};

export const finalizarPlanPozo = async (payload) => {
  const { data } = await axios.put(
    `${ENDPOINTS.PLANES_POZO.FINALIZAR}`,
    payload
  );
  return data;
};

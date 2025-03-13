import axios from 'axios';
import { ENDPOINTS } from '@/constants';

export const getAllEstadosPozo = async (params) => {
  const { data } = await axios.get(ENDPOINTS.ESTADOS_POZO.BASE, { params });
  return data;
};

import axios from 'axios';
import { ENDPOINTS } from '@/constants';

export const getAllPozos = async (params) => {
  const { data } = await axios.get(ENDPOINTS.POZOS.BASE, { params });
  return data;
};

export const createPozo = async (payload) => {
  const { data } = await axios.post(ENDPOINTS.POZOS.BASE, payload);
  return data;
};

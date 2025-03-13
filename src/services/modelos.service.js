import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const getAllModelos = async (params) => {
  const { data } = await clientAxios.get(ENDPOINTS.MODELOS.BASE, { params });
  return data;
};

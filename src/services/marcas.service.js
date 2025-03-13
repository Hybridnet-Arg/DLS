import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const getAllMarcas = async (params) => {
  const { data } = await clientAxios.get(ENDPOINTS.MARCAS.BASE, { params });
  return data;
};

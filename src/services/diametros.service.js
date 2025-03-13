import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerDiametros = async (params) => {
  const { data } = await clientAxios.get(ENDPOINTS.DIAMETROS.BASE, { params });
  return data;
};

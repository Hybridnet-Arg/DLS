import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerUbicaciones = async (params) => {
  const { data } = await clientAxios.get(ENDPOINTS.UBICACIONES.BASE, {
    params,
  });
  return data;
};

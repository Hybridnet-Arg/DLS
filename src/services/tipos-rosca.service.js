import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerTiposRosca = async (params) => {
  const { data } = await clientAxios.get(ENDPOINTS.TIPOS_ROSCA.BASE, {
    params,
  });
  return data;
};

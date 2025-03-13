import { SHDB_ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerMarcas = async (params = {}) => {
  const { data } = await clientAxios.get(`${SHDB_ENDPOINTS.MARCA.BASE}`, {
    params,
  });
  return data;
};

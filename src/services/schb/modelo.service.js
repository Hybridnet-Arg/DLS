import { SHDB_ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerModelos = async (params = {}) => {
  const { data } = await clientAxios.get(`${SHDB_ENDPOINTS.MODELO.BASE}`, {
    params,
  });
  return data;
};

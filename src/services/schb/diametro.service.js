import { SHDB_ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerDiametros = async (params = {}) => {
  const { data } = await clientAxios.get(`${SHDB_ENDPOINTS.DIAMETRO.BASE}`, {
    params,
  });
  return data;
};

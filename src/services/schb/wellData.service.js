import { SHDB_ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerWellData = async (params = {}) => {
  const { data } = await clientAxios.get(`${SHDB_ENDPOINTS.WELL_DATA.BASE}`, {
    params,
  });
  return data;
};

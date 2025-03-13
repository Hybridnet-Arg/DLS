import { SHDB_ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerPiezasPerforador = async (params = {}) => {
  const { data } = await clientAxios.get(
    `${SHDB_ENDPOINTS.PIEZAS_PERFORADOR.BASE}`,
    {
      params,
    }
  );
  return data;
};

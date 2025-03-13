import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerAreasPlanificacion = async (params = {}) => {
  const { data } = await clientAxios.get(ENDPOINTS.PLANIFICACION_AREAS.BASE, {
    params,
  });
  return data;
};

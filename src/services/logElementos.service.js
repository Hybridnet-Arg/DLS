import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerLogElementosPorFiltros = async (filters = {}) => {
  const { data } = await clientAxios.get(ENDPOINTS.LOG_ELEMENTOS.BASE, {
    params: filters,
  });

  return data;
};

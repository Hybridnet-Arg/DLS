import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerCronogramas = async (params = {}) => {
  const { data } = await clientAxios.get(ENDPOINTS.CRONOGRAMAS.BASE, {
    params,
  });
  return data;
};

export const crearCronograma = async (payload = {}) => {
  const { data } = await clientAxios.post(ENDPOINTS.CRONOGRAMAS.BASE, payload);
  return data;
};

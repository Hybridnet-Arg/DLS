import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerPerforadorLocaciones = async (params) => {
  const { data } = await clientAxios.get(ENDPOINTS.PERFORADOR_LOCACIONES.BASE, {
    params,
  });
  return data;
};

export const obtenerPerforadorLocacionPorPerforador = async (
  numero,
  params
) => {
  const endpoint = `${ENDPOINTS.PERFORADOR_LOCACIONES.BY_NUMERO}/${numero}`;
  const { data } = await clientAxios.get(endpoint, { params });
  return data;
};

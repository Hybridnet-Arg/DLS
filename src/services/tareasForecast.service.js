import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerTareasForecast = async (params = {}) => {
  const { data } = await clientAxios.get(ENDPOINTS.TAREAS_FORECAST.BASE, {
    params,
  });
  return data;
};

export const crearTareaForecast = async (payload = {}) => {
  const { data } = await clientAxios.post(
    ENDPOINTS.TAREAS_FORECAST.BASE,
    payload
  );
  return data;
};

export const obtenerTiposTareaForecast = async (params = {}) => {
  const { data } = await clientAxios.get(ENDPOINTS.TAREAS_FORECAST.TIPOS, {
    params,
  });
  return data;
};

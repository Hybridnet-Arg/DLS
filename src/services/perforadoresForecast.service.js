import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const crearPerforadorForecast = async (payload = {}) => {
  const { data } = await clientAxios.post(
    ENDPOINTS.PERFORADORES_FORECAST.BASE,
    payload
  );
  return data;
};

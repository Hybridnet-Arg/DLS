import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerAvancesDePozo = async (params = {}) => {
  const { data } = await clientAxios.get(`${ENDPOINTS.AVANCES_POZO.BASE}`, {
    params,
  });
  return data;
};

export const obtenerAvancesDePozoPorPerforador = async (
  numeroPerforador,
  params
) => {
  const { data } = await clientAxios.get(
    `${ENDPOINTS.AVANCES_POZO.BY_NUMERO_PERFORADOR}/${numeroPerforador}`,
    { params }
  );
  return data;
};

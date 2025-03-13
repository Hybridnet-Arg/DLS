import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerAvancesDePozo = async (params = {}) => {
  const { data } = await clientAxios.get(`${ENDPOINTS.AVANCES_POZO.BASE}`, {
    params,
  });
  return data;
};

export const getAvanceDePozoByNumeroPerforador = async (
  drillerNumber,
  params
) => {
  const { data } = await clientAxios.get(
    `${ENDPOINTS.AVANCES_POZO.BY_NUMERO_PERFORADOR}/${drillerNumber}`,
    { params }
  );
  return data;
};

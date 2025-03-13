import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerDesgasteCablePorPerforador = async (
  numeroPerforador,
  filters = {}
) => {
  const endpoint = `${ENDPOINTS.DESGASTES_CABLE.PERFORADOR}/${numeroPerforador}`;
  const { data } = await clientAxios.get(endpoint, {
    params: filters,
  });

  return data;
};

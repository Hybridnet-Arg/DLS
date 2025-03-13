import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const crearLocacionPerforadorCronograma = async (payload = {}) => {
  const { data } = await clientAxios.post(
    ENDPOINTS.LOCACIONES_PERFORADOR_CRONOGRAMA.BASE,
    payload
  );
  return data;
};

export const actualizarLocacionPerforadorCronograma = async (
  id,
  payload = {}
) => {
  const { data } = await clientAxios.put(
    `${ENDPOINTS.LOCACIONES_PERFORADOR_CRONOGRAMA.BASE}/${id}`,
    payload
  );
  return data;
};

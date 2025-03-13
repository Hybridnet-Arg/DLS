import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const crearPerforadorCronograma = async (payload = {}) => {
  const { data } = await clientAxios.post(
    ENDPOINTS.PERFORADORES_CRONOGRAMA.BASE,
    payload
  );
  return data;
};

/**
 * Fetches a specific perforador_cronograma by its ID.
 *
 * @param {string|number} id - The unique identifier of the PerforadorCronograma.
 * @param {Object} [queryParams={}] - Optional query parameters to include in the request.
 * @returns {Promise<Object>} A promise that resolves to the data of the requested PerforadorCronograma.
 * @throws Will throw an error if the request fails.
 */
export const obtenerPerforadorCronogramaPorId = async (
  id,
  queryParams = {}
) => {
  const { data } = await clientAxios.get(
    `${ENDPOINTS.PERFORADORES_CRONOGRAMA.BASE}/${id}`,
    {
      params: queryParams,
    }
  );
  return data;
};

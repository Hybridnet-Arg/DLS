import axios from '@/utils/clientAxios.util';
import { ENDPOINTS } from '@/constants';

export const getAllElementosComponenteByFilters = async (filters = {}) => {
  const { data } = await axios.get(ENDPOINTS.ELEMENTOS_COMPONENTE.BASE, {
    params: filters,
  });

  return data;
};

export const getElementosComponenteById = async (id, params) => {
  const { data } = await axios.get(
    `${ENDPOINTS.ELEMENTOS_COMPONENTE.BASE}/${id}`,
    { params }
  );
  return data;
};

export const getElementosComponenteByNumeroPerforador = async (
  numeroPerforador,
  params
) => {
  const { data } = await axios.get(
    `${ENDPOINTS.ELEMENTOS_COMPONENTE.BY_NUMERO_PERFORADOR}/${numeroPerforador}`,
    { params }
  );
  return data;
};

import { SHDB_ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerPiezas = async (params = {}) => {
  const { data } = await clientAxios.get(`${SHDB_ENDPOINTS.PIEZA.BASE}`, {
    params,
  });
  return data;
};

export const obtenerPiezaPorId = async (id, params = {}) => {
  const { data } = await clientAxios.get(`${SHDB_ENDPOINTS.PIEZA.BASE}/${id}`, {
    params,
  });
  return data;
};

export const obtenerTiposPieza = async (params = {}) => {
  const { data } = await clientAxios.get(
    `${SHDB_ENDPOINTS.PIEZA.TIPOS_PIEZA}`,
    {
      params,
    }
  );
  return data;
};

import { SHDB_ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerPerforadorPiezas = async (params = {}) => {
  const { data } = await clientAxios.get(
    `${SHDB_ENDPOINTS.PERFORADOR_PIEZA.BASE}`,
    {
      params,
    }
  );
  return data;
};

export const crearPerforadorPiezas = async (payload = {}) => {
  const { data } = await clientAxios.post(
    `${SHDB_ENDPOINTS.PERFORADOR_PIEZA.BASE}`,
    payload
  );
  return data;
};

export const actualizarPerforadorPiezaPorId = async (
  idPerforadorPieza,
  payload = {}
) => {
  const { data } = await clientAxios.put(
    `${SHDB_ENDPOINTS.PERFORADOR_PIEZA.BASE}/${idPerforadorPieza}`,
    payload
  );
  return data;
};

export const eliminarPerforadorPiezaPorId = async (idPerforadorPieza) => {
  const { data } = await clientAxios.delete(
    `${SHDB_ENDPOINTS.PERFORADOR_PIEZA.BASE}/${idPerforadorPieza}`
  );
  return data;
};

export const obtenerNroSerie = async (params = {}) => {
  const { data } = await clientAxios.post(
    `${SHDB_ENDPOINTS.NROSERIE.BASE}`,
    params
  );
  return data;
};

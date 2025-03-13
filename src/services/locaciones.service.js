import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const obtenerLocaciones = async (params = {}) => {
  const { data } = await clientAxios.get(ENDPOINTS.LOCACIONES.BASE, {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
    params,
  });
  return data;
};

export const obtenerLocacionesPorUbicacion = async () => {
  const { data } = await clientAxios.get(ENDPOINTS.LOCACIONES.POR_UBICACION, {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  });
  return data.locacionesPorUbicacion;
};

export const crearLocacion = async (locacionData) => {
  const { data } = await clientAxios.post(
    ENDPOINTS.LOCACIONES.BASE,
    locacionData
  );
  return data;
};

export const actualizarLocacion = async (locacionData) => {
  const formattedData = {
    ...locacionData,
    fecha_inicio: locacionData?.fecha_inicio
      ? new Date(locacionData?.fecha_inicio).toISOString()
      : null,
    fecha_fin: locacionData?.fecha_fin
      ? new Date(locacionData?.fecha_fin).toISOString()
      : null,
  };

  const { data } = await clientAxios.put(
    `${ENDPOINTS.LOCACIONES.BASE}/${locacionData?.id}`,
    formattedData
  );
  return data;
};

export const eliminarLocacion = async (id) => {
  const { data } = await clientAxios.delete(
    `${ENDPOINTS.LOCACIONES.BASE}/${id}`
  );
  return data;
};

export const obtenerLocacionesDisponibles = async () => {
  const { data } = await clientAxios.get(ENDPOINTS.LOCACIONES.DISPONIBLES);
  return data.locaciones;
};

import axios from 'axios';
import { ENDPOINTS } from '@/constants';

export const crearPlanificacion = async (payload) => {
  const { data } = await axios.post(ENDPOINTS.PLANIFICACIONES.BASE, payload);
  return data;
};

export const actualizarPlanificacion = async (payload) => {
  const { data } = await axios.patch(ENDPOINTS.PLANIFICACIONES.BASE, payload);
  return data;
};

export const obtenerPlanificaciones = async (params) => {
  const { data } = await axios.get(ENDPOINTS.PLANIFICACIONES.BASE, { params });
  return data;
};

export const eliminarPlanificacionPorTareaForecastId = async (id, params) => {
  const { data } = await axios.delete(
    `${ENDPOINTS.PLANIFICACIONES.TAREAS_FORECAST}/${id}`,
    {
      params,
    }
  );
  return data;
};

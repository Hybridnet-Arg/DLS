import axios from 'axios';
import { ENDPOINTS } from '@/constants';

export const getAllEstadosDiagrama = async (params) => {
  const { data } = await axios.get(ENDPOINTS.ESTADOS_DIAGRAMA.BASE, { params });
  return data;
};

export const getEstadoDiagramaByNumeroPerforador = async (numero, params) => {
  const { data } = await axios.get(
    `${ENDPOINTS.ESTADOS_DIAGRAMA.BY_NUMERO_PERFORADOR}/${numero}`,
    {
      params,
    }
  );
  return data;
};

export const updateStateDiagram = async (id, payload) => {
  const { data } = await axios.put(
    `${ENDPOINTS.ESTADOS_DIAGRAMA.BASE}/${id}`,
    payload
  );
  return data;
};

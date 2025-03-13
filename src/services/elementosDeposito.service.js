import axios from '@/utils/clientAxios.util';
import { ENDPOINTS } from '@/constants';

export const getAllElementosDepositoByFilters = async (
  filters = {},
  config = {}
) => {
  const { data } = await axios.get(ENDPOINTS.ELEMENTOS_DEPOSITO.BASE, {
    params: filters,
    ...config,
  });

  return data;
};

export const recambioElementoDeposito = async (id, recambioId) => {
  const base = ENDPOINTS.ELEMENTOS_DEPOSITO.BASE;
  const { data } = await axios.put(`${base}/${id}/recambio/${recambioId}`);
  return data;
};

export const cargarElementoDeposito = async (id) => {
  const base = ENDPOINTS.ELEMENTOS_DEPOSITO.BASE;
  const { data } = await axios.put(`${base}/${id}/carga`);
  return data;
};

export const obtenerElementoDepositoPorId = async (id) => {
  const { data } = await axios.get(
    `${ENDPOINTS.ELEMENTOS_DEPOSITO.BASE}/${id}`
  );
  return data;
};

export const crearElementoDeposito = async (payload) => {
  const { data } = await axios.post(ENDPOINTS.ELEMENTOS_DEPOSITO.BASE, payload);
  return data;
};

export const actualizarElementoDeposito = async (id, payload) => {
  const base = ENDPOINTS.ELEMENTOS_DEPOSITO.BASE;
  const { data } = await axios.put(`${base}/${id}`, payload);
  return data;
};

export const eliminarElementoDeposito = async (id) => {
  const base = ENDPOINTS.ELEMENTOS_DEPOSITO.BASE;
  const { data } = await axios.delete(`${base}/${id}`);
  return data;
};

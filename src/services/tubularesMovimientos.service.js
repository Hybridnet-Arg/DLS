import axios from 'axios';
import clientAxios from '@/utils/clientAxios.util';
import { CONFIG, ENDPOINTS } from '@/constants';

export const obtenerTubularesDestinos = async () => {
  const { data } = await clientAxios.get(ENDPOINTS.TUBULARES_DESTINOS.BASE);
  return data;
};

export const obtenerTubularesTalleres = async () => {
  const { data } = await clientAxios.get(ENDPOINTS.TUBULARES_TALLERES.BASE);
  return data;
};

export const obtenerTubularePorPerforador = async (
  idPerforador,
  params = {}
) => {
  const { data } = await clientAxios.get(
    `${ENDPOINTS.TUBULARES.POR_PERFORADOR}/${idPerforador}`,
    {
      params,
    }
  );
  return data;
};

export const obtenerTubularesMovimientos = async (params) => {
  const { data } = await clientAxios.get(ENDPOINTS.TUBULARES_MOVIMIENTOS.BASE, {
    params,
  });
  return data;
};

export const crearTubular = async (payload = {}) => {
  const { data } = await clientAxios.post(ENDPOINTS.TUBULARES.BASE, payload);
  return data;
};

export const actualizarTubular = async (id, payload = {}) => {
  const { data } = await clientAxios.patch(
    `${ENDPOINTS.TUBULARES.BASE}/${id}`,
    payload
  );
  return data;
};

export const crearDocumentosTubularMovimiento = async (payload) => {
  const formData = new FormData();

  if (payload?.fecha) {
    formData.append('fecha', payload?.fecha);
  }
  if (payload?.fecha_expiracion) {
    formData.append('fecha_expiracion', payload?.fecha_expiracion);
  }
  if (payload?.numero) {
    formData.append('numero', payload?.numero);
  }
  if (payload?.archivo) {
    formData.append('archivo', payload?.archivo);
  }
  if (payload?.tipo_documento) {
    formData.append('tipo_documento', payload?.tipo_documento);
  }
  if (payload?.tubulares_movimiento_id) {
    formData.append(
      'tubulares_movimiento_id',
      payload?.tubulares_movimiento_id
    );
  }

  const { data } = await axios.post(
    `${CONFIG.BASE_URL}${ENDPOINTS.TUBULARES_DOCUMENTOS.BASE}`,
    formData
  );

  return data;
};

export const crearTubularMovimiento = async (payload) => {
  const formData = new FormData();

  if (payload?.partida_inicial) {
    formData.append('partida_inicial', payload?.partida_inicial);
  }
  if (payload?.otro_perforador_id) {
    formData.append('otro_perforador_id', payload?.otro_perforador_id);
  }
  if (payload?.fecha) {
    formData.append('fecha', payload?.fecha);
  }
  if (payload?.fecha_expiracion_documento) {
    formData.append(
      'fecha_expiracion_documento',
      payload?.fecha_expiracion_documento
    );
  }
  if (payload?.estado) {
    formData.append('estado', payload?.estado);
  }
  if (payload?.archivo) {
    formData.append('archivo', payload?.archivo);
  }
  if (payload?.tipo_documento) {
    formData.append('tipo_documento', payload?.tipo_documento);
  }
  if (payload?.cantidad) {
    formData.append('cantidad', payload?.cantidad);
  }
  if (payload?.tubular_id) {
    formData.append('tubular_id', payload?.tubular_id);
  }
  if (payload?.tubulares_destino_id) {
    formData.append('tubulares_destino_id', payload?.tubulares_destino_id);
  }
  if (payload?.tubulares_taller_id) {
    formData.append('tubulares_taller_id', payload?.tubulares_taller_id);
  }
  if (payload?.tubulares_movimiento_origen_id) {
    formData.append(
      'tubulares_movimiento_origen_id',
      payload?.tubulares_movimiento_origen_id
    );
  }
  if (payload?.tubulares_estado_barra_id) {
    formData.append(
      'tubulares_estado_barra_id',
      payload?.tubulares_estado_barra_id
    );
  }
  if (payload?.tubulares_rango_id) {
    formData.append('tubulares_rango_id', payload?.tubulares_rango_id);
  }
  if (payload?.tubulares_tipo_barra_id) {
    formData.append(
      'tubulares_tipo_barra_id',
      payload?.tubulares_tipo_barra_id
    );
  }
  if (payload?.tubulares_tipo_conexion_id) {
    formData.append(
      'tubulares_tipo_conexion_id',
      payload?.tubulares_tipo_conexion_id
    );
  }

  const { data } = await axios.post(
    `${CONFIG.BASE_URL}${ENDPOINTS.TUBULARES_MOVIMIENTOS.BASE}`,
    formData
  );

  return data;
};

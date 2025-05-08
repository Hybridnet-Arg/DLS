import axios from 'axios';
import clientAxios from '@/utils/clientAxios.util';
import { ENDPOINTS, CONFIG } from '@/constants';

export const obtenerTubularesAdquisiciones = async (params) => {
  const { data } = await clientAxios.get(
    ENDPOINTS.TUBULARES_ADQUISICIONES.BASE,
    {
      params,
    }
  );
  return data;
};

export const obtenerTubularesRangos = async () => {
  const { data } = await clientAxios.get(ENDPOINTS.TUBULARES_RANGOS.BASE);
  return data;
};

export const obtenerTubularesProveedores = async () => {
  const { data } = await clientAxios.get(ENDPOINTS.TUBULARES_PROVEEDORES.BASE);
  return data;
};

export const obtenerTubularesTiposBarra = async () => {
  const { data } = await clientAxios.get(ENDPOINTS.TUBULARES_TIPOS_BARRA.BASE);
  return data;
};

export const obtenerTubularesTiposConexion = async () => {
  const { data } = await clientAxios.get(
    ENDPOINTS.TUBULARES_TIPOS_CONEXION.BASE
  );
  return data;
};

export const crearTubularesAdquisiciones = async (payload) => {
  const formData = new FormData();

  formData.append('cantidad', payload?.cantidad);
  formData.append('enlace_documento', payload?.enlace_documento);
  formData.append('perforador_nombre', payload?.perforador_nombre);
  formData.append('perforador_numero', payload?.perforador_numero);
  formData.append('numero_reporte', payload?.numero_reporte ?? '');
  formData.append('numero_remito', payload?.numero_remito ?? '');
  formData.append('tubulares_rango_id', payload?.tubulares_rango_id);
  formData.append('tubulares_proveedor_id', payload?.tubulares_proveedor_id);
  formData.append('tubulares_tipo_barra_id', payload?.tubulares_tipo_barra_id);
  formData.append('fecha', payload?.fecha);
  formData.append(
    'tubulares_tipo_conexion_id',
    payload?.tubulares_tipo_conexion_id
  );

  const { data } = await axios.post(
    `${CONFIG.BASE_URL}${ENDPOINTS.TUBULARES_ADQUISICIONES.BASE}`,
    formData
  );

  return data;
};

import { ENDPOINTS } from '@/constants';
import clientAxios from '@/utils/clientAxios.util';

export const cortarCable = async (payload) => {
  const { data } = await clientAxios.post(ENDPOINTS.CORTES_CABLE.BASE, payload);
  return data;
};

import { CONFIG } from '@/constants';
import axios from 'axios';

const defaultOptions = {
  baseURL: CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const clientAxios = axios.create(defaultOptions);

export default clientAxios;

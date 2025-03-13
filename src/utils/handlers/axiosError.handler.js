import { showToastError } from '@/utils/showToast.util';

export const handleAxiosError = (
  error,
  { toastOptions = {}, onError = () => {} } = {}
) => {
  const defaultMessage = 'Error inesperado';
  const errorMessage = error?.response?.data?.message || defaultMessage;

  showToastError(errorMessage, toastOptions);
  onError(error);
};

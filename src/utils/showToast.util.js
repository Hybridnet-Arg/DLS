import { toast } from 'sonner';

/**
 * Opciones predeterminadas para los toasts.
 * - `position`: Ubicación del toast en la pantalla.
 * - `duration`: Duración en milisegundos que el toast estará visible.
 */
const DEFAULT_TOAST_OPTIONS = {
  position: 'top-center',
  duration: 1500,
  dismissible: true,
  richColors: true,
};

/**
 * Muestra un toast con el tipo y mensaje especificados.
 *
 * @param {'error' | 'success' | 'warning' | 'info'} type - El tipo de toast.
 * @param {string} message - El mensaje que se mostrará en el toast.
 * @param {object} options - Opciones adicionales para personalizar el toast (opcional).
 */
const showToast = (type, message, options = {}) => {
  toast[type](message, {
    ...DEFAULT_TOAST_OPTIONS,
    ...options,
  });
};

/**
 * Muestra un toast de error.
 *
 * @param {string} message - El mensaje que se mostrará en el toast. Por defecto es 'Ocurrió un error'.
 * @param {object} options - Opciones adicionales para personalizar el toast (opcional).
 */
export const showToastError = (message = 'Ocurrió un error', options = {}) =>
  showToast('error', message, options);

/**
 * Muestra un toast de éxito.
 *
 * @param {string} message - El mensaje que se mostrará en el toast. Por defecto es 'Operación exitosa'.
 * @param {object} options - Opciones adicionales para personalizar el toast (opcional).
 */
export const showToastSuccess = (message = 'Operación exitosa', options = {}) =>
  showToast('success', message, options);

/**
 * Muestra un toast de advertencia.
 *
 * @param {string} message - El mensaje que se mostrará en el toast. Por defecto es 'Advertencia'.
 * @param {object} options - Opciones adicionales para personalizar el toast (opcional).
 */
export const showToastWarning = (message = 'Advertencia', options = {}) =>
  showToast('warning', message, options);

/**
 * Muestra un toast de información.
 *
 * @param {string} message - El mensaje que se mostrará en el toast. Por defecto es 'Información'.
 * @param {object} options - Opciones adicionales para personalizar el toast (opcional).
 */
export const showToastInfo = (message = 'Información', options = {}) =>
  showToast('info', message, options);

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { LOCALE_TIME, DATE_FORMATS } from '@/constants';

export const formatToDDMMYYYY = (dateRaw, defaultValue = 'DD/MM/AAAA') => {
  if (!dateRaw) return defaultValue;
  return new Date(dateRaw).toLocaleDateString(
    LOCALE_TIME,
    DATE_FORMATS.DD_MM_YYYY
  );
};
export const getValidatedDate = (rawDate) => {
  if (!rawDate) return;

  const parsedDate = new Date(rawDate);
  if (isNaN(parsedDate)) return;

  parsedDate.setDate(parsedDate.getDate() + 1);
  return parsedDate;
};

export const getDayNameInSpanish = (dateRaw) => {
  const newDate = new Date(dateRaw);
  const formattedDay = format(newDate, 'EEEE', { locale: es });
  return formattedDay;
};

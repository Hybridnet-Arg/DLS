import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { LOCALE_TIME, DATE_FORMATS } from '@/constants';

export const formatToDDMMYYYY = (
  dateRaw,
  { defaultValue = 'DD/MM/AAAA', formatter = DATE_FORMATS.DD_MM_YYYY } = {}
) => {
  if (!dateRaw) return defaultValue;
  return new Date(dateRaw).toLocaleDateString(LOCALE_TIME, formatter);
};

export const getValidatedDate = (rawDate) => {
  if (!rawDate) return;

  const parsedDate = new Date(rawDate);
  if (isNaN(parsedDate)) return;

  parsedDate.setDate(parsedDate.getDate() + 1);
  return parsedDate;
};

export const formatUTC = (date, { defaultValue = 'DD/MM/AAAA' } = {}) => {
  if (!date) return defaultValue;
  const utcDate = new Date(date);
  const dateTimeConfig = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  };
  const formatter = new Intl.DateTimeFormat('es-AR', dateTimeConfig);

  const formattedTime = formatter.format(utcDate);
  return formattedTime;
};

export const getDayNameInSpanish = (dateRaw) => {
  const newDate = new Date(dateRaw);
  const formattedDay = format(newDate, 'EEEE', { locale: es });
  return formattedDay;
};

export * from './config.constant';
export * from './endpoints.constant';
export * from './avancesPozo.constant';
export * from './tubulares.constant';

export const LOCALE_TIME = 'es-ES';
export const DATE_FORMATS = {
  DD_MM_YYYY: {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  },
  HH_MM: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
  DD_MM_YYYY_HH_MM: {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  },
  DD_MM_YYYY_HH_MM_SS: {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
    second: '2-digit',
  },
};

export const PERFORADORES_POR_PROVINCIA = {
  CRD: ['160', '172', '173', '174'],
  NQN: ['001', '161', '163', '165', '166', '167', '168', '169', '170'],
};

export const TOP_DRIVE_ELEMENTS = {
  WASH_PIPE: 4,
  UPPER_IBOP: 2,
  LOWER_IBOP: 1,
  SAVER_SUB: 3,
};
export const TOP_DRIVE_ELEMENTS_NAME = {
  [TOP_DRIVE_ELEMENTS.WASH_PIPE]: 'WashPipe',
  [TOP_DRIVE_ELEMENTS.UPPER_IBOP]: 'Upper IBOP',
  [TOP_DRIVE_ELEMENTS.LOWER_IBOP]: 'Lower IBOP',
  [TOP_DRIVE_ELEMENTS.SAVER_SUB]: 'Saver Sub',
};

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 5;

export const COOKIES = {
  LOGIN_ATTEMPTS: 'login-attempts',
};

export const CANTIDAD_POZOS_MAX = 8;
export const CANTIDAD_DE_POZOS_OPCIONES = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
];

export const UPLOAD_DIRECTORIES = {
  PRIVATE: {
    TUBULARES: 'private/tubulares',
  },
};

export const PLANTA_COLORES = {
  GREEN: 'green',
  YELLOW: 'yellow',
  RED: 'red',
  NONE: 'none',
};

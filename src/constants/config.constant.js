const LDAP = {
  URI: process.env.LDAP_URI || '',
  USER: process.env.LDAP_USER || '',
  PASS: process.env.LDAP_PASS || '',
};

const NEXTAUTH = {
  URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  SECRET: process.env.NEXTAUTH_SECRET || 'secret',
  LOGIN_ATTEMPTS: process.env.NEXTAUTH_LOGIN_ATTEMPTS
    ? Number(process.env.NEXTAUTH_LOGIN_ATTEMPTS)
    : 5,
  BLOCK_TIME_MINUTES: process.env.NEXTAUTH_BLOCK_TIME_MINUTES
    ? Number(process.env.NEXTAUTH_BLOCK_TIME_MINUTES)
    : 10,
};

const RECAPTCHA = {
  SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
  SECRET_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY || '',
};

const WORK_ENVS = {
  TEST: 'testing',
  PROD: 'production',
  DEV: 'development',
  TRAINING: 'training',
};

export const CONFIG = {
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || 'development',
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  NEXTAUTH,
  LDAP,
  RECAPTCHA,
  WORK_ENVS,
};

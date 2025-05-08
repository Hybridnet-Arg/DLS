import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, json, errors } = winston.format;

const LOGS_DIRECTORY = 'storage/logs/';

const transports = [
  new DailyRotateFile({
    filename: `${LOGS_DIRECTORY}%DATE%-app-logs.log`,
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
    level: 'info',
  }),
  new winston.transports.Console({
    level: 'debug',
  }),
];

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports,
});

export default logger;

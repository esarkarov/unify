import path from 'path';
import winston from 'winston';

const { colorize, combine, errors, printf, timestamp } = winston.format;

const logFormat = printf(({ level, message, stack, timestamp, ...metadata }) => {
  let log = `${timestamp} [${level}]: ${message}`;

  if (Object.keys(metadata).length > 0) {
    log += ` ${JSON.stringify(metadata)}`;
  }

  if (stack) {
    log += `\n${stack}`;
  }

  return log;
});

export const logger = winston.createLogger({
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), logFormat),
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    }),
    new winston.transports.File({
      filename: path.join('logs', 'error.log'),
      level: 'error',
      maxFiles: 5,
      maxsize: 5242880,
    }),
    new winston.transports.File({
      filename: path.join('logs', 'combined.log'),
      maxFiles: 5,
      maxsize: 5242880,
    }),
  ],
});

export const loggerStream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

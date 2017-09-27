import winston from 'winston';

export const logger = new winston.Logger({
  level: 'info',
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      level: 'debug',
      timestamp: true,
    }),
  ],
});

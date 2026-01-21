import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  exposedHeaders: [
    'Content-Length',
    'Content-Type',
    'X-Request-Id',
    'RateLimit-Limit',
    'RateLimit-Remaining',
    'RateLimit-Reset',
  ],
  maxAge: 86400,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 204,
  origin: process.env.FRONTEND_URL,
  preflightContinue: false,
};

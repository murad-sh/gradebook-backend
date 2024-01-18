import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: process.env.ORIGIN_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
};

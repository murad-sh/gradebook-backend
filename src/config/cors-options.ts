import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: process.env.ORIGIN_URL,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
};

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    DATABASE_URL: string;
    PORT: string;
    ORIGIN_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
  }
}

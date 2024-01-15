import { sign, verify } from 'jsonwebtoken';

import { TokenPayload } from '../types/token-payload';

const jwtSecret = process.env.JWT_SECRET || 'supersecret';
const expiration = process.env.JWT_EXPIRATION || '1h';

export const createToken = (payload: TokenPayload): string => {
  return sign(payload, jwtSecret, {
    expiresIn: expiration,
  });
};

export const verifyToken = (token: string) => {
  return verify(token, jwtSecret) as TokenPayload;
};

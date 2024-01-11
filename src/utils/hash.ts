import { hash, compare } from 'bcrypt';

export const hashPassword = (password: string) => hash(password, 12);

export const verifyPassword = (password: string, hashedPassword: string) =>
  compare(password, hashedPassword);

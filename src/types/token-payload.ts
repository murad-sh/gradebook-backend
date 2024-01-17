export type Role = 'TEACHER' | 'STUDENT';

export type TokenPayload = {
  id: string;
  role: Role;
  roleId: string;
};

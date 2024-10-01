import { Role } from '@prisma/client';

export class TokenData {
  sub: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

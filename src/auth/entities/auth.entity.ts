import { Role } from '@prisma/client';

export class Auth {
  message: string;
  accessToken: string;
}

export class TokenData {
  sub: string;
  name: string;
  email: string;
  role: Role;
}

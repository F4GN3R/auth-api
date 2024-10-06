import { Role } from '@prisma/client';

export class AuthResponse {
  message: string;
}

export class SignInResponse extends AuthResponse {
  accessToken: string;
}

export class TokenData {
  sub: string;
  name: string;
  email: string;
  role: Role;
}

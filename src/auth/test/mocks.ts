import { User } from '@prisma/client';
import { AccountRecoveryDto } from '../dto/account-recovery.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { SingInDto } from '../dto/sign-in.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { AuthResponse, SignInResponse } from '../entities/auth.entity';

// body mock data

const signInBodyMock: SingInDto = {
  email: 'john.doe@gmail.com',
  password: '123456789',
};

const updatePasswordBodyMock: UpdatePasswordDto = {
  password: '123456789',
  newPassword: '987654321',
};

const accountRecoveryBodyMock: AccountRecoveryDto = {
  email: 'john.doe@gmail.com',
};

const resetPasswordBodyMock: ResetPasswordDto = {
  password: '123456789',
  hash: 'd5e9bd0fdbe0586be8b8597c1fd3a3c',
};

// response mock data

const fullUserMock: User = {
  id: '1',
  name: 'John',
  email: 'john.doe@gmail.com',
  role: 'USER',
  password: '$2b$10$m7XSi5JZxOIWSbYiRhAqhuNypvHRF95STlVfkfR5DHhXLBY4Txpoq',
  dateExpirationRecoveryHash: new Date('2100-01-01T00:00:00.000Z'),
  recoveryHash: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const authResponseMock: AuthResponse = {
  message: 'Usuário autenticado com sucesso.',
};

const signInResponseMock: SignInResponse = {
  accessToken: 'd5e9bd0fdbe0586be8b8597c1fd3a3c',
  ...authResponseMock,
};

const resetPasswordResponseMock: SignInResponse = {
  ...signInResponseMock,
  message: 'Senha alterada com sucesso.',
};

export {
  signInBodyMock,
  updatePasswordBodyMock,
  accountRecoveryBodyMock,
  resetPasswordBodyMock,
  fullUserMock,
  authResponseMock,
  signInResponseMock,
  resetPasswordResponseMock,
};

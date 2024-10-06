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

const authResponseMock: AuthResponse = {
  message: 'Usuário autenticado com sucesso.',
};

const signInResponseMock: SignInResponse = {
  accessToken: 'd5e9bd0fdbe0586be8b8597c1fd3a3c',
  ...authResponseMock,
};

export {
  signInBodyMock,
  updatePasswordBodyMock,
  accountRecoveryBodyMock,
  resetPasswordBodyMock,
  authResponseMock,
  signInResponseMock,
};

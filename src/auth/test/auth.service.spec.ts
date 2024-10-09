import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { MailerSendService } from '../../mailersend/mailersend.service';
import { UserRepository } from '../../user/repositories/user.repository';
import {
  accountRecoveryBodyMock,
  fullUserMock,
  resetPasswordBodyMock,
  resetPasswordResponseMock,
  signInBodyMock,
  signInResponseMock,
  updatePasswordBodyMock,
} from './mocks';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;
  let jwtService: JwtService;
  let mailerSendService: MailerSendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,

        {
          provide: UserRepository,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            updatePassword: jest.fn(),
            updateHash: jest.fn().mockResolvedValue(true),
            findByHash: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockResolvedValue(signInResponseMock.accessToken),
          },
        },
        {
          provide: MailerSendService,
          useValue: {
            mailResetPassword: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
    mailerSendService = module.get<MailerSendService>(MailerSendService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(mailerSendService).toBeDefined();
  });

  describe('signIn', () => {
    it('should execute successfully and return a access token', async () => {
      const findByEmail = jest
        .spyOn(userRepository, 'findByEmail')
        .mockResolvedValue(fullUserMock);

      const response = await authService.singIn(signInBodyMock);

      expect(findByEmail).toHaveBeenCalledTimes(1);
      expect(findByEmail).toHaveBeenCalledWith(signInBodyMock.email);
      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(response).toEqual(signInResponseMock);
    });

    it('should return an error when the user does not exist', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

      try {
        await authService.singIn(signInBodyMock);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error).toHaveProperty(
          'message',
          'E-mail e/ou senha incorretos.',
        );
      }
    });

    it('should return an error when the password is incorrect', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

      try {
        await authService.singIn({ ...signInBodyMock, password: '987654321' });
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error).toHaveProperty(
          'message',
          'E-mail e/ou senha incorretos.',
        );
      }
    });
  });

  describe('updatePassword', () => {
    it('should execute successfully and return success message', async () => {
      const findById = jest
        .spyOn(userRepository, 'findById')
        .mockResolvedValue(fullUserMock);

      const response = await authService.updatePassword(
        fullUserMock.id,
        updatePasswordBodyMock,
      );

      expect(findById).toHaveBeenCalledTimes(1);
      expect(findById).toHaveBeenCalledWith(fullUserMock.id);

      expect(userRepository.updatePassword).toHaveBeenCalledTimes(1);
      expect(response).toEqual({ message: 'Senha alterada com sucesso.' });
    });

    it('should return an error when the user does not exist', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      try {
        await authService.updatePassword(
          fullUserMock.id,
          updatePasswordBodyMock,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error).toHaveProperty('message', 'Senha incorreta.');
      }
    });

    it('should return an error when the password is incorrect', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

      try {
        await authService.updatePassword(fullUserMock.id, {
          ...updatePasswordBodyMock,
          password: '987654321',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error).toHaveProperty('message', 'Senha incorreta.');
      }
    });
  });

  describe('accountRecovery', () => {
    it('should execute successfully and return success message', async () => {
      const findByEmail = jest
        .spyOn(userRepository, 'findByEmail')
        .mockResolvedValue(fullUserMock);

      const response = await authService.accountRecovery(
        accountRecoveryBodyMock,
      );

      expect(findByEmail).toHaveBeenCalledTimes(1);
      expect(findByEmail).toHaveBeenCalledWith(signInBodyMock.email);

      expect(userRepository.updateHash).toHaveBeenCalledTimes(1);
      expect(mailerSendService.mailResetPassword).toHaveBeenCalledTimes(1);
      expect(response).toEqual({
        message: `Caso o e-mail esteja cadastrado, você receberá uma mensagem em ${accountRecoveryBodyMock.email} com as instruções para definir uma nova senha.`,
      });
    });
  });

  describe('resetPassword', () => {
    it('should execute successfully and return success message', async () => {
      const findByHash = jest
        .spyOn(userRepository, 'findByHash')
        .mockResolvedValue(fullUserMock);

      const response = await authService.resetPassword(resetPasswordBodyMock);

      expect(findByHash).toHaveBeenCalledTimes(1);
      expect(findByHash).toHaveBeenCalledWith(resetPasswordBodyMock.hash);

      expect(userRepository.updatePassword).toHaveBeenCalledTimes(1);
      expect(response).toEqual(resetPasswordResponseMock);
    });

    it('should return an error when the user does not exist', async () => {
      jest.spyOn(userRepository, 'findByHash').mockResolvedValue(null);

      try {
        await authService.resetPassword(resetPasswordBodyMock);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error).toHaveProperty(
          'message',
          'Link de recuperação inválido.',
        );
      }
    });

    it('should return an error when the hash expiration date is invalid', async () => {
      jest.spyOn(userRepository, 'findByHash').mockResolvedValue({
        ...fullUserMock,
        dateExpirationRecoveryHash: new Date('2000-01-01T00:00:00.000Z'),
      });

      try {
        await authService.resetPassword(resetPasswordBodyMock);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error).toHaveProperty(
          'message',
          'Link de recuperação expirado.',
        );
      }
    });
  });
});

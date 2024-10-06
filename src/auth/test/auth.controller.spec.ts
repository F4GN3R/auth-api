import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import {
  accountRecoveryBodyMock,
  authResponseMock,
  resetPasswordBodyMock,
  signInBodyMock,
  signInResponseMock,
  updatePasswordBodyMock,
} from './mocks';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            singIn: jest.fn().mockResolvedValue(signInResponseMock),
            updatePassword: jest.fn().mockResolvedValue(authResponseMock),
            accountRecovery: jest.fn().mockResolvedValue(authResponseMock),
            resetPassword: jest.fn().mockResolvedValue(signInResponseMock),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('singIn', () => {
    it('must return the access token successfully', async () => {
      const response = await authController.singIn(signInBodyMock);
      expect(response).toEqual(signInResponseMock);
      expect(authService.singIn).toHaveBeenCalledTimes(1);
      expect(authService.singIn).toHaveBeenCalledWith(signInBodyMock);
    });

    it('should throw an exception', () => {
      jest.spyOn(authService, 'singIn').mockRejectedValueOnce(new Error());
      expect(authController.singIn(signInBodyMock)).rejects.toThrow();
    });
  });

  describe('updatePassword', () => {
    it('must execute successfully', async () => {
      const response = await authController.updatePassword(
        '1',
        updatePasswordBodyMock,
      );
      expect(response).toEqual(authResponseMock);
      expect(authService.updatePassword).toHaveBeenCalledTimes(1);
      expect(authService.updatePassword).toHaveBeenCalledWith(
        '1',
        updatePasswordBodyMock,
      );
    });

    it('should throw an exception', () => {
      jest
        .spyOn(authService, 'updatePassword')
        .mockRejectedValueOnce(new Error());
      expect(
        authController.updatePassword('1', updatePasswordBodyMock),
      ).rejects.toThrow();
    });
  });

  describe('accountRecovery', () => {
    it('must execute successfully', async () => {
      const response = await authController.accountRecovery(
        accountRecoveryBodyMock,
      );
      expect(response).toEqual(authResponseMock);
      expect(authService.accountRecovery).toHaveBeenCalledTimes(1);
      expect(authService.accountRecovery).toHaveBeenCalledWith(
        accountRecoveryBodyMock,
      );
    });

    it('should throw an exception', () => {
      jest
        .spyOn(authService, 'accountRecovery')
        .mockRejectedValueOnce(new Error());
      expect(
        authController.accountRecovery(accountRecoveryBodyMock),
      ).rejects.toThrow();
    });
  });

  describe('resetPassword', () => {
    it('must execute successfully', async () => {
      const response = await authController.resetPassword(
        resetPasswordBodyMock,
      );
      expect(response).toEqual(signInResponseMock);
      expect(authService.resetPassword).toHaveBeenCalledTimes(1);
      expect(authService.resetPassword).toHaveBeenCalledWith(
        resetPasswordBodyMock,
      );
    });

    it('should throw an exception', () => {
      jest
        .spyOn(authService, 'resetPassword')
        .mockRejectedValueOnce(new Error());
      expect(
        authController.resetPassword(resetPasswordBodyMock),
      ).rejects.toThrow();
    });
  });
});

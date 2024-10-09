import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { createUserBodyMock, updateUserBodyMock, userMock } from './mocks';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(userMock),
            findMe: jest.fn().mockResolvedValue(userMock),
            findAll: jest.fn().mockResolvedValue([userMock]),
            update: jest.fn().mockResolvedValue(userMock),
            remove: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should return the new user created', async () => {
      const response = await userController.create(createUserBodyMock);
      expect(response).toEqual(userMock);
      expect(userService.create).toHaveBeenCalledTimes(1);
      expect(userService.create).toHaveBeenCalledWith(createUserBodyMock);
    });

    it('should throw an exception', () => {
      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());
      expect(userController.create(createUserBodyMock)).rejects.toThrow();
    });
  });

  describe('findMe', () => {
    it('must return a user', async () => {
      const response = await userController.findMe('1');
      expect(response).toEqual(userMock);
      expect(userService.findMe).toHaveBeenCalledTimes(1);
      expect(userService.findMe).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      jest.spyOn(userService, 'findMe').mockRejectedValueOnce(new Error());
      expect(userController.findMe('1')).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const response = await userController.findAll();
      expect(response).toEqual([userMock]);
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(userService, 'findAll').mockRejectedValueOnce(new Error());
      expect(userController.findAll()).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('must return a user', async () => {
      const response = await userController.update('1', updateUserBodyMock);
      expect(response).toEqual(userMock);
      expect(userService.update).toHaveBeenCalledTimes(1);
      expect(userService.update).toHaveBeenCalledWith('1', updateUserBodyMock);
    });

    it('should throw an exception', () => {
      jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error());
      expect(userController.update('1', userMock)).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('must execute successfully', async () => {
      await userController.remove('1');
      expect(userService.remove).toHaveBeenCalledTimes(1);
      expect(userService.remove).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      jest.spyOn(userService, 'remove').mockRejectedValueOnce(new Error());
      expect(userController.remove('1')).rejects.toThrow();
    });
  });
});

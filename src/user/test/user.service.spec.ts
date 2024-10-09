import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import {
  createUserBodyMock,
  updateUserBodyMock,
  fullUserMock,
  userMock,
} from './mocks';
import { UserRepository } from '../repositories/user.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn(),
            findMe: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    it('should execute successfully and return a user', async () => {
      const findByEmail = jest
        .spyOn(userRepository, 'findByEmail')
        .mockResolvedValue(null);
      const create = jest
        .spyOn(userRepository, 'create')
        .mockResolvedValue(userMock);

      const response = await userService.create(createUserBodyMock);

      expect(findByEmail).toHaveBeenCalledTimes(1);
      expect(findByEmail).toHaveBeenCalledWith(createUserBodyMock.email);

      expect(create).toHaveBeenCalledTimes(1);
      expect(response).toEqual(userMock);
    });

    it('should return an error when the user already exists', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(fullUserMock);

      try {
        await userService.create(createUserBodyMock);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error).toHaveProperty('message', 'Usuário já cadastrado.');
      }
    });
  });

  describe('findMe', () => {
    it('should execute successfully and return a user', async () => {
      const findMe = jest
        .spyOn(userRepository, 'findMe')
        .mockResolvedValue(userMock);

      const response = await userService.findMe(userMock.id);

      expect(findMe).toHaveBeenCalledTimes(1);
      expect(findMe).toHaveBeenCalledWith(userMock.id);
      expect(response).toEqual(userMock);
    });

    it('should return an error when the user already not exists', async () => {
      jest.spyOn(userRepository, 'findMe').mockResolvedValue(null);

      try {
        await userService.findMe(userMock.id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error).toHaveProperty('message', 'Usuário não encontrado.');
      }
    });
  });

  describe('findAll', () => {
    it('should run successfully and return a list of users', async () => {
      const findAll = jest
        .spyOn(userRepository, 'findAll')
        .mockResolvedValue([userMock]);

      const response = await userService.findAll();
      expect(findAll).toHaveBeenCalledTimes(1);
      expect(response).toEqual([userMock]);
    });
  });

  describe('update', () => {
    it('should execute successfully and return a user', async () => {
      const findById = jest
        .spyOn(userRepository, 'findById')
        .mockResolvedValue(fullUserMock);
      const update = jest
        .spyOn(userRepository, 'update')
        .mockResolvedValue(userMock);

      const response = await userService.update(
        userMock.id,
        updateUserBodyMock,
      );

      expect(findById).toHaveBeenCalledTimes(1);
      expect(findById).toHaveBeenCalledWith(userMock.id);

      expect(update).toHaveBeenCalledTimes(1);
      expect(response).toEqual(userMock);
    });

    it('should return an error if the user does not exist', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      try {
        await userService.update(userMock.id, updateUserBodyMock);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error).toHaveProperty('message', 'Usuário não encontrado.');
      }
    });
  });

  describe('remove', () => {
    it('must execute successfully', async () => {
      const findById = jest
        .spyOn(userRepository, 'findById')
        .mockResolvedValue(fullUserMock);

      const remove = jest.spyOn(userRepository, 'remove').mockResolvedValue();

      await userService.remove(userMock.id);
      expect(findById).toHaveBeenCalledTimes(1);
      expect(findById).toHaveBeenCalledWith(userMock.id);
      expect(remove).toHaveBeenCalledTimes(1);
    });

    it('should return an error if the user does not exist', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      try {
        await userService.remove(userMock.id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error).toHaveProperty('message', 'Usuário não encontrado.');
      }
    });
  });
});

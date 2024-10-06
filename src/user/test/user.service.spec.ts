import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from '../../database/prisma.service';
import { userResponseMock } from './mocks';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockResolvedValue(userResponseMock),
              create: jest.fn().mockResolvedValue(userResponseMock),
              findMany: jest.fn().mockResolvedValue([userResponseMock]),
              update: jest.fn().mockResolvedValue(userResponseMock),
              delete: jest.fn().mockResolvedValue(null),
            },
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});

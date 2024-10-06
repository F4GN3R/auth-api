import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

// body mock data

const createUserBodyMock: CreateUserDto = {
  name: 'John Doe',
  email: 'john.doe@gmail.com',
  password: '123456789',
};

const updateUserBodyMock: UpdateUserDto = {
  email: 'john.doe@hotmail.com',
};

// response mock data

const userResponseMock: Partial<User> = {
  id: '1',
  name: 'John',
  email: 'john.doe@gmail.com',
  role: 'USER',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export { createUserBodyMock, updateUserBodyMock, userResponseMock };

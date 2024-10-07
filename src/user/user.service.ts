import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(body: CreateUserDto): Promise<Partial<User>> {
    const user = await this.userRepository.findByEmail(body.email);
    if (user) throw new BadRequestException('Usuário já cadastrado.');

    const encryptPassword = await bcrypt.hash(body.password, 10);
    return await this.userRepository.create({
      ...body,
      password: encryptPassword,
    });
  }

  async findMe(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findMe(id);
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    return user;
  }

  async findAll(): Promise<Partial<User>[]> {
    return await this.userRepository.findAll();
  }

  async update(id: string, body: UpdateUserDto): Promise<Partial<User>> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    return await this.userRepository.update(id, body);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    await this.userRepository.remove(id);
  }
}

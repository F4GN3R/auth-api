import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CreateUserDto): Promise<Partial<User>> {
    const user = await this.prismaService.user.findUnique({
      where: { email: body.email },
    });

    if (user) throw new BadRequestException('Usuário já cadastrado.');

    const encryptPassword = await bcrypt.hash(body.password, 10);
    return await this.prismaService.user.create({
      data: { ...body, password: encryptPassword },
      omit: { password: true },
    });
  }

  async findAll(): Promise<Partial<User>[]> {
    return await this.prismaService.user.findMany({ omit: { password: true } });
  }

  async update(id: string, body: UpdateUserDto): Promise<Partial<User>> {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    return await this.prismaService.user.update({
      where: { id },
      data: body,
      omit: { password: true },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    await this.prismaService.user.delete({ where: { id } });
  }
}

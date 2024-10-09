import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { User } from '@prisma/client';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { PrismaService } from '../../../database/prisma.service';

const OMIT_USER_FIELDS = {
  password: true,
  recoveryHash: true,
  dateExpirationRecoveryHash: true,
};

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  create(body: CreateUserDto): Promise<Partial<User>> {
    return this.prismaService.user.create({
      data: body,
      omit: OMIT_USER_FIELDS,
    });
  }

  findById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  findByHash(recoveryHash: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { recoveryHash } });
  }

  findMe(id: string): Promise<Partial<User>> {
    return this.prismaService.user.findUnique({
      where: { id },
      omit: OMIT_USER_FIELDS,
    });
  }

  findAll(): Promise<Partial<User>[]> {
    return this.prismaService.user.findMany({ omit: OMIT_USER_FIELDS });
  }

  update(id: string, body: UpdateUserDto): Promise<Partial<User>> {
    return this.prismaService.user.update({
      where: { id },
      data: body,
      omit: OMIT_USER_FIELDS,
    });
  }

  updatePassword(id: string, password: string): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: {
        password,
        recoveryHash: null,
        dateExpirationRecoveryHash: null,
      },
    });
  }

  updateHash(
    id: string,
    recoveryHash: string,
    dateExpirationRecoveryHash: Date,
  ): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: {
        recoveryHash,
        dateExpirationRecoveryHash,
      },
    });
  }

  remove(id: string): Promise<void> {
    this.prismaService.user.delete({ where: { id } });
    return;
  }
}

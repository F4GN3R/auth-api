import { User } from '@prisma/client';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

export abstract class UserRepository {
  abstract create(body: CreateUserDto): Promise<Partial<User>>;
  abstract findById(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findByHash(recoveryHash: string): Promise<User>;
  abstract findMe(id: string): Promise<Partial<User>>;
  abstract findAll(): Promise<Partial<User>[]>;
  abstract update(id: string, body: UpdateUserDto): Promise<Partial<User>>;
  abstract updatePassword(id: string, password: string): Promise<User>;
  abstract updateHash(
    id: string,
    recoveryHash: string,
    dateExpirationRecoveryHash: Date,
  ): Promise<User>;
  abstract remove(id: string): Promise<void>;
}

import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    description: 'Nome',
    minLength: 3,
    maxLength: 150,
    required: true,
    example: 'John Doe',
  })
  @MinLength(3, { message: 'O nome deve possuir no mínimo 3 caracteres.' })
  @MaxLength(150, { message: 'O nome deve possuir no máximo 150 caracteres.' })
  @IsNotEmpty({ message: 'O nome deve ser informado.' })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'E-mail',
    required: true,
    example: 'john.doe@gmail.com.br',
  })
  @IsEmail({}, { message: 'O e-mail não é válido.' })
  @IsNotEmpty({ message: 'O e-mail deve ser informado.' })
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Senha',
    minLength: 8,
    maxLength: 20,
    required: true,
  })
  @MinLength(8, { message: 'A senha deve possuir no mínimo 8 caracteres.' })
  @MaxLength(20, { message: 'A senha deve possuir no máximo 20 caracteres.' })
  @IsNotEmpty({ message: 'A senha deve ser informada.' })
  password: string;

  @ApiProperty({
    type: 'enum',
    description: 'Tipo de usuário',
    required: true,
    enum: [Role.USER, Role.ADMIN],
    default: Role.USER,
  })
  @IsIn([Role.USER, Role.ADMIN], { message: 'O tipo de usuário não é válido.' })
  @IsOptional()
  role?: Role;
}

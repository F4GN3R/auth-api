import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    type: 'string',
    description: 'Senha atual',
    required: true,
  })
  @IsString({ message: 'A senha atual deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha atual deve ser informada.' })
  password: string;

  @ApiProperty({
    type: 'string',
    description: 'Nova senha',
    minLength: 8,
    maxLength: 20,
    required: true,
  })
  @MinLength(8, {
    message: 'A nova senha deve possuir no mínimo 8 caracteres.',
  })
  @MaxLength(20, {
    message: 'A nova senha deve possuir no máximo 20 caracteres.',
  })
  @IsString({ message: 'A nova senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A nova senha deve ser informada.' })
  newPassword: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    type: 'string',
    description: 'Senha atual',
    required: true,
  })
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
  @IsNotEmpty({ message: 'A nova senha deve ser informada.' })
  newPassword: string;
}

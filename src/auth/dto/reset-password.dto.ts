import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    type: 'string',
    description: 'Hash de redefinição',
    required: true,
  })
  @IsString({ message: 'O hash deve ser uma string.' })
  @IsNotEmpty({ message: 'O hash de redefinição de senha deve ser informada.' })
  hash: string;

  @ApiProperty({
    type: 'string',
    description: 'Nova senha',
    required: true,
  })
  @IsString({ message: 'A nova senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A nova senha deve ser informada.' })
  password: string;
}

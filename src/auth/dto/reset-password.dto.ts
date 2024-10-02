import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    type: 'string',
    description: 'Hash de redefinição',
    required: true,
  })
  @IsNotEmpty({ message: 'O hash de redefinição de senha deve ser informada.' })
  hash: string;

  @ApiProperty({
    type: 'string',
    description: 'Nova senha',
    required: true,
  })
  @IsNotEmpty({ message: 'A nova senha deve ser informada.' })
  password: string;
}

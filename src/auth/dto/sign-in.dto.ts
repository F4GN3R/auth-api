import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SingInDto {
  @ApiProperty({
    type: 'string',
    description: 'E-mail',
    required: true,
    example: 'john.doe@gmail.com.br',
  })
  @IsEmail({}, { message: 'O e-mail não é válido.' })
  @IsString({ message: 'O e-mail deve ser uma string.' })
  @IsNotEmpty({ message: 'O e-mail deve ser informado.' })
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Senha',
    required: true,
  })
  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha deve ser informada.' })
  password: string;
}

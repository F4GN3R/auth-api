import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SingInDto {
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
    required: true,
  })
  @IsNotEmpty({ message: 'A senha deve ser informada.' })
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AccountRecoveryDto {
  @ApiProperty({
    type: 'string',
    description: 'E-mail',
    required: true,
    example: 'john.doe@gmail.com.br',
  })
  @IsString({ message: 'O e-mail deve ser uma string.' })
  @IsEmail({}, { message: 'O e-mail não é válido.' })
  @IsNotEmpty({ message: 'O e-mail deve ser informado.' })
  email: string;
}

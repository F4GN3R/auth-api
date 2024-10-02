import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AccountRecoveryDto {
  @ApiProperty({
    type: 'string',
    description: 'E-mail',
    required: true,
    example: 'john.doe@gmail.com.br',
  })
  @IsEmail({}, { message: 'O e-mail não é válido.' })
  @IsNotEmpty({ message: 'O e-mail deve ser informado.' })
  email: string;
}

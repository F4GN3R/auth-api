import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/decorators/is-public.decorator';
import { LoggedUser } from 'src/decorators/logged-user.decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AccountRecoveryDto } from './dto/account-recovery.dto';
import { SingInDto } from './dto/sign-in.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Autenticação')
@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 requests per minute for each user
  @Post('sign-in')
  @ApiOperation({ summary: 'Autenticar usuário' })
  singIn(@Body() body: SingInDto) {
    return this.authService.singIn(body);
  }

  @IsPublic()
  @Throttle({ default: { limit: 1, ttl: 60000 } }) // 1 requests per minute for each user
  @Patch('account-recovery')
  @ApiOperation({ summary: 'Enviar e-mail de recuperação de acesso.' })
  accountRecovery(
    @Body() body: AccountRecoveryDto,
  ): Promise<{ message: string }> {
    return this.authService.accountRecovery(body);
  }

  @Patch('update-password')
  @ApiOperation({
    summary: 'Alterar senha',
    description: 'Essa operação só pode ser feita pelo usuário logado.',
  })
  async updatePassword(
    @LoggedUser() id: string,
    @Body() body: UpdatePasswordDto,
  ): Promise<{ message: string }> {
    return this.authService.updatePassword(id, body);
  }

  @IsPublic()
  @Throttle({ default: { limit: 3, ttl: 60000 } }) // 3 requests per minute for each user
  @Patch('reset-password')
  @ApiOperation({ summary: 'Redefinir senha' })
  async resetPassword(
    @Body() body: ResetPasswordDto,
  ): Promise<{ message: string }> {
    return this.authService.resetPassword(body);
  }
}

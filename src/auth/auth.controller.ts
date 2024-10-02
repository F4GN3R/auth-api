import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { IsPublic } from 'src/decorators/is-public.decorator';
import { LoggedUser } from 'src/decorators/logged-user.decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AccountRecoveryDto } from './dto/account-recovery.dto';
import { SingInDto } from './dto/sign-in.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('sign-in')
  @ApiOperation({ summary: 'Autenticar usuário' })
  singIn(@Body() body: SingInDto) {
    return this.authService.singIn(body);
  }

  @IsPublic()
  @Patch('account-recovery')
  @ApiOperation({ summary: 'Enviar e-mail de recuperação de acesso.' })
  accountRecovery(
    @Body() body: AccountRecoveryDto,
  ): Promise<{ message: string }> {
    return this.authService.accountRecovery(body);
  }

  @Patch('update-password')
  @ApiOperation({ summary: 'Alterar senha' })
  async updatePassword(
    @LoggedUser() id: string,
    @Body() body: UpdatePasswordDto,
  ): Promise<{ message: string }> {
    return this.authService.updatePassword(id, body);
  }

  @IsPublic()
  @Patch('reset-password')
  @ApiOperation({ summary: 'Redefinir senha' })
  async resetPassword(
    @Body() body: ResetPasswordDto,
  ): Promise<{ message: string }> {
    return this.authService.resetPassword(body);
  }
}

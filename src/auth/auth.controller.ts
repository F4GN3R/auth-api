import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation } from '@nestjs/swagger';
import { IsPublic } from 'src/decorators/is-public.decorator';
import { LoggedUser } from 'src/decorators/logged-user.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuário' })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Patch('reset-password')
  @ApiOperation({ summary: 'Alterar senha' })
  async resetPassword(
    @LoggedUser() id: string,
    @Body() body: ResetPasswordDto,
  ): Promise<{ message: string }> {
    return this.authService.resetPassword(id, body);
  }

  // @Post('reset-password')
  // @ApiOperation({ summary: 'Reset password user' })
  // resetPassword(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Post('login')
  // @ApiOperation({ summary: 'Forgot password user' })
  // forgotPassword(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }
}

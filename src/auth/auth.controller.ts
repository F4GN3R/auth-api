import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation } from '@nestjs/swagger';
import { IsPublic } from 'src/decorators/is-public.decorator';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
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

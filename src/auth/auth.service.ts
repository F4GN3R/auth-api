import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenData } from './entities/auth.entity';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  checkToken(token: string): TokenData {
    return this.jwtService.verify(token);
  }

  async login(body: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.prismaService.user.findUnique({
      where: { email: body.email },
    });
    if (!user) throw new UnauthorizedException('E-mail e/ou senha incorretos.');

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword)
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');

    const accessToken = this.jwtService.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    return { accessToken };
  }

  async resetPassword(
    id: string,
    body: ResetPasswordDto,
  ): Promise<{ message: string }> {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new UnauthorizedException('Senha incorreta.');

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) throw new UnauthorizedException('Senha incorreta.');

    const encryptPassword = await bcrypt.hash(body.newPassword, 10);
    await this.prismaService.user.update({
      where: { id },
      data: { password: encryptPassword },
    });

    return { message: 'Senha alterada com sucesso.' };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenData } from './entities/auth.entity';

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

    const { id, name, email, role } = user;
    const accessToken = this.jwtService.sign({ sub: id, name, email, role });
    return { accessToken };
  }
}

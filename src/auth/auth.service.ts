import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  AuthResponse,
  SignInResponse,
  TokenData,
} from './entities/auth.entity';
import { randomUUID } from 'crypto';
import { AccountRecoveryDto } from './dto/account-recovery.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { SingInDto } from './dto/sign-in.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { User } from '@prisma/client';
import { MailerSendService } from '../mailersend/mailersend.service';
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly mailerSendService: MailerSendService,
  ) {}

  checkToken(token: string): TokenData {
    return this.jwtService.verify(token);
  }

  generateJwt(user: User): string {
    const { id, name, email, role } = user;
    return this.jwtService.sign({ sub: id, name, email, role });
  }

  async singIn(body: SingInDto): Promise<SignInResponse> {
    const user = await this.userRepository.findByEmail(body.email);
    if (!user) throw new UnauthorizedException('E-mail e/ou senha incorretos.');

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword)
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');

    return {
      accessToken: this.generateJwt(user),
      message: 'Usuário autenticado com sucesso.',
    };
  }

  async updatePassword(
    id: string,
    body: UpdatePasswordDto,
  ): Promise<AuthResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UnauthorizedException('Senha incorreta.');

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) throw new UnauthorizedException('Senha incorreta.');

    const encryptPassword = await bcrypt.hash(body.newPassword, 10);
    await this.userRepository.updatePassword(id, encryptPassword);
    return { message: 'Senha alterada com sucesso.' };
  }

  async accountRecovery(body: AccountRecoveryDto): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(body.email);

    if (user) {
      const recoveryHash = randomUUID();
      const dateExpiration = new Date();
      dateExpiration.setHours(dateExpiration.getHours() + 1);

      await Promise.all([
        this.userRepository.updateHash(user.id, recoveryHash, dateExpiration),
        this.mailerSendService.mailResetPassword(user, recoveryHash),
      ]);
    }

    return {
      message: `Caso o e-mail esteja cadastrado, você receberá uma mensagem em ${body.email} com as instruções para definir uma nova senha.`,
    };
  }

  async resetPassword(body: ResetPasswordDto): Promise<SignInResponse> {
    const user = await this.userRepository.findByHash(body.hash);
    if (!user) throw new BadRequestException('Link de recuperação inválido.');

    if (user.dateExpirationRecoveryHash <= new Date())
      throw new BadRequestException('Link de recuperação expirado.');

    const encryptPassword = await bcrypt.hash(body.password, 10);
    await this.userRepository.updatePassword(user.id, encryptPassword);

    return {
      accessToken: this.generateJwt(user),
      message: 'Senha alterada com sucesso.',
    };
  }
}

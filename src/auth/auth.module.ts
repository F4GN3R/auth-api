import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MailerSendModule } from 'src/mailersend/mailersend.module';
import { UserRepository } from 'src/user/repositories/user.repository';
import { PrismaUserRepository } from 'src/user/repositories/prisma/prisma-user.repository';

@Module({
  imports: [
    MailerSendModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}

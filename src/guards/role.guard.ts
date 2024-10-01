import {
  ExecutionContext,
  Injectable,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { ROLE_KEY } from 'src/decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<Role>(ROLE_KEY, context.getHandler());

    if (role) {
      const { user } = context.switchToHttp().getRequest();
      if (role === user.role) return true;
      throw new UnauthorizedException(
        'Você não tem autorização para realizar essa operação.',
      );
    }

    return true;
  }
}

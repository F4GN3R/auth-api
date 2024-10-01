import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { IS_PUBLIC_KEY } from 'src/decorators/is-public.decorator';

const JWT_ERRORS = {
  TokenExpiredError: 'Autenticação expirada, realize o login novamente.',
  JsonWebTokenError: 'Autenticação inválida, realize o login novamente.',
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const { headers } = context.switchToHttp().getRequest();
    const { authorization } = headers;
    if (authorization) {
      const authSplited = authorization.split(' ');

      if (!authorization.includes('Bearer') || authSplited.length !== 2)
        throw new UnauthorizedException('Método de autenticação inválido.');

      const jwt = authSplited[1];

      try {
        this.authService.checkToken(jwt);
        return true;
      } catch (error) {
        throw new UnauthorizedException(
          JWT_ERRORS[error.name] ??
            'Ocorreu um erro ao validar sua autenticação, realize o login novamente.',
        );
      }
    }

    throw new UnauthorizedException(
      'Autenticação necessária para realizar essa operação.',
    );
  }
}

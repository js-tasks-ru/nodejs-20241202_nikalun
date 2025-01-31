import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

const forbiddenError = 'Доступ запрещён: требуется роль admin';
const mainRole = 'admin';
const roleHeader = 'x-role';

export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const authorization = headers['authorization'];
    const data = authorization?.split(' ');
    const roleJwt = new JwtService().decode(data?.[1])?.role;
    const role = headers[roleHeader];

    let shouldThrowException = false;

    if (roleJwt) {
      shouldThrowException = roleJwt !== mainRole;
    } else {
      shouldThrowException = !role || role !== mainRole;
    }

    if (shouldThrowException) throw new ForbiddenException(forbiddenError);

    return true;
  }
}

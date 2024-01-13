

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class AdminAuthorizationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request['user'];

    console.log(user?.roles, 'this is the user role')
    if (request.user?.roles !== 'admin') {
      throw new ForbiddenException('Access denied');
    }
    
    return true;
  }
}

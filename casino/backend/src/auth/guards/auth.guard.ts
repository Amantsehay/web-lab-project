import {CanActivate, ExecutionContext, Injectable, UnauthorizedException,} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {JwtService} from "@nestjs/jwt";
import {Request} from "express";
import {IS_PUBLIC_KEY} from "../decorators/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
      private jwtService: JwtService,
      private reflector: Reflector,
  ) {
  }

  async canActivate(
      context: ExecutionContext,
  ): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
    );
    if (isPublic) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log('this is the tokene ', token)
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      request["user"] = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });
      console.log('user', request['user'])
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    console.log('Extracted Token:', token);
    return type === "Bearer" ? token : undefined;
  }
}

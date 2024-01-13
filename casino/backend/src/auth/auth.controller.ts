import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.services";
import { LoginDto } from "./dto/login.dto";

import { Public } from "./decorators/public.decorator";
import { SignUpDto } from "./dto/signUp.dto";
import { User } from "./schemas/user.schema";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // login endpoint

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("/login")
  logIn(@Body() loginDto: LoginDto) {
    return this.authService.logIn(
      loginDto.username,
      loginDto.password,
    );
  }

  //   signup endpoint

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("/signup")
  async signup(
    @Body(ValidationPipe) signupDto: SignUpDto,
  ): Promise<User> {
    console.log(process.env.JWT_EXPIRES);
    return await this.authService.singUP(
      signupDto,
    );
  }

  //   get user endpoint

  @Get("profile")
  getProfile(@Req() req: Request) {
    console.log(req.cookies);
    return req["user"];
  }
}

import {Controller, Post, Get, Req, Body, HttpCode, HttpStatus, ValidationPipe, UseGuards, Delete, Res, UnauthorizedException}
  from "@nestjs/common";
import { AuthService } from "./auth.services";
import { LoginDto } from "./dto/login.dto";
import { Public } from "./decorators/public.decorator";
import { SignUpDto } from "./dto/signup.dto";
import { User } from "./schemas/user.schema";
import { Request, response } from "express";
import { ACGuard, UseRoles } from "nest-access-control";
import { Param } from "@nestjs/common";
import {AuthGuard} from "./guards/auth.guard";
import { Response } from "express";

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


 @Post('block-user')
 @UseGuards(ACGuard)
 @UseRoles({
  possession: 'any',
  action: 'create',
  resource: 'block'
})
@Post('block/:email')
async blockUser(@Param('email') email: string) {
  const user = await this.authService.getUserByEmail(email);

  if (user) {
    await this.authService.blockUserByEmail(email);
    return { message: 'User blocked successfully' };
  } else {
    return { message: 'User not found' };
  }
}

@Post('unblock/:email')
async unblockUser(@Param('email') email: string) {
  const user = await this.authService.getUserByEmail(email);
  if (user) {
    await this.authService.unblockUserByEmail(email);
    return { message: 'User unblocked successfully' };
  } else {
    return { message: 'User not found' };
  }
}

  @Delete('delete-account')
  @UseGuards(AuthGuard)
  async deleteAccount(@Req() req: Request): Promise<{ message: string }> {
    const user  = req.user;
    if (!user) {
      throw new UnauthorizedException(
        
      )
    }
    console.log(user);
    return { message: 'Account deleted successfully' };
  }
}



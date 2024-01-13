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
  Param,
  Delete,
  UnauthorizedException,
  Patch,
  Query
} from "@nestjs/common";
import { AuthService } from "./auth.services";
import { LoginDto } from "./dto/login.dto";
import { Public } from "./decorators/public.decorator";
import { SignUpDto } from "./dto/signup.dto";
import { User } from "./schemas/user.schema";
import { Request } from "express";
import {
  ACGuard,
  UseRoles,
} from "nest-access-control";
import { AuthGuard } from "./guards/auth.guard";
import * as bcrypt from "bcryptjs";
import { use } from "passport";
import { AdminAuthorizationGuard } from "./guards/admin.authorization.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // login endpoint

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("/login")
  logIn(@Body() loginDto: LoginDto) {
    return this.authService.logIn(loginDto);
  }

  //   signup endpoint

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("/signup")
  async signup(
    @Body(ValidationPipe) signupDto: SignUpDto,
  ): Promise<void> {
    console.log(signupDto);
    return await this.authService.singUp(
      signupDto,
    );
  }

  //   get user endpoint

  @Get("profile")
  getProfile(@Req() req: Request) {
    console.log(req.cookies);
    return req["user"];
  }

  // block user endpoint

  @Post("block")
  @UseGuards(ACGuard)
  @UseGuards(AdminAuthorizationGuard)
  async blockUser(
    @Param("username") username: string,
  ) {
    const user =
      await this.authService.getUserByUsername(
        username,
      );

      console.log(user, 'this is the user in block user');

    if (user) {
      await this.authService.blockUserByUsername(
        user
      );
      return {
        message: "User blocked successfully",
      };
    } else {
      return { message: "User not found" };
    }
  }

  //unblock user endpoint

  @Post("unblock/:username")
  @UseGuards(AuthGuard)
  @UseGuards(AdminAuthorizationGuard)
  async unblockUser(
    @Param("username") username: string,
  ) {
    const user =
      await this.authService.getUserByUsername(
        username,
      );
    if (user) {
      await this.authService.unblockByUsername(
        username,
      );
      return {
        message: "User unblocked successfully",
      };
    } else {
      return { message: "User not found" };
    }
  }

  // delete user endpoint

  @Delete("delete-account")
  @UseGuards(AuthGuard)
  async deleteAccount(
    @Req() req: Request,
  ): Promise<{ message: string }> {
    const user = req["user"];
    console.log(user);
    console.log(user, "this is the usr in delete")
    if ('username' in user) 
    console.log(user.username, "this is the user in delete")
    if (!user) {
      throw new UnauthorizedException();
    }
    if ("username" in user) {
      await this.authService.deleteAccount(
        user.username,
      );
    } else {
      throw new UnauthorizedException(
        "User not found",
      );
    }

    // await this.authService.deleteAccount(user.username);
    return {
      message: "Account deleted successfully",
    };
  }


  @Post("update-password")
  @UseGuards(AuthGuard)
  async updatePassword(
    @Req() req: Request,
  ): Promise<{ message: string }> {
    const user = req["user"];

    if (!user || !("username" in user)) {
      throw new UnauthorizedException();
    }

    const newPassword = req.body.newPassword;
    if ('username' in user){
      const userName: string | unknown= user.username;

       await this.authService.updatePassword(
        user.username,
        newPassword,
      );
    }


    return {
      message: "Password updated successfully",
    };
  }



  @Patch("update-username")
  @UseGuards(AuthGuard)
  async updateUsername(
    @Req() req: Request,
  ): Promise<{ message: string }> {
    const user = req["user"];

    if (!user || !("username" in user)) {
      throw new UnauthorizedException();
    }
    const newUsername = req.body.newUsername;
    const confirmPassword = req.body.confirmPassword;

    console.log(user, "this is the user in update username")
    
    
    if ('username' in user){
      const userName: string | unknown = user.username;
      if (typeof userName === 'string'){
        console.log(userName, "this is the username")

        let hashedPassword = (await this.authService.getUserByUsername(userName)).password;
        let unHasehdPassword = bcrypt.compare(confirmPassword, hashedPassword);
        if (!unHasehdPassword){
          throw new UnauthorizedException();
        }
      }
      await this.authService.updateUsername(
        userName,
        newUsername,
      );
    }

    return {
      message: "Username updated successfully",
    };
  }


  @Get('user-amount')
  @UseGuards(AuthGuard)
  async getUserAmount(@Query('username') username: string): Promise<{amount: number}>{
    console.log(username, "this is the username")
    
    const curerntUsername = username
    const userAmount = await this.authService.getUserAmount(curerntUsername);
    return {
      amount: userAmount
    }
   
  }

  @Get('user')
  async getUser(@Query('username') username: string){

    const user = await this.authService.getUserByUsername(username);

    if (user)
    return user;

    else{
      return {'message': 'user not found'}
    }


  }
}








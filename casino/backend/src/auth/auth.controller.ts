import { Controller, Post, Body, Req, ParseIntPipe } from "@nestjs/common";
import  AuthService from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { UserService } from "src/models/user-folder/user.service";
import { Response } from "express";
import { Res } from "@nestjs/common";
import { Error, MongooseError } from "mongoose";


@Controller('auth')
class AuthController{
    constructor(private authService: AuthService){  

    }
    @Post('register')
  async register( @Body() body: AuthDto): Promise<any> {
    const oldUser = await this.authService.findOne(body.email);

    if(oldUser){
        return {message: "User already exists"}
    }
    
    const user =  await this.authService.createUser(body);
    return user;

  }

    @Post('login')
    async login(@Body() body: any,@Res({passthrough:true}) response: Response ){

        return this.authService.login(body.email, body.password, response);
        
    }
}


export default AuthController;
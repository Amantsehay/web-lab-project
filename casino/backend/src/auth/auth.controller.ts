import { Controller, Post, Body, Req, ParseIntPipe } from "@nestjs/common";
<<<<<<< HEAD
import  authService from "./auth.services";
import { AuthDto } from "./dto/auth.dto";
import { UserService } from "src/models/user-folder/user.service";
=======
import  AuthService from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { UserService } from "src/models/user-folder/user.service";
import { Response } from "express";
import { Res } from "@nestjs/common";
import { Error, MongooseError } from "mongoose";
>>>>>>> second-setup


@Controller('auth')
class AuthController{
<<<<<<< HEAD
    constructor(private authService: authService, private userService: UserService){  
=======
    constructor(private authService: AuthService){  
>>>>>>> second-setup

    }
    @Post('register')
  async register( @Body() body: AuthDto): Promise<any> {
<<<<<<< HEAD

  
    const oldUser = await this.authService.findOne(body.email);
    console.log(oldUser);
    if(oldUser){
        return "the user already exists  " + oldUser;

    }
    return await this.authService.register(body);
=======
    const oldUser = await this.authService.findOne(body.email);

    if(oldUser){
        return {message: "User already exists"}
    }
    
    const user =  await this.authService.createUser(body);
    return user;
>>>>>>> second-setup

  }

    @Post('login')
<<<<<<< HEAD
    public login(@Body() body: any):string{

        this.authService.login();
        return "the app is logged in"
=======
    async login(@Body() body: any,@Res({passthrough:true}) response: Response ){

        return this.authService.login(body.email, body.password, response);
        
>>>>>>> second-setup
    }
}


export default AuthController;
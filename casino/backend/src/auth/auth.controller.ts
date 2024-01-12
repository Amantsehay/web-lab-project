import { Controller, Post, Body, Req, ParseIntPipe } from "@nestjs/common";
import  authService from "./auth.services";
import { AuthDto } from "./dto/auth.dto";
import { UserService } from "src/models/user-folder/user.service";


@Controller('auth')
class AuthController{
    constructor(private authService: authService, private userService: UserService){  

    }
    @Post('register')
  async register( @Body() body: AuthDto): Promise<any> {

  
    const oldUser = await this.authService.findOne(body.email);
    console.log(oldUser);
    if(oldUser){
        return "the user already exists  " + oldUser;

    }
    return await this.authService.register(body);

  }

    @Post('login')
    public login(@Body() body: any):string{

        this.authService.login();
        return "the app is logged in"
    }
}


export default AuthController;
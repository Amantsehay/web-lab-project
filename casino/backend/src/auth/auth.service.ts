import {Injectable} from "@nestjs/common";
import {AuthDto} from "./dto/auth.dto";
import * as argon from "argon2"
import {User} from "src/models/user-folder/user.schema";
import {JwtService} from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from 'mongoose';
import { Response, Request} from "express";
import { ForbiddenException, UnauthorizedException } from "@nestjs/common";
import   {DatabaseService} from "src/db/database.service";

import { Res } from "@nestjs/common";

@Injectable()
class AuthService{
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService, private databaseService: DatabaseService
    ){}

    async validateUser(email: string, pass: string): Promise<User> {
        const user: User = await this.userModel.findOne({ email: email });
        if (!user) {
            throw new UnauthorizedException("the user doesn't exist");
        }
    
        const pwMatches = await argon.verify(user.password, pass);
    
        if (!pwMatches) {
            throw new ForbiddenException("You have Entered wrong password");
        }

        return user;
      }
    async findAll(): Promise<User[]>{
        return await this.userModel.find().exec();
    }

    async findOne(email: string): Promise<User>{
        console.log(this.userModel)
        return this.userModel.findOne({email: email});
    }

    async createUser (createUserDto: AuthDto) : Promise<any>{
        const hash = await argon.hash(createUserDto.password);
        createUserDto.password = hash;
        console.log(createUserDto);
        return this.databaseService.createUser(createUserDto);
        // const user =  new this.userModel(createUserDto);
        //
        
    }

    async login(email: string, password: string, response: Response): Promise<{ message: string }> {
        const user = await this.validateUser(email, password).catch(()=>{
            throw new Error("Something happend ")
        })
        const payload = { sub: user.email };
        const access_token: string = await this.jwtService.signAsync(payload);
        response.cookie('jwt', access_token, { httpOnly: true });
    
        return {
            message: 'success'
        };
    }

    async user(request: Request): Promise<any>{

        try{
            const cookie = request.cookies['jwt'];

            const data = await this.jwtService.verifyAsync(cookie);

            if (!data){
                throw new UnauthorizedException();
            }

            const user = await this.userModel.findOne({email: data['email']});
            const {password, ...result} = user;
            return result;

        }
        catch(e){

            throw new UnauthorizedException("Bad Cookie error ");

        }

    }
    
    async update(body: AuthDto) {
        // this method will accept the authdto and try to update the 

        const vUser = await this.validateUser(body.email, body.password);

        if (vUser){
            
        }
        return Promise.resolve(undefined);
    }

    delete(body: AuthDto) {
        return Promise.resolve(undefined);
    }

    async logout(@Res({passthrough: true}) response: Response)  {

        response.clearCookie('jwt');

        return {
            message: "succses"
        }
        

    }


}

export default AuthService;
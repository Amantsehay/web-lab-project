import {HttpException, HttpStatus, Injectable,} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./schemas/user.schema";
import * as bcrypt from "bcryptjs";
import {JwtService} from "@nestjs/jwt";
import {SignUpDto} from "./dto/signup.dto";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // login service

  async logIn( username: string, pass: string): Promise<any> {
    const user = await this.userModel
      .findOne({ username: username })
      .lean()
      .exec();

      
      if (!user) {
        throw new HttpException(
          "User not found",
          HttpStatus.NOT_FOUND,
          );
          
          
        } 
        const isPasswordValid = await bcrypt.compare(
          pass,
          user.password,
        );
    if (!isPasswordValid) {
      throw new HttpException(
        "Invalid password",
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      sub: user.email,
      username: user.username,

    };

    const access_token: string = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES,
    })
   
    
    return {
      access_token
    };
  }

  //   signup service

  async singUP(
    signupDto: SignUpDto,
  ): Promise<any> {
    const emailExits =
      await this.userModel.findOne({
        email: signupDto.email,
      });
    const usernameExits =
      await this.userModel.findOne({
        username: signupDto.username,
      });

    if (emailExits) {
      return { error: "email already exist" };
    } else if (usernameExits) {
      return { error: "username already taken" };
    }

    const salt = await bcrypt.genSalt(10);
    signupDto.password = await bcrypt.hash(
        signupDto.password,
        salt,
    );
    const user = new this.userModel(signupDto);
    return await user.save();
  }
  

  async blockUserByEmail(email: string): Promise<void> {
    await this.userModel.findOneAndUpdate({ email }, { isBlocked: true });
  }

  async unblockUserByEmail(email: string): Promise<void> {
    await this.userModel.findOneAndUpdate({ email }, { isBlocked: false });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  deleteUser(userId: any) {
    
  }
}

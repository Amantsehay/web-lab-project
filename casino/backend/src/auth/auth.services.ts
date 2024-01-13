import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Req,

} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { SignUpDto } from "./dto/signup.dto";
import { Response } from "express";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // login service

  async logIn(loginDto: LoginDto): Promise<any> {
    const user = await this.userModel
      .findOne({ username: loginDto.username })
      .lean()
      .exec();

    if (!user) {
      throw new HttpException(
        "User not found",
        HttpStatus.NOT_FOUND,
      );
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
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
      roles: user.roles,
      currentBalance: user.currentBalance,
    };

    const accessToken: string =
      await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES,
      });

    return {
      accessToken,
    };
  }

  //   signup service

  async singUp(
    signupDto: SignUpDto,
  ): Promise<any> {
    console.log(signupDto);
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

    const unhashed = signupDto.password;
    const salt = await bcrypt.genSalt(10);
    signupDto.password = await bcrypt.hash(
      signupDto.password,
      salt,
    );
    const user = new this.userModel(signupDto);
    await user.save();
    // this.logIn(signupDto.username, unhashed);
    return { msg: "registration successful" };
  }

  async unblockByUsername(
    username: string,
  ): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { username },
      { isBlocked: false },
    );
  }

  async getUserByEmail(
    email: string,
  ): Promise<User | null> {
    return this.userModel
      .findOne({ email })
      .exec();
  }

  deleteUser(userId: any) {}

  async getUserByUsername(username: string) {
    const user =  this.userModel
      .findOne({ username })
      .exec();
    return user;
     
  }

  async blockUserByUsername(user : User | null) {
    await this.userModel.findOneAndUpdate(
      { username: user.username },
      { isBlocked: true },
    );

  }

  async deleteAccount(
    username: string | unknown,
  ) {
    await this.userModel
      .findOneAndDelete({ username })
      .exec();
  }


  async updatePassword(username: string | unknown, newPassword: string): Promise<void> {
    const user = await this.userModel.findOne({ username }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
  }

  async updateUsername(currentUsername: string | unknown, newUsername: string): Promise<void> {
    const user = await this.userModel.findOne({ username: currentUsername }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.username = newUsername;

    await user.save();
  }


  async getUserAmount(userName: string | unknown): Promise<number> {
    const user = this.userModel.findOne({username: userName}).exec();
    console.log('this method is being called ')
    console.log(user);
    return (await user).currentBalance;
  }
}

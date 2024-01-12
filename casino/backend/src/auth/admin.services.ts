// import {
//     HttpException,
//     HttpStatus,
//     Injectable,
//     NotFoundException,
//   } from "@nestjs/common";
//   import { InjectModel } from "@nestjs/mongoose";
//   import { Model } from "mongoose";
//   import { Admin } from "./schemas/admin.schema";
//   import * as bcrypt from "bcryptjs";
//   import { JwtService } from "@nestjs/jwt";
//   import {SinUpDto as  AdminSignUpDto} from '../'
//   import { AdminLoginDto } from "./dto/login.dto";
  
//   @Injectable()
//   export class AdminService {
//     constructor(
//       @InjectModel(Admin.name)
//       private adminModel: Model<Admin>,
//       private jwtService: JwtService,
//     ) {}
  
//     // Admin login service
  
//     async adminLogin(adminLoginDto: AdminLoginDto): Promise<any> {
//       const admin = await this.adminModel
//         .findOne({ username: adminLoginDto.username })
//         .lean()
//         .exec();
  
//       if (!admin) {
//         throw new HttpException(
//           "Admin not found",
//           HttpStatus.NOT_FOUND,
//         );
//       }
  
//       const isPasswordValid = await bcrypt.compare(
//         adminLoginDto.password,
//         admin.password,
//       );
  
//       if (!isPasswordValid) {
//         throw new HttpException(
//           "Invalid password",
//           HttpStatus.UNAUTHORIZED,
//         );
//       }
  
//       const payload = {
//         sub: admin.email,
//         username: admin.username,
//         roles: admin.roles,
//       };
  
//       const accessToken: string =
//         await this.jwtService.signAsync(payload, {
//           secret: process.env.JWT_SECRET,
//           expiresIn: process.env.JWT_EXPIRES,
//         });
  
//       return {
//         accessToken,
//       };
//     }
  
//     // Admin signup service
  
//     async adminSignup(
//       adminSignupDto: AdminSignUpDto,
//     ): Promise<any> {
//       const emailExists = await this.adminModel.findOne({
//         email: adminSignupDto.email,
//       });
  
//       const usernameExists = await this.adminModel.findOne({
//         username: adminSignupDto.username,
//       });
  
//       if (emailExists) {
//         return { error: "Email already exists" };
//       } else if (usernameExists) {
//         return { error: "Username already taken" };
//       }
  
//       const salt = await bcrypt.genSalt(10);
//       adminSignupDto.password = await bcrypt.hash(
//         adminSignupDto.password,
//         salt,
//       );
  
//       const admin = new this.adminModel(adminSignupDto);
//       await admin.save();
  
//       return { msg: "Admin registration successful" };
//     }
  
//     async deleteAdminAccount(
//       adminUsername: string | unknown,
//     ): Promise<void> {
//       await this.adminModel
//         .findOneAndDelete({ username: adminUsername })
//         .exec();
//     }
  
//     async updateAdminPassword(
//       adminUsername: string | unknown,
//       newPassword: string,
//     ): Promise<void> {
//       const admin = await this.adminModel
//         .findOne({ username: adminUsername })
//         .exec();
  
//       if (!admin) {
//         throw new NotFoundException("Admin not found");
//       }
  
//       const hashedPassword = await bcrypt.hash(newPassword, 10);
//       admin.password = hashedPassword;
//       await admin.save();
//     }
  
//     async updateAdminUsername(
//       adminUsername: string | unknown,
//       newUsername: string,
//     ): Promise<void> {
//       const admin = await this.adminModel
//         .findOne({ username: adminUsername })
//         .exec();
  
//       if (!admin) {
//         throw new NotFoundException("Admin not found");
//       }
  
//       admin.username = newUsername;
  
//       await admin.save();
//     }
  
//     async getAdminAmount(
//       adminUsername: string | unknown,
//     ): Promise<number> {
//       const admin = await this.adminModel
//         .findOne({ username: adminUsername })
//         .exec();
  
//       if (!admin) {
//         throw new NotFoundException("Admin not found");
//       }
  
//       return admin.currentBalance;
//     }
  
//     async getAdminByUsername(
//       adminUsername: string,
//     ): Promise<Admin | null> {
//       return this.adminModel
//         .findOne({ username: adminUsername })
//         .exec();
//     }
//   }
  
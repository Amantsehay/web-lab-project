// import {
//     Controller,
//     Post,
//     Get,
//     Body,
//     HttpCode,
//     HttpStatus,
//     ValidationPipe,
//     UseGuards,
//     Param,
//     Delete,
//     Patch,
//     Query,
//   } from "@nestjs/common";
//   import { AdminService } from "./admin.service";
//   import { AdminLoginDto } from "./dto/admin-login.dto";
//   import { Public } from "./decorators/public.decorator";
//   import { AdminSignUpDto } from "./dto/admin-signup.dto";
//   import { Request } from "express";
//   import { ACGuard, UseRoles } from "nest-access-control";
//   import { AuthGuard } from "./guards/auth.guard";
  
//   @Controller("admin")
//   export class AdminController {
//     constructor(private adminService: AdminService) {}
  
//     // Admin login endpoint
  
//     @Public()
//     @HttpCode(HttpStatus.OK)
//     @Post("/login")
//     adminLogin(@Body() adminLoginDto: AdminLoginDto) {
//       return this.adminService.adminLogin(adminLoginDto);
//     }
  
//     // Admin signup endpoint
  
//     @Public()
//     @HttpCode(HttpStatus.OK)
//     @Post("/signup")
//     async adminSignup(
//       @Body(ValidationPipe) adminSignupDto: AdminSignUpDto,
//     ): Promise<void> {
//       console.log(adminSignupDto);
//       return await this.adminService.adminSignup(adminSignupDto);
//     }
  
//     // Get admin profile endpoint
  
//     @Get("profile")
//     @UseGuards(AuthGuard)
//     @UseRoles({
//       possession: "any",
//       action: "read",
//       resource: "profile",
//     })
//     getAdminProfile(@Req() req: Request) {
//       console.log(req.cookies);
//       return req["user"];
//     }
  
//     // Delete admin account endpoint
  
//     @Delete("delete-account")
//     @UseGuards(AuthGuard)
//     @UseRoles({
//       possession: "own",
//       action: "delete",
//       resource: "profile",
//     })
//     async deleteAdminAccount(
//       @Req() req: Request,
//     ): Promise<{ message: string }> {
//       const admin = req["user"];
  
//       if (!admin || !("username" in admin)) {
//         throw new UnauthorizedException();
//       }
  
//       if ("username" in admin) {
//         await this.adminService.deleteAdminAccount(admin.username);
//       } else {
//         throw new UnauthorizedException("Admin not found");
//       }
  
//       return {
//         message: "Admin account deleted successfully",
//       };
//     }
  
//     // Update admin password endpoint
  
//     @Patch("update-password")
//     @UseGuards(AuthGuard)
//     @UseRoles({
//       possession: "own",
//       action: "update",
//       resource: "profile",
//     })
//     async updateAdminPassword(
//       @Req() req: Request,
//     ): Promise<{ message: string }> {
//       const admin = req["user"];
  
//       if (!admin || !("username" in admin)) {
//         throw new UnauthorizedException();
//       }
  
//       const newPassword = req.body.newPassword;
  
//       if ("username" in admin) {
//         const adminUsername: string | unknown = admin.username;
  
//         if (typeof adminUsername === "string") {
//           await this.adminService.updateAdminPassword(
//             adminUsername,
//             newPassword,
//           );
//         }
//       }
  
//       return {
//         message: "Admin password updated successfully",
//       };
//     }
  
//     // Update admin username endpoint
  
//     @Patch("update-username")
//     @UseGuards(AuthGuard)
//     @UseRoles({
//       possession: "own",
//       action: "update",
//       resource: "profile",
//     })
//     async updateAdminUsername(
//       @Req() req: Request,
//     ): Promise<{ message: string }> {
//       const admin = req["user"];
  
//       if (!admin || !("username" in admin)) {
//         throw new UnauthorizedException();
//       }
  
//       const newUsername = req.body.newUsername;
//       const confirmPassword = req.body.confirmPassword;
  
//       console.log(admin, "this is the admin in update username");
  
//       if ("username" in admin) {
//         const adminUsername: string | unknown = admin.username;
  
//         if (typeof adminUsername === "string") {
//           console.log(adminUsername, "this is the username");
  
//           let hashedPassword = (
//             await this.adminService.getAdminByUsername(adminUsername)
//           ).password;
//           let unHasehdPassword = bcrypt.compare(
//             confirmPassword,
//             hashedPassword,
//           );
//           if (!unHasehdPassword) {
//             throw new UnauthorizedException();
//           }
//         }
//         await this.adminService.updateAdminUsername(
//           adminUsername,
//           newUsername,
//         );
//       }
  
//       return {
//         message: "Admin username updated successfully",
//       };
//     }
  
//     // Get admin amount endpoint
  
//     @Get('admin-amount')
//     @UseGuards(AuthGuard)
//     async getAdminAmount(@Query('username') username: string): Promise<{amount: number}>{
//       console.log(username, "this is the username");
      
//       const currentAdminUsername = username;
//       const adminAmount = await this.adminService.getAdminAmount(currentAdminUsername);
//       return {
//         amount: adminAmount
//       }
     
//     }
  
//     // Get admin by username endpoint
  
//     @Get('admin')
//     async getAdmin(@Query('username') username: string){
  
//       const admin = await this.adminService.getAdminByUsername(username);
  
//       if (admin)
//         return admin;
  
//       else{
//         return {'message': 'Admin not found'}
//       }
//     }
//   }
  
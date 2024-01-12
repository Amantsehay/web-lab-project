import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./auth/schemas/user.schema";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.services";
import { JwtService } from "@nestjs/jwt";
import { AccessControlModule } from "nest-access-control";
import {roles} from './auth/roles/user.roles'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URL_LOCAL,
    ),
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
    ]),
    AuthModule,
    AccessControlModule.forRoles(roles),
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    AuthService,
    JwtService,
  ],
})
export class AppModule {}

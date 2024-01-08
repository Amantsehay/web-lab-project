import { Module, Session } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.services";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { UserSchema } from "./schemas/user.schema";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards/auth.guard";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES,
      },
    }),

    MongooseModule.forFeature([
      {
        name: "User",
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AuthModule {}

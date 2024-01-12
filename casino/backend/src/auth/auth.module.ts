import { Module, Session } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.services";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { UserSchema } from "./schemas/user.schema";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards/auth.guard";
import { GameSchema } from "./schemas/game.schema";
import { GameController } from "./game.controller";
import {GameService} from "./game.service";

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
    MongooseModule.forFeature([
      {name: "Game", schema: GameSchema}
    ])
  ],
  controllers: [AuthController, GameController],
  providers: [
    AuthService, GameService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AuthModule {}

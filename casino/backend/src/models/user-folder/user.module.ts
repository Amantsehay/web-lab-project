import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DatabaseModule } from "src/db/database.module";


@Module({
<<<<<<< HEAD
    imports: [DatabaseModule],
=======
    imports: [],
>>>>>>> second-setup
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule{
   

}


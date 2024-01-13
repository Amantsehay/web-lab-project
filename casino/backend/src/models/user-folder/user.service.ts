import { Injectable } from "@nestjs/common";
import {User} from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from "mongoose"
import { UserModule } from "./user.module";
import { AuthDto } from "src/auth/dto/auth.dto";
import {DatabaseService} from "src/db/database.service";

@Injectable()
export class UserService{
    
}


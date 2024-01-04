import { Injectable } from "@nestjs/common";
import {DatabaseService} from "src/db/database.service";
import { AuthDto } from "./dto/auth.dto";
import * as argon from "argon2"
import { User } from "src/models/user-folder/user.schema";


@Injectable()
class AuthService{
    constructor(private databaseService: DatabaseService){

    }
    async register(dto: AuthDto): Promise<any>{
        const hashedPassword = await argon.hash(dto.password);
        dto.password = hashedPassword;
        return await this.databaseService.createUser(dto);
        
       
    }
    async findOne(email: string): Promise<User>{
        return await this.databaseService.findOne(email);
    }
    public login(): void{
        console.log("signup");
    }

}

export default AuthService;
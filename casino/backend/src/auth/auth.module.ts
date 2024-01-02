import { Module } from '@nestjs/common';
import { Auth } from 'mongodb';
import AuthController from './auth.controller';
import AuthService from './auth.services';
import { UserModule } from 'src/models/user-folder/user.module';



@Module({ 
    controllers: [AuthController],
    providers: [AuthService],
    imports: [UserModule]
})
class AuthModule{

}

export default AuthModule;
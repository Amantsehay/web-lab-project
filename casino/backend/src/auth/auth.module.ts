import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { Auth } from 'mongodb';
import AuthController from './auth.controller';
import AuthService from './auth.services';
import { UserModule } from 'src/models/user-folder/user.module';
=======
import AuthController from './auth.controller';
import AuthService from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user-folder/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/db/database.module';
>>>>>>> second-setup



@Module({ 
    controllers: [AuthController],
    providers: [AuthService],
<<<<<<< HEAD
    imports: [UserModule]
=======
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
    JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      })
      , DatabaseModule
    ]
>>>>>>> second-setup
})
class AuthModule{

}

export default AuthModule;
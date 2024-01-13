import { Module } from '@nestjs/common';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user-folder/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/db/database.module';



@Module({ 
    controllers: [AuthController],
    providers: [AuthService],
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
    JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      })
      , DatabaseModule
    ]
})
class AuthModule{

}

export default AuthModule;
import { IS_LENGTH, IsEmail, IsNotEmpty } from "class-validator";

export class AuthDto{

<<<<<<< HEAD
    @IsNotEmpty()  
    username: string;
=======
>>>>>>> second-setup

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
<<<<<<< HEAD
    firstName: string;

    @IsNotEmpty()
    lastName: string;

=======
    fullName: string;

    // @IsNotEmpty()
    // lastName: string;
>>>>>>> second-setup
    @IsNotEmpty()
    @IsEmail()
    email: string;

    
}



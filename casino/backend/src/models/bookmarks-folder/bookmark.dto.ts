import { IS_LENGTH, IsEmail, IsNotEmpty } from "class-validator";

export class BookmarkDto{
    id: string;

    userId: string
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    url: string;
    textContent: string;
    description?: string;

}


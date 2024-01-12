import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/db/database.service";
import {User} from "../../models/user-folder/user.schema"


@Injectable()
export class bookMarkService{

    constructor(private databaseService: DatabaseService){

    }

    async createBookmark(user: User, title: string, url: string, description: string ){

        return await this.databaseService.createBookMark(user, title, url, description);
    }
}
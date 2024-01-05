import {Module} from "@nestjs/common";
import {DatabaseModule} from "../../db/database.module";
import {BookmarkService} from "./bookmark.service";
import {BookmarkController} from "./bookmark.controller";



@Module(
    {
    imports: [],
    providers: [BookmarkService],
    controllers: [BookmarkController],
    exports: [BookmarkService]
    })
export class BookmarkModule{

}

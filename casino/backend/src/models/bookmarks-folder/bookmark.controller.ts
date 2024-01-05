import {Body, Controller, Post} from "@nestjs/common";
import {BookmarkService} from "./bookmark.service";
import {BookmarkDto} from "./bookmark.dto";


@Controller('bookmark')
export class BookmarkController{
    constructor(private bookmarkService: BookmarkService) {
    }

    @Post('create')
    async createBookmark(@Body() body: BookmarkDto){
        return await this.bookmarkService.createBookmark(body);

    }

}



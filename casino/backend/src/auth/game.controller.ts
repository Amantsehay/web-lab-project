import {Body, Controller, Get, Post, Req, UseGuards, Delete} from "@nestjs/common";
import {GameService} from "./game.service";
import {Public} from "./decorators/public.decorator";
import {ACGuard, UseRoles} from "nest-access-control";
import {Request} from "express";
import { AdminAuthorizationGuard } from "./guards/admin.authorization.guard";
import { AuthGuard } from "./guards/auth.guard";

export class GameDto{
    gameUrl: string
}

@Controller('game')
export class GameController {
    constructor(private gameService: GameService ) {}

    @Delete('delete-game')
    @UseGuards(AuthGuard)
    @UseGuards(AdminAuthorizationGuard)
    async deleteGame(@Body() body: GameDto) : Promise<any> {

        const gameUrl = body.gameUrl;
        return this.gameService.deleteGame(gameUrl);
    }

    @Get('games')
    @UseGuards(AuthGuard)
    @UseGuards(AdminAuthorizationGuard)
    async getGames(@Req() req: Request) : Promise<string[]> {
        return this.gameService.getGames();
    }
  
    @Post('add-game')
    @UseGuards(AuthGuard)
    @UseGuards(AdminAuthorizationGuard)
    async addGame(@Body() body: GameDto) : Promise<string[]> {

        return this.gameService.addGame(body.gameUrl);
    }
    @UseGuards(AuthGuard)
    @UseGuards(AdminAuthorizationGuard)
    @Post('update')
    async updateGame(@Body() body: string) : Promise<string[]> {
        return this.gameService.getGames();
    }

}

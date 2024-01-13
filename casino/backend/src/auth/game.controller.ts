import {Body, Controller, Get, Post, Req, UseGuards, Delete} from "@nestjs/common";
import {GameService} from "./game.service";
import {Public} from "./decorators/public.decorator";
import {ACGuard, UseRoles} from "nest-access-control";
import {Request} from "express";

export class GameDto{
    gameUrl: string
}

@Controller('game')
export class GameController {
    constructor(private gameService: GameService ) {}
    @Public()
    @Delete()
    @UseGuards(ACGuard)
    @UseRoles({
        possession: 'any',
        action: 'delete',
        resource: 'game'
    })
    async deleteGame(@Body() body: GameDto) : Promise<any> {

        const gameUrl = body.gameUrl;
        return this.gameService.deleteGame(gameUrl);
    }
    @Public()
    @Get()
    @UseGuards(ACGuard)
    @UseRoles({
        possession: 'any',
        action: 'read',
        resource: 'game'
    })
    async getGames(@Req() req: Request) : Promise<string[]> {
        return this.gameService.getGames();
    }
    @Public()
    @Post()
    @UseGuards(ACGuard)
    @UseRoles({
        possession: 'any',
        action: 'create',
        resource: 'game'
    })
    async addGame(@Req() req: Request) : Promise<string[]> {

        return this.gameService.addGame();
    }
    @Public()
    @Post()
    @UseGuards(ACGuard)
    @UseRoles({
        possession: 'any',
        action: 'update',
        resource: 'game'
    })
    async updateGame(@Body() body: string) : Promise<string[]> {
        return this.gameService.getGames();
    }

    // @Public()
    // @Get()
    // @UseGuards(ACGuard)
    // @UseRoles({
    //   possession: 'any',
    //   action: 'read',
    //   resource: 'game'
    // })
    // async getGames(@Req() req: Request) : Promise<string[]> {
    //
    //   return this.gameService.getGames();
    // }

}

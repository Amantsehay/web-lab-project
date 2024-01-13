import { Injectable, Post } from "@nestjs/common";
import { InjectModel} from "@nestjs/mongoose";
import { Game } from "./schemas/game.schema";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class GameService{
    constructor(
        @InjectModel(Game.name)
        private gameModel: Model<Game>,
        private jwtService: JwtService,
        
        ) {}

  
   async deleteGame(gameUrl: string) {
    return this.gameModel.findOneAndDelete({gameUrl: gameUrl})



        
        
    }

    getGames() {
        return [];
    }

    addGame() {
        return [];
    }
}
import { Injectable, Post } from "@nestjs/common";
import { InjectModel} from "@nestjs/mongoose";
import { Game } from "./schemas/game.schema";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class GameService{
    constructor(
        @InjectModel(Game.name)
        private userModel: Model<Game>,
        private jwtService: JwtService,
        ) {}
    @Post()

    deleteGame() {
        return [];
    }

    getGames() {
        return [];
    }

    addGame() {
        return [];
    }
}
import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectModel} from "@nestjs/mongoose";
import { Game } from "./schemas/game.schema";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name)
    private gameModel: Model<Game>,
    private jwtService: JwtService,
  ) {}

  async deleteGame(gameUrl: string) {
    try {
      const deletedGame = await this.gameModel.findOneAndDelete({ gameUrl: gameUrl });

      if (!deletedGame) {
        throw new NotFoundException(`Game with URL '${gameUrl}' not found`);
      }

      return { message: 'Game deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete game');
    }
  }

  async getGames(): Promise<string[]> {
    try {
      const games = await this.gameModel.find({}, 'gameUrl');
      return games.map((game) => game.gameUrl);
    } catch (error) {
      throw new Error('Failed to get games');
    }
  }

  async addGame(gameUrl: string): Promise<any> {
    try {
      const newGame = await this.gameModel.create({ gameUrl: gameUrl});
        newGame.save();
        return newGame;
    } catch (error) {
      throw new ConflictException('Failed to add game. Game URL already exists.');
    }
  }
}

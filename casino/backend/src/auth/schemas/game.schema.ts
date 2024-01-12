import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Game {
    @Prop({required: true, type: String})
    gameUrl: string
    
}

export const GameSchema = SchemaFactory.createForClass(Game);

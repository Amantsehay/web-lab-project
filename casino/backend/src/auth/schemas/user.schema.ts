import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Role} from "../roles/user.roles";
import * as mongoose from "mongoose";

@Schema({
  timestamps: true,
})
export class User {

  @Prop({ unique: false, default: new mongoose.Types.ObjectId() , type: mongoose.Schema.Types.ObjectId})
  id: mongoose.Types.ObjectId;
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({type:String, default: Role.User})
  roles: string;

  @Prop({ default: false})
  isBlocked: boolean;

  @Prop({default: 0})
  currentBalance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

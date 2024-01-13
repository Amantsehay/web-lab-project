import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Role} from "../roles/user.roles";

@Schema({
  timestamps: true,
})
export class Admin {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({type:String, default: Role.Admin})
  roles: string;

  @Prop({ default: false})
  isBlocked: boolean;

  @Prop({default: 0})
  currentBalance: number;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

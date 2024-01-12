import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema =
  SchemaFactory.createForClass(User);

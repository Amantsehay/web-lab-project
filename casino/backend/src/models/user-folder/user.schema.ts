import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { mongo } from 'mongoose';
import { Bookmark } from '../bookmarks-folder/bookmark.schema';
@Schema()
export class User {
  @Prop({ unique: true, default: new mongoose.Types.ObjectId() , type: mongoose.Schema.Types.ObjectId})
  id: mongoose.Types.ObjectId;
<<<<<<< HEAD

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
=======
  @Prop()
  firstName: string;

  @Prop() 
  lastName: string;

  @Prop()
  fullName: string;

  @Prop()
>>>>>>> second-setup
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

<<<<<<< HEAD
=======
  @Prop()
  profilePicture: string;

  

>>>>>>> second-setup
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bookmark' }] })
  bookmarks: mongoose.Types.ObjectId[] | Bookmark[];
}

export const UserSchema = SchemaFactory.createForClass(User);


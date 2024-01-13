// user.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {User} from "../user-folder/user.schema"
import mongoose from 'mongoose';
@Schema()
export class Bookmark {
    @Prop({unique: true, default: 0})
    id: mongoose.Types.ObjectId;
    @Prop()
    title: string;
    @Prop()
    url: string;
    @Prop()
    description: string;
    @Prop()
    created: Date;
    @Prop()
    modified: Date;
    @Prop()
    UserId: number;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: mongoose.Types.ObjectId;

}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);

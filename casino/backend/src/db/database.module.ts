import { Global, Module, OnModuleInit } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { env } from "process";
import { config } from "dotenv";
import mongoose from "mongoose";
import {DatabaseService} from "./database.service"; // Import mongoose to access connection events
import {User} from "../models/user-folder/user.schema";
import { UserSchema } from "src/models/user-folder/user.schema";
import { BookmarkSchema, Bookmark} from "../models/bookmarks-folder/bookmark.schema"
config();

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(env.MONGODB_URL_LOCAL, {}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{name: Bookmark.name, schema: BookmarkSchema}]),
  ],
  exports: [DatabaseService],
  providers: [DatabaseService],



})
export class DatabaseModule implements OnModuleInit {
  async onModuleInit() {
    try {
    
        // Listen for the "connected" event
      const defaultConnection = mongoose.connection;
      defaultConnection.on("connected", () => {
        console.log("Connected to MongoDB");
      });

      // Listen for the "error" event
      defaultConnection.on("error", (error) => {
        console.error("MongoDB connection error:", error);
      });

      // Listen for the "disconnected" event
      defaultConnection.on("disconnected", () => {
        console.log("Disconnected from MongoDB");
      });

      // Check the initial connection state
      if (defaultConnection.readyState === 1) {
        console.log("Already connected to MongoDB");
      } else {
        // If not connected, establish the connection
        await mongoose.connect(env.MONGODB_URL, {});
      }
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
}

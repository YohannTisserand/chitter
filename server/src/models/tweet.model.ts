import mongoose from "mongoose";
import { UserType } from "./user.model";

export interface TweetType extends mongoose.Document {
  user: UserType["_id"];
  textInput: string;
}

const tweetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  textInput: { type: String, required: true },
});

const Tweet = mongoose.model<TweetType>("tweet", tweetSchema);

export default Tweet;

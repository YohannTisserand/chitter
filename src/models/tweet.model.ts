import mongoose from "mongoose";

export interface TweetType extends mongoose.Document {
  textInput: string;
}

const tweetSchema = new mongoose.Schema({
  textInput: { type: String, required: true, unique: true },
});

const User = mongoose.model<TweetType>("tweets", tweetSchema);

export default User;

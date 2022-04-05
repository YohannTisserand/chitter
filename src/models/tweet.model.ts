import mongoose from "mongoose";

export interface TweetType extends mongoose.Document {
  textInput: string;
}

const tweetSchema = new mongoose.Schema({
  textInput: { type: String, required: true },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tweets",
    },
  ],
});

const Tweet = mongoose.model<TweetType>("tweets", tweetSchema);

export default Tweet;

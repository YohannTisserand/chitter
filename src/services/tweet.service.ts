import { DocumentDefinition } from "mongoose";
import Tweet, { TweetType } from "../models/tweet.model";

export async function createTweet(input: DocumentDefinition<TweetType>) {
  try {
    const tweet = await Tweet.create(input);

    return tweet;
  } catch (e: any) {
    throw new Error(e);
  }
}

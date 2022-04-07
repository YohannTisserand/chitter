import Tweet, { TweetType } from "../models/tweet.model";
import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";

export async function createTweet(input: DocumentDefinition<TweetType>) {
  return Tweet.create(input);
}

export async function findAllTweets() {
  const tweets = await Tweet.find();
  return tweets;
}

export async function findTweet(
  query: FilterQuery<TweetType>,
  options: QueryOptions = { lean: true }
) {
  return Tweet.findOne(query, {}, options);
}

export async function findAndUpdateTweet(
  query: FilterQuery<TweetType>,
  update: UpdateQuery<TweetType>,
  options: QueryOptions
) {
  return Tweet.findByIdAndUpdate(query, update, options);
}

export async function deleteTweet(query: FilterQuery<TweetType>) {
  return Tweet.deleteOne(query);
}

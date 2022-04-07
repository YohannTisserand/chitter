import { Request, Response } from "express";
import {
  CreateTweetInput,
  GetTweetInput,
  UpdateTweetInput,
} from "../schema/tweet.schema";
import {
  createTweet,
  deleteTweet,
  findAllTweets,
  findAndUpdateTweet,
  findTweet,
} from "../services/tweet.service";

export async function createTweetHandler(
  req: Request<{}, {}, CreateTweetInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const tweet = await createTweet({ ...body, user: userId });

  return res.send(tweet);
}

export async function updateTweetHandler(
  req: Request<UpdateTweetInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const tweetId = req.params.tweetId;
  const update = req.body;

  const tweet = await findTweet({ tweetId });

  if (!tweet) {
    return res.sendStatus(404);
  }

  if (String(tweet.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedTweet = await findAndUpdateTweet({ tweetId }, update, {
    new: true,
  });

  return res.send(updatedTweet);
}

export async function findAllTweetsHandler(_req: Request, res: Response) {
  const tweets = await findAllTweets();
  return res.send(tweets);
}

export async function getTweetHandler(
  req: Request<GetTweetInput["params"]>,
  res: Response
) {
  const tweetId = req.params.tweetId;
  const tweet = await findTweet({ tweetId });

  if (!tweet) {
    return res.sendStatus(404);
  }

  return res.send(tweet);
}

export async function deleteTweetHandler(
  req: Request<UpdateTweetInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const tweetId = req.params.tweetId;

  const tweet = await findTweet({ tweetId });

  if (!tweet) {
    return res.sendStatus(404);
  }

  if (tweet.user !== userId) {
    return res.sendStatus(403);
  }

  await deleteTweet({ tweetId });

  res.sendStatus(200);
}

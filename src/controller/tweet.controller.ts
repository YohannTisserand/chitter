import { Request, Response } from "express";
import { CreateTweetInput } from "../schema/tweet.schema";
import { createTweet } from "../services/tweet.service";
import logger from "../utils/logger";

export async function createTweetHandler(
  req: Request<{}, {}, CreateTweetInput["body"]>,
  res: Response
) {
  try {
    const user = await createTweet(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

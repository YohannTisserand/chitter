import express from "express";
import {
  createTweetHandler,
  findAllTweetsHandler,
} from "../controller/tweet.controller";
// import requireUser from "../middleware/requireUser";
import validate from "../middleware/validateResources";
import { createTweetSchema, getTweetSchema } from "../schema/tweet.schema";
import { findTweetsById } from "../services/tweet.service";

const router = express.Router();

router.post("/", validate(createTweetSchema), createTweetHandler);
router.get("/", findAllTweetsHandler);
router.get("/:tweetId", validate(getTweetSchema), findTweetsById);

export default router;

import express from "express";
import {
  createTweetHandler,
  deleteTweetHandler,
  getTweetHandler,
  updateTweetHandler,
} from "../controller/tweet.controller";
import requireUser from "../middleware/requireUser";
import validate from "../middleware/validateResources";
import {
  createTweetScema,
  deleteTweetScema,
  getTweetSchema,
  updateTweetScema,
} from "../schema/tweet.schema";

const router = express.Router();

router.get("/:tweetId", validate(getTweetSchema), getTweetHandler);
router.post("/", [requireUser, validate(createTweetScema), createTweetHandler]);
router.put("/:tweetId", [
  requireUser,
  validate(updateTweetScema),
  updateTweetHandler,
]);
router.delete("/:tweetId", [
  requireUser,
  validate(deleteTweetScema),
  deleteTweetHandler,
]);
export default router;

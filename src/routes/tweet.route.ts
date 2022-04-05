import express from "express";
import { createTweetHandler } from "../controller/tweet.controller";
import validate from "../middleware/validateResources";
import { createTweetSchema } from "../schema/tweet.schema";

const router = express.Router();

router.post("/", validate(createTweetSchema), createTweetHandler);

export default router;

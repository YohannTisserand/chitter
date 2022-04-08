import { Express } from "express";
import {
  createUserHandler,
  deleteUserHandler,
  findAllUserHandler,
  findUserByIdHandler,
  updateUserHandler,
} from "./controller/user.controller";
import validate from "./middleware/validateResources";
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from "./schema/user.schema";
import {
  createUserSessionHandler,
  deleteUserSessionsHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import requireUser from "./middleware/requireUser";
import { createSessionSchema } from "./schema/session.schema";
import {
  createTweetHandler,
  deleteTweetHandler,
  findAllTweetsHandler,
  getTweetHandler,
  updateTweetHandler,
} from "./controller/tweet.controller";
import {
  createTweetScema,
  deleteTweetScema,
  getTweetSchema,
  updateTweetScema,
} from "./schema/tweet.schema";
import { getCurrentUser } from "./controller/user.controller";

function routes(app: Express) {
  app.post("/api/users", validate(createUserSchema), createUserHandler);
  app.get("/api/users", findAllUserHandler);
  app.get("/api/users/:userId", validate(getUserSchema), findUserByIdHandler);
  app.put("/api/users/:userId", validate(updateUserSchema), updateUserHandler);
  app.delete(
    "/api/users/:userId",
    validate(deleteUserSchema),
    deleteUserHandler
  );

  app.post(
    "/api/sessions",
    validate(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteUserSessionsHandler);

  app.get("/api/tweets", findAllTweetsHandler);
  app.get("/api/tweets/:tweetId", validate(getTweetSchema), getTweetHandler);
  app.post("/api/tweets", [
    requireUser,
    validate(createTweetScema),
    createTweetHandler,
  ]);
  app.put("/api/tweets/:tweetId", [
    requireUser,
    validate(updateTweetScema),
    updateTweetHandler,
  ]);
  app.delete("/api/tweets/:tweetId", [
    requireUser,
    validate(deleteTweetScema),
    deleteTweetHandler,
  ]);

  app.get("/api/profile", requireUser, getCurrentUser);
}

export default routes;

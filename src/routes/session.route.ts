import express from "express";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
} from "../controller/session.controller";
import requireUser from "../middleware/requireUser";
import validate from "../middleware/validateResources";
import { createSessionSchema } from "../schema/session.schema";

const router = express.Router();

router.post("/", validate(createSessionSchema), createUserSessionHandler);
router.get("/", requireUser, getUserSessionsHandler);

export default router;

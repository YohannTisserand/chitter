import express from "express";
import {
  createUserHandler,
  findAllUserHandler,
} from "../controller/user.controller";
import validate from "../middleware/validateResources";
import { createUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/", validate(createUserSchema), createUserHandler);
router.get("/", findAllUserHandler);

export default router;

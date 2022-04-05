import express from "express";
import {
  createUserHandler,
  deleteOneUserHandler,
  findAllUsersHandler,
  findUserHandler,
} from "../controller/user.controller";
import validate from "../middleware/validateResources";
import { createUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/", validate(createUserSchema), createUserHandler);
router.get("/", findAllUsersHandler);
router.get("/:userId", findUserHandler);
router.delete("/:userId", deleteOneUserHandler);

export default router;

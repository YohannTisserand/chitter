import express from "express";
import {
  createUserHandler,
  findAllUserHandler,
  findUserByIdHandler,
} from "../controller/user.controller";
import validate from "../middleware/validateResources";
import { createUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/", validate(createUserSchema), createUserHandler);
router.get("/", findAllUserHandler);
router.get("/:id", findUserByIdHandler);

export default router;

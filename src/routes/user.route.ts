import express from "express";
import { createUserHandler } from "../controller/user.controller";
import validate from "../middleware/validateResources";
import { createUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/", validate(createUserSchema), createUserHandler);

export default router;

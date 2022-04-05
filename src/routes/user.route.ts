import express from "express";
import {
  createUserHandler,
  deleteUserHandler,
  findAllUserHandler,
  findUserByIdHandler,
} from "../controller/user.controller";
import validate from "../middleware/validateResources";
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
} from "../schema/user.schema";

const router = express.Router();

router.post("/", validate(createUserSchema), createUserHandler);
router.get("/", findAllUserHandler);
router.get("/:userId", validate(getUserSchema), findUserByIdHandler);
router.delete("/:userId", validate(deleteUserSchema), deleteUserHandler);
export default router;

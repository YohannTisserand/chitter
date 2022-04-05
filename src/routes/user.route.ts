import express from "express";
import {
  createUserHandler,
  deleteUserHandler,
  findAllUserHandler,
  findUserByIdHandler,
  updateUserHandler,
} from "../controller/user.controller";
import validate from "../middleware/validateResources";
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from "../schema/user.schema";

const router = express.Router();

router.post("/", validate(createUserSchema), createUserHandler);
router.get("/", findAllUserHandler);
router.get("/:userId", validate(getUserSchema), findUserByIdHandler);
router.put("/:userId", validate(updateUserSchema), updateUserHandler);
router.delete("/:userId", validate(deleteUserSchema), deleteUserHandler);
export default router;

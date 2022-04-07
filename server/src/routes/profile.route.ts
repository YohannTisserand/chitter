import express from "express";
import { getCurrentUser } from "../controller/user.controller";
import requireUser from "../middleware/requireUser";

const router = express.Router();

router.get("/", requireUser, getCurrentUser);

export default router;

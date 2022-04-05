import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser, findAllUsers } from "../services/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function findAllUserHandler(_req: Request, res: Response) {
  const user = await findAllUsers();
  return res.send(user);
}

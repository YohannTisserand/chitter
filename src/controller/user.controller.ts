import { Request, Response } from "express";
import {
  CreateUserInput,
  DeleteUserInput,
  GetUserInput,
} from "../schema/user.schema";
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserById,
} from "../services/user.service";
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

export async function findUserByIdHandler(
  req: Request<GetUserInput["params"]>,
  res: Response
) {
  const user = await findUserById({ _id: req.params.userId });
  if (!user) {
    return res.sendStatus(404);
  }
  return res.send(user);
}

export async function deleteUserHandler(
  req: Request<DeleteUserInput["params"]>,
  res: Response
) {
  const userId = req.params.userId;

  const user = await findUserById({ _id: req.params.userId });

  if (!user) {
    return res.sendStatus(404);
  }

  await deleteUser({ userId });

  return res.sendStatus(200);
}

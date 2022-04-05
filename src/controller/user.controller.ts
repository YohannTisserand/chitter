import { Request, Response } from "express";
import { CreateUserInput, GetUserInput } from "../schema/user.schema";
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserById,
} from "../services/user.service";
import logger from "../utils/logger";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).send(user);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
};

export const findUserHandler = async (
  req: Request<GetUserInput["params"]>,
  res: Response
) => {
  const userId = req.params.userId;
  const user = await findUserById({ userId });

  if (!user) {
    return res.sendStatus(404);
  }
  return res.send(user);
};

export const findAllUsersHandler = async (
  _req: Request<GetUserInput["params"]>,
  res: Response
) => {
  const user = await findAllUsers();
  return res.send(user);
};

export const deleteOneUserHandler = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await findUserById({ userId });

  if (!user) {
    return res.sendStatus(404);
  }
  await deleteUser({ userId });
  return res.sendStatus(200);
};

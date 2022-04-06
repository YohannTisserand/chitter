import { Request, Response } from "express";
import { createSession, findSessions } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt";
import dotenv from "dotenv";
dotenv.config();
import config from "config";

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid Email or Password");
  }

  const session = await createSession(user._id, req.get("user-agent") || "");

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );

  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(_req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

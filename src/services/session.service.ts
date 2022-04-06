import { FilterQuery } from "mongoose";
import Session, { SessionType } from "../models/sessions.model";

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });
  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionType>) {
  return Session.find(query).lean();
}

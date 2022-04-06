import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { SessionType } from "../models/sessions.model";

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });
  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionType>) {
  return Session.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionType>,
  update: UpdateQuery<SessionType>
) {
  return Session.updateOne(query, update);
}

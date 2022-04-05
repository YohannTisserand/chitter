import { DocumentDefinition } from "mongoose";
import { omit } from "lodash";
import User, { UserType } from "../models/user.model";

export async function createUser(input: DocumentDefinition<UserType>) {
  try {
    const user = await User.create(input);

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findAllUsers() {
  const user = await User.find();
  return user;
}

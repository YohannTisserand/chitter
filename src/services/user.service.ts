import { DocumentDefinition } from "mongoose";
import User, { UserType } from "../models/user.model";

export const createUser = async (input: DocumentDefinition<UserType>) => {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};

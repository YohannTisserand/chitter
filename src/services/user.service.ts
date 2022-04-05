import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import User, { UserType } from "../models/user.model";

export const createUser = async (input: DocumentDefinition<UserType>) => {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const findUserById = async (
  query: FilterQuery<UserType>,
  options: QueryOptions = { lean: true }
) => {
  const result = await User.findOne(query, {}, options);
  return result;
};

export const findAllUsers = async () => {
  const result = await User.find({});
  return result;
};

export const deleteUser = async (query: FilterQuery<UserType>) => {
  return await User.deleteOne(query);
};

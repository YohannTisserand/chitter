import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import { omit } from "lodash";
import User, { UserType } from "../models/user.model";

export async function createUser(
  input: DocumentDefinition<Omit<UserType, "comparePassword">>
) {
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

export async function findUserById(
  query: FilterQuery<UserType>,
  options: QueryOptions = { lean: true }
) {
  const user = await User.findById(query, {}, options);
  return user;
}

export async function deleteUser(query: FilterQuery<UserType>) {
  return User.deleteOne(query);
}

export async function findAndUpdateUser(
  query: FilterQuery<UserType>,
  update: UpdateQuery<UserType>,
  options: QueryOptions
) {
  return User.findOneAndUpdate(query, update, options);
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);
  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

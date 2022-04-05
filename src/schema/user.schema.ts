import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: "Username is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "Password is requried",
    }).min(6, "Password too short - $ characters minimum"),
  }),
});

const params = {
  params: object({
    userId: string({
      required_error: "userID is required",
    }),
  }),
};

export const getUserSchema = object({
  ...params,
});

export const deleteUserSchema = object({
  ...params,
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type GetUserInput = TypeOf<typeof getUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;

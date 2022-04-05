import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Name is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

const params = {
  params: object({
    userId: string({
      required_error: "userId is required",
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

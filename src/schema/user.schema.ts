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

export type CreateUserInput = TypeOf<typeof createUserSchema>;

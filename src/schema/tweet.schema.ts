import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    textInput: string({
      required_error: "Username is required",
    }),
  }),
};

export const createTweetSchema = object({
  ...payload,
});

export type CreateTweetInput = TypeOf<typeof createTweetSchema>;

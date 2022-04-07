import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    textInput: string({
      required_error: "Input is required",
    }),
  }),
};

const params = {
  params: object({
    tweetId: string({
      required_error: "tweetId is required",
    }),
  }),
};

export const createTweetScema = object({
  ...payload,
});

export const updateTweetScema = object({
  ...payload,
  ...params,
});

export const deleteTweetScema = object({
  ...params,
});

export const getTweetSchema = object({
  ...params,
});

export type CreateTweetInput = TypeOf<typeof createTweetScema>;
export type UpdateTweetInput = TypeOf<typeof updateTweetScema>;
export type DeleteTweetInput = TypeOf<typeof deleteTweetScema>;
export type GetTweetInput = TypeOf<typeof getTweetSchema>;

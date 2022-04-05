import supertest from "supertest";
import mongoose from "mongoose";
import app from "../app";
import * as UserService from "../services/user.service";

const userId = new mongoose.Types.ObjectId().toString();

const userInDB = {
  _id: userId,
  email: "johnDoe@example.com",
  username: "John Doe",
};

const userInput = {
  username: "John Doe",
  email: "johnDoe@example.com",
  password: "mypassword123",
};

describe("user managment", () => {
  it("returns the root page", async () => {
    await supertest(app).get("/").expect(200);
  });

  it("create a user", async () => {
    const createUserServiceMock = jest
      .spyOn(UserService, "createUser")
      // @ts-ignore
      .mockReturnValueOnce(userInDB);

    const { body } = await supertest(app)
      .post("/api/users")
      .send(userInput)
      .expect(201);

    expect(body).toEqual(userInDB);

    expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
  });

  it("should return a 409 error", async () => {
    const createUserServiceMock = jest
      .spyOn(UserService, "createUser")
      .mockRejectedValueOnce("test");

    const { statusCode } = await supertest(app)
      .post("/api/users")
      .send(userInput);

    expect(statusCode).toBe(409);

    expect(createUserServiceMock).toHaveBeenCalled();
  });
});

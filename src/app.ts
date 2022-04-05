import express from "express";
import userRouter from "./routes/user.route";
const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Chitter Server");
});

app.use("/api/users", userRouter);

export default app;

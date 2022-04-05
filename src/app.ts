import express from "express";
import userRouter from "./routes/user.route";
import logger from "./utils/logger";
import connect from "./utils/connect";
const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Chitter Server");
});

app.use("/api/users", userRouter);

app.listen(3001, async () => {
  logger.info(`Listening on port 3001`);

  await connect();
});

export default app;

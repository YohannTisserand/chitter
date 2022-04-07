import express from "express";
import userRouter from "./routes/user.route";
import profileRouter from "./routes/profile.route";
import sessionRouter from "./routes/session.route";
import tweetRouter from "./routes/tweet.route";
import deserializeUser from "./middleware/deserializeUser";
import cors from "cors";
import config from "config";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: config.get("origin"),
    credentials: true,
  })
);
app.use(deserializeUser);

app.get("/", (_req, res) => {
  res.send("Chitter Server");
});

app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/tweets", tweetRouter);

export default app;

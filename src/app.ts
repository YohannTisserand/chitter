import express from "express";
import userRouter from "./routes/user.route";
import sessionRouter from "./routes/session.route";
import tweetRouter from "./routes/tweet.route";
import deserializeUser from "./middleware/deserializeUser";
const app = express();

app.use(express.json());
app.use(deserializeUser);

app.get("/", (_req, res) => {
  res.send("Chitter Server");
});

app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/tweet", tweetRouter);

export default app;

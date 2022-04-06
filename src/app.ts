import express from "express";
import userRouter from "./routes/user.route";
import sessionRouter from "./routes/session.route";
import deserializeUser from "./middleware/deserializeUser";
const app = express();

app.use(express.json());
app.use(deserializeUser);

app.get("/", (_req, res) => {
  res.send("Chitter Server");
});

app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);

export default app;

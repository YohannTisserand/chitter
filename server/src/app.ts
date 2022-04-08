import express from "express";
import deserializeUser from "./middleware/deserializeUser";
import cors from "cors";
import cookieParser from "cookie-parser";

import config from "config";
const app = express();

app.use(
  cors({
    origin: config.get("origin"),
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use(deserializeUser);

app.get("/", (_req, res) => {
  res.send("Chitter Server");
});

export default app;

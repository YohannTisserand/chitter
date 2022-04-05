import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Chitter Server");
});

export default app;

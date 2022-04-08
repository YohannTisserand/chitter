import http from "http";
import app from "./app";
import logger from "./utils/logger";
import connect from "./utils/connect";
import routes from "./routes";
import cookieParser from "cookie-parser";

const server = http.createServer(app);

app.use(cookieParser());

server.listen(3001, async () => {
  logger.info(`Listening on port 3001`);

  await connect();

  routes(app);
});

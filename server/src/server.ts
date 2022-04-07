import http from "http";
import app from "./app";
import logger from "./utils/logger";
import connect from "./utils/connect";

const server = http.createServer(app);

server.listen(3001, async () => {
  logger.info(`Listening on port 3001`);

  await connect();
});

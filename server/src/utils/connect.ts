import mongoose from "mongoose";
import logger from "./logger";
import dotenv from "dotenv";
dotenv.config();

async function connect() {
  const mongoDbUri = process.env.MONGODB_URI!;

  try {
    await mongoose.connect(mongoDbUri);
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
}

export default connect;

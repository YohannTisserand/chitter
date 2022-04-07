import mongoose from "mongoose";
import { UserType } from "./user.model";

export interface SessionType extends mongoose.Document {
  user: UserType["_id"];
  valid: boolean;
  userAgent: string;
}

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  valid: { type: Boolean, default: true },
  userAgent: { type: String },
});

const Session = mongoose.model<SessionType>("Session", sessionSchema);

export default Session;

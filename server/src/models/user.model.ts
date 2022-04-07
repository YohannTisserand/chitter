import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserType extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tweets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this as UserType;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserType;

  return bcrypt.compare(candidatePassword, user.password).catch((_e) => false);
};

const User = mongoose.model<UserType>("users", userSchema);

export default User;

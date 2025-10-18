import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
  user_id: { type: String, default: uuidv4, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String, default: "" },
  password: { type: String, required: true }, 
  isBot: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;

import mongoose, { Schema } from "mongoose";
import { IUser } from "types/user";

const userSchema: Schema<IUser> = new Schema<IUser>({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: [true, "Email us required!"],
    trim: true,
    unique: [true, "Email must be unique!"],
    minLength: [5, "Email must have 5 characters"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password must be provided!"],
    trim: true,
    select: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    select: false,
  },
  verificationCodeValidation: {
    type: Number,
    select: false,
  },
  forgotPasswordCode: {
    type: String,
    select: false,
  },
  forgotPasswordCodeValidation: {
    type: Number,
    select: false,
  },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;

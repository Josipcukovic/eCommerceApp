import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
import AppConstants from "../constants/appConstants";
import Helpers from "../utils/helpers";

interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

interface UserDocument extends UserInput, mongoose.Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: AppConstants.Roles,
      default: AppConstants.Roles.User,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (this: UserDocument, next) {
  const hashedPass = await Helpers.hashPassword(this.password);
  this.password = hashedPass;
  next();
});

const userModel = mongoose.model<UserDocument>("user", userSchema);

export { userModel, UserInput, UserDocument };

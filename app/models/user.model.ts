import { Schema } from "mongoose";
import mongoose from "mongoose";

const userScheama = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userScheama)

export default User

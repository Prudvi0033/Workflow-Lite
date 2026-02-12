'use server'

import { connectDb } from "../lib/db";
import User from "../models/user.model";


export const createUser = async (user: any) => {
  await connectDb();

  return await User.findOneAndUpdate(
    { clerkId: user.clerkId },
    user,
    { upsert: true, new: true }
  );
};

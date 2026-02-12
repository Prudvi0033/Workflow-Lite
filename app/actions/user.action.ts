'use server'

import { connectDb } from "../lib/db";
import User from "../models/user.model";
import { CreateUserInput } from "../types";


export const createUser = async (user: CreateUserInput) => {
  await connectDb();

  return await User.create(
    { clerkId: user.clerkId },
    user,
    { upsert: true, new: true }
  );
};

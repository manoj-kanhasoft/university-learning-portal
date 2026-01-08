import mongoose from "mongoose";
import {
  CONNECTED_SUCCESSFULLY,
  CONNECTION_ERROR,
  EXISTING_CONNECTION,
  NEW_CONNECTION,
} from "../messages.js";

const mongoUri =
  process.env.DATABASE_URL || "";

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log(EXISTING_CONNECTION);
    return;
  }
  console.log(NEW_CONNECTION);
  try {
    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log(CONNECTED_SUCCESSFULLY);
  } catch (error) {
    console.error(CONNECTION_ERROR, error);
    throw error;
  }
};

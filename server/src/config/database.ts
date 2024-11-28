import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
  try {
    const dbUrl = process.env.DB_URL;

    if (!dbUrl) {
      throw new Error("DB_URL is not defined in environment variables");
    }

    await mongoose.connect(dbUrl);
    console.log("connect to database success!");
  } catch (error) {
    console.log("connect error!", error);
  }
};

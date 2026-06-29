import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Đã kết nối DB");
  });

  await mongoose.connect(process.env.MONGODB_URI);
};

export default connectDB;

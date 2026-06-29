import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.send("API đang hoạt động");
});

app.listen(port, () => {
  console.log(`Máy chủ đã khởi động trên cổng : ${port}`);
});

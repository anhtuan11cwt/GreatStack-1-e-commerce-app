import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";
import seedProducts from "./config/seed.js";
import swaggerSpec from "./config/swagger.js";
import cartRouter from "./routes/cartRoute.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_req, res) => {
  res.send("API đang hoạt động");
});

async function start() {
  await connectDB();
  connectCloudinary();
  await seedProducts();

  app.listen(port, () => {
    console.log(`Máy chủ đã khởi động trên cổng : ${port}`);
  });
}

start();

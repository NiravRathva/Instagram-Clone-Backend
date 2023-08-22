import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { errorHandler } from "./controllers/errorController.js";
const app = express();
const port = 8000;
dotenv.config();

//connecting to Database
const connectToMongo = async () => {
  await mongoose.connect(process.env.MONGO);
  console.log("conntected to MongoDB");
};

app.listen(port, () => {
  connectToMongo();
  console.log(`Server started on port ${port}`);
});

app.use(express.json());
//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use(errorHandler);

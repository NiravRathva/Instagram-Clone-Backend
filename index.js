import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please Provide your userName"],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Please provide your Name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email id"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minlength: 8,
      select: false,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    profileImage: {
      type: String,
    },
    bio: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

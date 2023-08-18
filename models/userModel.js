import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
    followers:{
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    following:{
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//password hashing middleware
userSchema.pre("save", async function (next) {
  //return if password is not modified
  if (!this.isModified("password")) return next();
  //hashing the password
  this.password = await bcrypt.hash(this.password, 12);
});

// correct password method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  //check enterd password and password saved in database are same
  return await bcrypt.compare(candidatePassword, userPassword);
};
export default mongoose.model("User", userSchema);

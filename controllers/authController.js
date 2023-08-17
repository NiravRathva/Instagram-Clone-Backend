import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.js";
import { appError } from "../utils/appError.js";

//sign token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//signUp function
export const signUp = catchAsync(async (req, res, next) => {
  //create new user using data from reqest body
  const newUser = await User.create({
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
  });
  //generate JSON web token
  const token = signToken(newUser._id);
  // Respond with a success status code and the user object along with the token
  res.status(201).json({ newUser, token });
});

// signIn function
export const signIn = catchAsync(async (req, res, next) => {
  const { email, userName, password } = req.body;
  //check if email or userName and password if exist
  if (!(email || userName) || !password) {
    next(new appError("please provide email or userName and password", 400));
  }

  // check if the user exits
  const user = await User.findOne({ $or: [{ email }, { userName }] }).select(
    "+password"
  );

  // const correct = await user.correctPassword(req.body.password, user.password);
  if (!user || !(await user.correctPassword(password, user.password))) {
    next(new appError("wrong Credentials", 401));
  }

  const token = signToken(user._id);
  //sending response
  res.status(200).json({ status: "success", token });
});

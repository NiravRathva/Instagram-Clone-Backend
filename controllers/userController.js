import User from "../models/userModel.js";
import { getOne, updateOne, deleteOne } from "./handleFactory.js";

// get single user
export const getUser = getOne(User);

//update user
export const updateUser = updateOne(User);

//delete user
export const deleteUser = deleteOne(User);

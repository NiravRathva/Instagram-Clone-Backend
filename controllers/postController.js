import { createOne, deleteOne, getAll, getOne } from "./handleFactory.js";
import Post from "../models/postModel.js";

export const createPost = createOne(Post);
export const getAllPosts = getAll(Post);
export const deletePost = deleteOne(Post);
export const getPost =getOne(Post)
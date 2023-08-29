import { createOne, deleteOne, getAll, getOne } from "./handleFactory.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import { appError } from "../utils/appError.js";
// create post
export const createPost = catchAsync(async (req, res) => {
  // Find the user document based on the user's id
  const user = await User.findById(req.user.id);
  // Create a new post document with the user's id and other properties from the request body
  const newPost = await new Post({ user: req.user.id, ...req.body });
  //saving newpost to db
  const savedPost = await newPost.save();
  // sending saved post response
  res.status(200).json(savedPost);
});

export const getFollowingPosts = catchAsync(async (req, res) => {
  // Get the currently authenticated user
  const user = await User.findById(req.user.id);
  //Get the list of users that authenticated in user is following
  const followingUser = user.following;
  // Retrieve posts from the users that the authenticated user is following
  const postList = await Promise.all(
    followingUser.map(async (id) => {
      // Find posts where the user field matches the 'id'
      return await Post.find({ user: id });
    })
  ); 
  //sending response
  res
    .status(200)
    .json(postList.flat().sort((a, b) => b.createdAt - a.createdAt));
});
export const deletePost = catchAsync(async (req, res, next) => {
  //find the post by its "id"
  const post = await Post.findById(req.params.id);
  //cheking if post exist
  if (!post) {
    return next(new appError("Post not found", 404));
  }

  // Check if the authenticated user is the owner of the post
  if (req.user.id === post.user.toString()) {
    console.log(req.user.id);
    console.log(post.user.toString());
    await Post.findByIdAndDelete(req.params.id);
  } else {
    return next(new appError("you are not authorized to delete the post", 403));
  }
  res.status(204).json(null);
});

export const getRandomPost = catchAsync(async (req, res) => {
  // Use the $sample aggregation to get a random sample of 25 posts
  const posts = await Post.aggregate([{ $sample: { size: 25 } }]);

  // Respond with the array of randomly selected posts
  res.status(200).json(posts.sort((a, b) => b.createdAt - a.createdAt));
});

// get single post
export const getPost = getOne(Post);

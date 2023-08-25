import express from "express";
import {
  getFollowingPosts,
  createPost,
  deletePost,
  getRandomPost,
  getPost,
} from "../controllers/postController.js";
import { verifyToken } from "../controllers/authController.js";
const router = express.Router();

router
  .route("/")
  .get(verifyToken, getFollowingPosts)
  .post(verifyToken, createPost);

router.get("/random", verifyToken, getRandomPost);
router.route("/:id").delete(verifyToken, deletePost).get(verifyToken, getPost);

export default router;

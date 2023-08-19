import express from "express";
import {
  getFollowingPosts,
  createPost,
  deletePost,
  getRandomPost,
} from "../controllers/postController.js";
import { verifyToken } from "../controllers/authController.js";
const router = express.Router();

router
  .route("/")
  .get(verifyToken, getFollowingPosts)
  .get(verifyToken, getRandomPost)
  .post(verifyToken, createPost);

router.route("/:id").delete(verifyToken, deletePost);
router.get("/random", verifyToken, getRandomPost);

export default router;

import express from "express";
import {
  getAllPosts,
  createPost,
  deletePost,
  getPost,
} from "../controllers/postController.js";
const router = express.Router();

router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").delete(deletePost).get(getPost);
export default router;

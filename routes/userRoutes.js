import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
const router = express.Router();

router.route("/");
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;



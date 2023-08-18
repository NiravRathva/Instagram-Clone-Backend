import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  getAllUser,
} from "../controllers/userController.js";
const router = express.Router();

router.route("/").get(getAllUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;



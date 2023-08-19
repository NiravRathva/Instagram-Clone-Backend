import mongoose from "mongoose";
import User from "./userModel.js";
const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    image: { type: String, required: true },
    caption: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);
postSchema.pre('save', async function (next) {
  try {
    // searching for the user
    const user = await User.findById(this.user);

    if (user) {
      // pushing post id into user's post field
      user.post.push(this._id);
      await user.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});
export default mongoose.model("Post", postSchema);

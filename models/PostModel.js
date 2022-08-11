const mongoose = require("mongoose");
const User = require("./UserModel");
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema(
  {
    postedBy: {
      type: ObjectId,
      ref: "User",
    },

    content: {
      type: String,
      required: "content is required",
    },

    photo: {
      type: String,
      default: "",
    },

    likes: [{ type: ObjectId, ref: "User" }],

    comments: [{ type: ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;

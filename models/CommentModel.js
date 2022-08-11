const mongoose = require("mongoose");
const User = require("./UserModel");
const { ObjectId } = mongoose.Schema.Types;

const CommentSchema = new mongoose.Schema(
  {
    text: String,
    commentedBy: { type: ObjectId, ref: "User" },
    parentCommentId: String,
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;

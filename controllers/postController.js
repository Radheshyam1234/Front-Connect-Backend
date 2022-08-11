const User = require("../models/UserModel");
const Post = require("../models/PostModel");
const Comment = require("../models/CommentModel");

const createNewPost = async (req, res) => {
  try {
    const postDetails = req.body;

    let newPost = new Post({ ...postDetails, postedBy: req.user._id });

    await newPost.save();
    await newPost.populate({
      path: "postedBy",
      select: "userName profilephoto",
    });

    res.status(200).json({ response: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate({
        path: "postedBy",
        select: "firstName lastName userName profilephoto",
      })
      .sort("-createdAt");

    res.status(200).json({
      response: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate({
      path: "postedBy",
      select: "firstName lastName userName profilephoto",
    });

    if (!post) {
      res.status(400).json({ message: "No post found" });
      return;
    }

    return res.status(200).json({ response: post });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const getPagedPosts = async (req, res) => {
  try {
    const { pageNum } = req.params;
    const posts = await Post.find({})
      .skip(4 * pageNum)
      .limit(4)
      .populate({
        path: "postedBy",
        select: "firstName lastName userName profilephoto",
      })
      .sort("-createdAt");
    res.status(200).json({
      response: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const getAllPostsOfUser = async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(403).json({ message: "User not Found" });
    }

    const posts = await Post.find({ postedBy: req.user._id })
      .populate({
        path: "postedBy",
        select: "userName profilephoto",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      response: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const editThePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { editedContent } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      res.status(400).json({ message: "No post found" });
      return;
    }
    if (post.postedBy._id.toString() !== req.user._id.toString()) {
      res.status(400).json({ message: "You haven't access to edit" });
      return;
    }

    post.content = editedContent;
    await post.save();
    return res.status(200).json({ response: post });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findOne({ _id: postId, postedBy: req.user._id });

    if (!post) {
      res.status(400).json({ message: "No post found" });
      return;
    }
    if (post.postedBy._id.toString() !== req.user._id.toString()) {
      res.status(400).json({ message: "You haven't access to Delete" });
      return;
    }
    await post.remove();
    res.status(200).json({ response: post });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  createNewPost,
  getAllPosts,
  getPagedPosts,
  getPostById,
  getAllPostsOfUser,
  editThePost,
  deletePost,
};

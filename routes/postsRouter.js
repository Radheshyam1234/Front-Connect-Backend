const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");

const {
  createNewPost,
  getAllPosts,
  getAllPostsOfUser,
  editThePost,
  deletePost,
  getPostById,
  getPagedPosts,
  likeThePost,
  removeLikeFromPost,
  getUsersWhoLikedThePost,
} = require("../controllers/postController");

router.use(requireLogin);

router.route("/").get(getAllPosts).post(createNewPost);
router.route("/page/:pageNum").get(getPagedPosts);
router.route("/:postId").get(getPostById).delete(deletePost);
router.route("/:postId/editpost").post(editThePost);
router.route("/:postId/addlike").post(likeThePost);
router.route("/:postId/removelike").post(removeLikeFromPost);
router.route("/:postId/likedby").get(getUsersWhoLikedThePost);
router.route("/:userName/allposts").get(getAllPostsOfUser);

module.exports = router;

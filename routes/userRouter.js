const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");

const {
  signUpUser,
  signInUser,
  getAllUsers,
  getMyProfile,
  updateProfilePhoto,
  updateProfileInfo,
  getUserProfile,
  getFollowersDetails,
  getFollowingDetails,
  followUser,
  unfollowUser,
  addBookmarkToPost,
  removeBookMarkFromPost,
} = require("../controllers/userController");

router.route("/login").post(signInUser);
router.route("/signup").post(signUpUser);
router.use(requireLogin);
router.get("/myprofile", getMyProfile);
router.route("/updateprofilephoto").post(updateProfilePhoto);
router.route("/updateprofileinfo").post(updateProfileInfo);
router.get("/allusers", getAllUsers);
router.route("/:userName/profile").get(getUserProfile);
router.route("/:userName/followers").get(getFollowersDetails);
router.route("/:userName/following").get(getFollowingDetails);
router.route("/:userName/follow").post(followUser);
router.route("/:userName/unfollow").post(unfollowUser);
router.route("/:postId/addbookmark").post(addBookmarkToPost);
router.route("/:postId/removebookmark").post(removeBookMarkFromPost);
module.exports = router;

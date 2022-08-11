const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");

const {
  signUpUser,
  signInUser,
  getAllUsers,
  getMyProfile,
  getUserProfile,
} = require("../controllers/userController");

router.route("/login").post(signInUser);
router.route("/signup").post(signUpUser);
router.use(requireLogin);
router.get("/myprofile", getMyProfile);
router.get("/allusers", getAllUsers);
router.route("/:userName/profile").get(getUserProfile);

module.exports = router;

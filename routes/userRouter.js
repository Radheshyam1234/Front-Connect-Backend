const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");

const { signUpUser, signInUser } = require("../controllers/userController");

router.route("/login").post(signInUser);
router.route("/signup").post(signUpUser);

module.exports = router;

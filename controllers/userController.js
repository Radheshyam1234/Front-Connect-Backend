const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utilities/generateToken");
const { JWT_SECRET } = require("../config/keys");
const jwt = require("jsonwebtoken");

const signUpUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const isUserExist = await User.findOne({ email });
    if (isUserExist !== null) {
      return res.json({
        message: "Account already exists for this email",
      });
    }

    hashedPassword = await bcrypt.hash(password, 12);

    const NewUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await NewUser.save();

    const token = generateToken(NewUser._id);

    res.status(201).json({
      response: {
        NewUser,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
      errorMessage: error.message,
    });
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(403).json({ message: "Email or password is incorrect!" });
    } else {
      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (matched) {
            const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            res.status(201).json({
              response: {
                user,
                token,
              },
            });
          } else {
            res.status(403).json({ message: "Password is incorrect!" });
          }
        })

        .catch((error) => {
          console.log(error);
          res.status(403).json({ message: "Email or password is incorrect!" });
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
      errorMessage: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let users = await User.find({});
    res.status(200).json({ response: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const getMyProfile = async (req, res) => {
  try {
    let user = req.user;
    res.status(200).json({
      response: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userName } = req.params;
    const userDetails = await User.findOne({ userName });
    if (!userDetails) {
      res.status(403).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ response: userDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  signUpUser,
  signInUser,
  getAllUsers,
  getMyProfile,
  getUserProfile,
};

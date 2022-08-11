const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./../config/keys");
const User = require("../models/UserModel");
const requireLogin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "You must be logged in" });
    }
    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({ message: "You must be logged in" });
      }

      User.findById(payload._id)
        .then((user) => {
          req.user = user;
          next();
        })
        .catch((err) => {
          console.log(err);
          return res.status(401).json({ message: "You must be logged in" });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "You must be  logged in" });
  }
};

module.exports = requireLogin;

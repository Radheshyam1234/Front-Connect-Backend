const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

const generateToken = (userId) => {
  const token = jwt.sign({ _id: userId }, JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

module.exports = { generateToken };

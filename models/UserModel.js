const mongoose = require("mongoose");
const Post = require("./PostModel");
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,

    unique: true,
  },
  password: {
    type: String,
  },
  profilephoto: {
    type: String,
    default:
      "http://res.cloudinary.com/radheshyam11/image/upload/v1628524847/ggfox5fjnoqc5ldummob.png",
  },

  description: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },

  followers: [{ type: ObjectId, ref: "User" }],

  following: [{ type: ObjectId, ref: "User" }],

  savedpost: [{ type: ObjectId, ref: "Post" }],
});
const User = mongoose.model("User", UserSchema);
module.exports = User;

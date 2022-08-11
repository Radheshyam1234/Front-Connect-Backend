const mongoose = require("mongoose");
const { MONGO_URI } = require("../config/keys");
const initializeConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  initializeConnection,
};

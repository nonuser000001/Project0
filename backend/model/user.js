const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  pernr: { type: String },
  gdud: { type: String },
  isManager: { type: String },
});

const user = mongoose.model("users", userSchema , "users");

module.exports = user;

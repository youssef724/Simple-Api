const e = require("express");
const mongoose = require("mongoose");
var validator = require('validator');
const userRoles = require("../utils/userRoles");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    Unique: true,
    validate: [validator.isEmail, "Valid Email Required"],
  },
  Password: {
    type: String,
    required: true,
  },
  Token:{
    type: String
  },
  role:{
    type: String,
    enum: [userRoles.User, userRoles.Admin , userRoles.Manager] , default : userRoles.User
  }
});

module.exports = mongoose.model("User", userSchema);

const Joi = require("joi");
const mongoose = require("mongoose");
// create a user model for storing users to the database

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  })
);

// validate users data that is being passed from end-users

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(55).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(55).required(),
  });
  return schema.validate(user);
}

function validateAuth(user){
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(55).required()
  })
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
module.exports.validateAuth = validateAuth;
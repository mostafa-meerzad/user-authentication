const express = require("express");
const { User, validate } = require("../models/user");
const router = express.Router();
const _ = require("lodash");

const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  //todo: first validate the data users sent
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // check if the users is already registered
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("user already registered!");
  }

  //todo: if the user is not already registered create that user

  // this part con also be replaced with "lodash"
  // user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  // });

  //note: always prefer to pick only that part of the data sent from the user that you'r interested.
  // the reason is, if a malicious user decides to send too many data we'r not going to store all of that but just those we want to store.
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  // hash the user password and store it to the database
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt)
  await user.save();

  // this part has a small but potentially risky problem and that is the user object is sent back as a whole
  // that would be nice to have a way to just send the parts we want not all of it.
  // lodash to the rescue!

  // res.send(user);

  // the manual way
  // res.send({
  // name: user.name,
  // email: user.email
  // })

  // with lodash
  res.send(_.pick(user, ["name", "email"]));
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { User, validateAuth } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  // todo: validate the data send by user
  const { error } = validateAuth(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // todo: look up for the user, return 400 if no user exists,
  // Note: sending 400 error code on purpose, don't say it explicitly perhaps there is a malicious user messing around
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email or password");
  }

  // todo: validate the provided password

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  // user.password which is coming from DB does include the salt so bcrypt takes that and rehashes this new password provided and then compares the two
  if (!validPassword) {
    return res.status(400).send("Invalid email or password");
  }
  // todo: if we get to this point it means that the password is a valid password
  res.send("valid user"); // just a test value for now
});

module.exports = router;

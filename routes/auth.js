const _ = require("lodash");
const { User } = require("../models/user");
const express = require("express");
const Joi = require("joi");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const config = require('config')

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'))
  res.send(token);
});

// Validate the email and password gotten from the user
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(req);
}

module.exports = router;

const auth = require("../middleware/auth");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const asyncMiddleware = require("../middleware/async");

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const users = await User.find();
    res.send(users);
  })
);

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");
    user = new User(_.pick(req.body, ["name", "email", "password"]));
    // user = new User({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password,
    // });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
    // res.send(  _.pick(user, ['_id', 'name', 'email'])  );
    // res.send({
    //   name: user.name,
    //   email: user.email,
    // });
  })
);

router.get(
  "/me",
  auth,
  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password"); //exclude the password
    res.send(user);
  })
);

router.put(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
      { new: true }
    );
    if (!user)
      return res.status(404).send("The user with the given ID was not found");
    res.send(user);
  })
);

router.delete(
  "/:id",
  auth,
  asyncMiddleware(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).send("The user with the given ID was not found.");
    res.send(user);
  })
);

module.exports = router;

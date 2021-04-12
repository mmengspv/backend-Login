import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import { registerValidation, loginValidation } from "../controller/validation.js";

router.post("/register", async (req, res) => {
  //Register validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check user is already
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash password
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id});
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const checkEmailUser = await User.findOne({ email: req.body.email });
  if (!checkEmailUser) return res.status(400).send("Email is not found");

  const checkPassword = await bcrypt.compareSync(
    req.body.password,
    checkEmailUser.password
  );
  if (!checkPassword) return res.status(400).send("Invalid password");

  //JWT Token
  const token = await jwt.sign({ _id: checkEmailUser._id }, process.env.SECRET_TOKEN, {expiresIn: "1h"});
  res.header("Authorization", token).send(token);
  // res.send("Logged in");
});

export default router;

import { Request, Response, NextFunction } from "express";
const User = require("../models/userModel");
// import * as User from '../models/userModel'
import HttpError from "../util/http-error";

exports.getUsers = async (req: Request, res: Response, next: NextFunction) => {
  let users;
  try {
    users = await User.find({}, "-password -role -__v");
  } catch (err) {
    const error = new HttpError("fetching users failed", 500);
    return next(error);
  }
  res.status(200).json({
    users: users.map((user: any) => user.toObject({ getters: true })),
  });
};

//works
exports.signup = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("signup failed, try again later", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("user exist already, login instead", 422);
    return next(error);
  }

  const newUser = new User({
    name,
    email,
    password,
    role: "user",
    todos: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new HttpError("could not signup, try later", 500));
  }

  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

//works
exports.login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let user;

  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("loggin in failed, try later", 500);
    return next(error);
  }

  if (!user || user.password !== password) {
    const error = new HttpError(
      "could not logging in, check ur credentials or sighnup",
      401
    );
    return next(error);
  }

  res.status(200).json({ message: "logged in" });
};

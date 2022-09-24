import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
const Todo = require("../models/todoModel");
const User = require("../models/userModel");
import HttpError from "../util/http-error";

//works
exports.getAllTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const todo = await Todo.find();
  res.status(200).json({ todo });
};

//works
exports.getTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const todoId = req.params.tid;

  let todo;

  try {
    todo = await Todo.findById(todoId);
  } catch (err) {
    return next(new HttpError("Could not get the todo", 500));
  }

  if (!todo) {
    throw new HttpError("could not find the todo with provided id", 404);
  }

  res.status(200).json({ todo: todo.toObject({ getters: true }) });
};

//works
exports.getTodoByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.uid;

  let todos;

  try {
    todos = await Todo.find({ creator: userId });
  } catch (err) {
    const error = new HttpError("Could not get the todo", 500);
    return next(error);
  }

  if (!todos || todos.length === 0) {
    throw new HttpError("could not find the todo with provided user id", 404);
  }

  res.status(200).json({
    todos: todos.map((todo: any) => todo.toObject({ getters: true })),
  });
};

//works++
exports.createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { content, kind, creator } = req.body;

  const newTodo = new Todo({
    content,
    kind,
    creator,
  });

  let user;

  try {
    user = await User.findById(creator);
  } catch (err) {
    return next(new HttpError("something went wrong", 500));
  }

  try {
    //start session for multiple opoerations. if one of them fails, we cancel all of them
    const curSession = await mongoose.startSession();
    curSession.startTransaction();
    await newTodo.save({ session: curSession });
    //place id is added to our user
    user.todos.push(newTodo);
    //push is mongoose method which allows mongoose establish connection between documents
    await user.save({ session: curSession });
    //create/save our modified user.
    await curSession.commitTransaction();
  } catch (err) {
    return next(new HttpError("Creating todo failed, try again", 500));
  }

  if (!user) {
    return next(new HttpError("could not find user with provided id", 404));
  }

  res.status(201).json({ newTodo });
};

//works
exports.updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const todoId = req.params.tid;
  const { content, kind } = req.body;

  let todo;
  try {
    todo = await Todo.findById(todoId);
  } catch (err) {
    return next(new HttpError("Could not get the todo", 500));
  }

  todo.content = content;
  todo.kind = kind;

  try {
    await todo.save();
  } catch (err) {
    return next(new HttpError("smth went wrong, could not update", 500));
  }

  res.status(404).json({ todo: todo.toObject({ getters: true }) });
};

exports.deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const todoId = req.params.tid;
  let todo;

  try {
    todo = await Todo.findById(todoId).populate("creator");
  } catch (err) {
    return next(new HttpError("smth went wrong, Could not delete todo", 500));
  }

  if (!todo) {
    return next(new HttpError("could not find todo with this id", 404));
  }

  try {
    const curSession = await mongoose.startSession();
    curSession.startTransaction();
    await todo.remove({ session: curSession });
    //pull removes the todo from user
    todo.creator.todos.pull(todo);
    await todo.creator.save({ session: curSession });
    await curSession.commitTransaction();
  } catch (err) {
    return next(new HttpError("smth went wrong, could not delete", 500));
  }
  res.status(200).json({ message: "todo deleted" });
};

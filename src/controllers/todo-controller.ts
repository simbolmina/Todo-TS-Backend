import { Request, response, Response } from "express";
const Todo = require("../models/todoModel");
import HttpError from "../util/http-error";

let DUMMY_DATA = [
  {
    id: "t1",
    content: "apples",
    kind: "shop",
    creator: "u1",
  },
  {
    id: "t2",
    content: "apples",
    kind: "shop",
    creator: "u1",
  },
  {
    id: "t3",
    content: "apples",
    kind: "shop",
    creator: "u2",
  },
];

//works
exports.getAllTodo = async (req: Request, res: Response) => {
  // const todo = DUMMY_DATA.find((todo) => todo);
  const todo = await Todo.find();

  res.status(200).json({ todo });
};

//works
exports.getTodoById = async (req: Request, res: Response, next: any) => {
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
exports.getTodoByUserId = async (req: Request, res: Response, next: any) => {
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

//works
exports.createTodo = async (req: Request, res: Response, next: any) => {
  const { content, kind, creator, id } = req.body;

  const newTodo = new Todo({
    content,
    kind,
    creator,
  });

  try {
    await newTodo.save();
  } catch (err) {
    return next(new HttpError("could not create a new Todo", 500));
  }

  res.status(201).json({ newTodo });
};

//works
exports.updateTodo = async (req: Request, res: Response, next: any) => {
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

exports.deleteTodo = async (req: Request, res: Response, next: any) => {
  const todoId = req.params.tid;
  let todo;

  try {
    todo = await Todo.findById(todoId);
  } catch (err) {
    return next(new HttpError("smth went wrong, Could not delete todo", 500));
  }

  try {
    await todo.remove();
  } catch (err) {
    return next(new HttpError("smth went wrong, could not delete", 500));
  }
  res.status(200).json({ message: "todo deleted" });
};

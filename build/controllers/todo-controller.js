"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Todo = require("../models/todoModel");
const http_error_1 = __importDefault(require("../util/http-error"));
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
exports.getAllTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const todo = DUMMY_DATA.find((todo) => todo);
    const todo = yield Todo.find();
    res.status(200).json({ todo });
});
//works
exports.getTodoById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.tid;
    let todo;
    try {
        todo = yield Todo.findById(todoId);
    }
    catch (err) {
        return next(new http_error_1.default("Could not get the todo", 500));
    }
    if (!todo) {
        throw new http_error_1.default("could not find the todo with provided id", 404);
    }
    res.status(200).json({ todo: todo.toObject({ getters: true }) });
});
//works
exports.getTodoByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.uid;
    let todos;
    try {
        todos = yield Todo.find({ creator: userId });
    }
    catch (err) {
        const error = new http_error_1.default("Could not get the todo", 500);
        return next(error);
    }
    if (!todos || todos.length === 0) {
        throw new http_error_1.default("could not find the todo with provided user id", 404);
    }
    res.status(200).json({
        todos: todos.map((todo) => todo.toObject({ getters: true })),
    });
});
//works
exports.createTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, kind, creator, id } = req.body;
    const newTodo = new Todo({
        content,
        kind,
        creator,
    });
    try {
        yield newTodo.save();
    }
    catch (err) {
        return next(new http_error_1.default("could not create a new Todo", 500));
    }
    res.status(201).json({ newTodo });
});
//works
exports.updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.tid;
    const { content, kind } = req.body;
    let todo;
    try {
        todo = yield Todo.findById(todoId);
    }
    catch (err) {
        return next(new http_error_1.default("Could not get the todo", 500));
    }
    todo.content = content;
    todo.kind = kind;
    try {
        yield todo.save();
    }
    catch (err) {
        return next(new http_error_1.default("smth went wrong, could not update", 500));
    }
    res.status(404).json({ todo: todo.toObject({ getters: true }) });
});
exports.deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.tid;
    let todo;
    try {
        todo = yield Todo.findById(todoId);
    }
    catch (err) {
        return next(new http_error_1.default("smth went wrong, Could not delete todo", 500));
    }
    try {
        yield todo.remove();
    }
    catch (err) {
        return next(new http_error_1.default("smth went wrong, could not delete", 500));
    }
    res.status(200).json({ message: "todo deleted" });
});

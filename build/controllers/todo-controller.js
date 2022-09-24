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
const mongoose_1 = __importDefault(require("mongoose"));
const Todo = require("../models/todoModel");
const User = require("../models/userModel");
const http_error_1 = __importDefault(require("../util/http-error"));
//works
exports.getAllTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
//works++
exports.createTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, kind, creator } = req.body;
    const newTodo = new Todo({
        content,
        kind,
        creator,
    });
    let user;
    try {
        user = yield User.findById(creator);
    }
    catch (err) {
        return next(new http_error_1.default("something went wrong", 500));
    }
    try {
        //start session for multiple opoerations. if one of them fails, we cancel all of them
        const curSession = yield mongoose_1.default.startSession();
        curSession.startTransaction();
        yield newTodo.save({ session: curSession });
        //place id is added to our user
        user.todos.push(newTodo);
        //push is mongoose method which allows mongoose establish connection between documents
        yield user.save({ session: curSession });
        //create/save our modified user.
        yield curSession.commitTransaction();
    }
    catch (err) {
        return next(new http_error_1.default("Creating todo failed, try again", 500));
    }
    if (!user) {
        return next(new http_error_1.default("could not find user with provided id", 404));
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
        todo = yield Todo.findById(todoId).populate("creator");
    }
    catch (err) {
        return next(new http_error_1.default("smth went wrong, Could not delete todo", 500));
    }
    if (!todo) {
        return next(new http_error_1.default("could not find todo with this id", 404));
    }
    try {
        const curSession = yield mongoose_1.default.startSession();
        curSession.startTransaction();
        yield todo.remove({ session: curSession });
        //pull removes the todo from user
        todo.creator.todos.pull(todo);
        yield todo.creator.save({ session: curSession });
        yield curSession.commitTransaction();
    }
    catch (err) {
        return next(new http_error_1.default("smth went wrong, could not delete", 500));
    }
    res.status(200).json({ message: "todo deleted" });
});

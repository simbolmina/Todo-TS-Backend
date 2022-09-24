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
const User = require("../models/userModel");
// import * as User from '../models/userModel'
const http_error_1 = __importDefault(require("../util/http-error"));
exports.getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let users;
    try {
        users = yield User.find({}, "-password -role -__v");
    }
    catch (err) {
        const error = new http_error_1.default("fetching users failed", 500);
        return next(error);
    }
    res.status(200).json({
        users: users.map((user) => user.toObject({ getters: true })),
    });
});
//works
exports.signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = yield User.findOne({ email: email });
    }
    catch (err) {
        const error = new http_error_1.default("signup failed, try again later", 500);
        return next(error);
    }
    if (existingUser) {
        const error = new http_error_1.default("user exist already, login instead", 422);
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
        yield newUser.save();
    }
    catch (err) {
        return next(new http_error_1.default("could not signup, try later", 500));
    }
    res.status(201).json({ user: newUser.toObject({ getters: true }) });
});
//works
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let user;
    try {
        user = yield User.findOne({ email: email });
    }
    catch (err) {
        const error = new http_error_1.default("loggin in failed, try later", 500);
        return next(error);
    }
    if (!user || user.password !== password) {
        const error = new http_error_1.default("could not logging in, check ur credentials or sighnup", 401);
        return next(error);
    }
    res.status(200).json({ message: "logged in" });
});

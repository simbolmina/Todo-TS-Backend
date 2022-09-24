"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user = {
    username: "test",
    password: "test",
    id: "u1",
};
// const DUMMY_DATA = [
//   {
//     username: "test",
//     password: "test",
//     id: "u1",
//   },
//   {
//     username: "test",
//     password: "test",
//     id: "u2",
//   },
// ];
exports.signup = (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const newUser = {
        username,
        password,
        role: "user",
        id: Math.random().toString(36).substring(2, 6),
    };
    res.status(201).json({ newUser });
};
exports.login = (req, res) => {
    const { username, password } = req.body;
    if (username === user.username && password === user.password) {
        res.status(201).json({ message: "login successful" });
    }
    else {
        res.status(403).json({ message: "Invalid username or password" });
    }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const newUser = {
        username,
        password,
        role: "user",
        id: Math.random().toString(36).substring(2, 5),
    };
    res.status(201).json({ newUser });
});
exports.default = router;

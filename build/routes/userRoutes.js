"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = require("../controllers/user-controllers");
const router = (0, express_1.Router)();
router.post("/signup", userController.signup);
router.post("/login", userController.login);
exports.default = router;

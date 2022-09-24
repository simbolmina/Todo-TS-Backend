import { Router } from "express";
const userController = require("../controllers/user-controllers");

const router = Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);

export default router;

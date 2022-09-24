import { Router } from "express";
const userController = require("../controllers/user-controllers");

const router = Router();

router.get("/", userController.getUsers);
router.post("/signup", userController.signup);
router.post("/login", userController.login);

export default router;

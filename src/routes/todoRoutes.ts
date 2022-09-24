import { Router } from "express";
const todoController = require("../controllers/todo-controller");

const router = Router();

router.get("/", todoController.getAllTodo);
router.get("/:tid", todoController.getTodoById);
router.get("/user/:uid", todoController.getTodoByUserId);
router.post("/", todoController.createTodo);
router.patch("/:tid", todoController.updateTodo);
router.delete("/:tid", todoController.deleteTodo);

export default router;

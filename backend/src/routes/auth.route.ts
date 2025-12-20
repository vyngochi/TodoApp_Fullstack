import { Router } from "express";
import { login, refreshToken, register } from "../controllers/auth.controller";
import { getProfile } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import {
  createNewTodo,
  deleteTodoById,
  getTodos,
  updateTodoById,
} from "../controllers/todo.controller";

const router = Router();

//authentication
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);

//user information
router.get("/profile", authenticate, getProfile);

//todos
router.get("/todos", authenticate, getTodos);
router.post("/todos", authenticate, createNewTodo);
router.put("/todos/:todoId", authenticate, updateTodoById);
router.delete("/todos/:todoId", authenticate, deleteTodoById);

export default router;

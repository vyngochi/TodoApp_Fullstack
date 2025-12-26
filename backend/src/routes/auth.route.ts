import { Router } from "express";
import { login, refreshToken, register } from "../controllers/auth.controller";
import { getProfile } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import {
  createNewTodo,
  deleteTodoById,
  getTodoDatesByRange,
  getTodos,
  getTodosByDate,
  updateTodoById,
} from "../controllers/todo.controller";
import {
  changePasswordController,
  sendOtpChangePassword,
  verifyOtpCode,
} from "../controllers/mail.controller";

const router = Router();

router.put("/todos/change-password", changePasswordController);

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

//dates
router.get("/todos/dates", authenticate, getTodoDatesByRange);

router.get("/todos/by-date", authenticate, getTodosByDate);

//mail
router.post("/todos/sendOtp", sendOtpChangePassword);
router.post("/todos/verify", verifyOtpCode);

export default router;

import { Request, Response } from "express";
import {
  createTodo,
  deleteTodo,
  getTodosByUserId,
  updateTodo,
} from "../services/todos.service";
import { errorResponse, successResponse } from "../utils/responseHelper";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    if (!userId) {
      return errorResponse(res, 400, "Invalid user ID");
    }
    const todos = await getTodosByUserId(userId);

    if (todos.length === 0) {
      return errorResponse(res, 404, "No todos found for this user");
    }

    return successResponse(res, 200, "Get todos successfully", todos);
  } catch (error) {
    return errorResponse(
      res,
      500,
      (error as Error).message || "Internal server error"
    );
  }
};

export const createNewTodo = async (req: Request, res: Response) => {
  try {
    const { userId, title, isCompleted } = req.body;

    if (!userId || !title || isCompleted === undefined) {
      return errorResponse(res, 400, "Missing required fields");
    }

    const newTodo = await createTodo(userId, title, isCompleted);

    return successResponse(res, 201, "Todo created successfully", newTodo);
  } catch (error) {
    return errorResponse(
      res,
      500,
      (error as Error).message || "Internal server error"
    );
  }
};

export const updateTodoById = async (req: Request, res: Response) => {
  const todoId = parseInt(req.params.todoId, 10);
  const { title, isCompleted } = req.body;
  try {
    if (!todoId || !title || isCompleted === undefined) {
      return errorResponse(res, 400, "Missing required fields");
    }

    const updatedTodo = await updateTodo(todoId, title, isCompleted);

    return successResponse(res, 200, "Todo updated successfully", updatedTodo);
  } catch (error) {
    return errorResponse(
      res,
      500,
      (error as Error).message || "Internal server error"
    );
  }
};

export const deleteTodoById = async (req: Request, res: Response) => {
  const todoId = parseInt(req.params.todoId, 10);
  try {
    if (!todoId) {
      return errorResponse(res, 400, "Invalid todo ID");
    }
    await deleteTodo(todoId);
    return successResponse(res, 200, "Todo deleted successfully");
  } catch (error) {
    return errorResponse(
      res,
      500,
      (error as Error).message || "Internal server error"
    );
  }
};

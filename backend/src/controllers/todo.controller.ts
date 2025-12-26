import { Request, Response } from "express";
import {
  createTodo,
  deleteTodo,
  getTodosBySpecificDate,
  getTodosByUserId,
  getTodosDates,
  updateTodo,
} from "../services/todos.service";
import { errorResponse, successResponse } from "../utils/responseHelper";
import { AuthRequest } from "../middlewares/auth.middleware";
import dayjs from "dayjs";

export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return errorResponse(res, 400, "Invalid user ID");
    }

    const todos = await getTodosByUserId(userId);

    if (todos.length === 0) {
      return errorResponse(res, 200, "No todos found for this user");
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

export const createNewTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { Title, IsCompleted, DueDate } = req.body;

    const userId = req.user?.userId;

    if (!userId) {
      return errorResponse(res, 401, "Unauthorized");
    }

    if (!Title || IsCompleted === undefined) {
      return errorResponse(res, 400, "Missing required fields");
    }

    if (new Date(DueDate) < new Date()) {
      return successResponse(res, 200, "Due time cannot be in the past");
    }

    const newTodo = await createTodo(userId, Title, IsCompleted, DueDate);

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
  const { Title, IsCompleted } = req.body;
  try {
    const updatedTodo = await updateTodo(todoId, Title, IsCompleted);

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

export const getTodoDatesByRange = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return errorResponse(res, 401, "Unauthorized");
    }
    const { from, to } = req.query;

    if (!from || !to) {
      return errorResponse(res, 400, "From date and To date are required");
    }

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    const dates = await getTodosDates(userId, fromDate, toDate);

    const uniqueDates = Array.from(
      new Set(
        dates
          .filter((t) => t.DueDate)
          .map((t) => dayjs(t.DueDate).format("YYYY-MM-DD"))
      )
    );

    return successResponse(res, 201, "Get dates successfully", uniqueDates);
  } catch (error) {
    return errorResponse(
      res,
      500,
      (error as Error).message || "Internal server error"
    );
  }
};

export const getTodosByDate = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return errorResponse(res, 401, "Unauthorized");
    }

    const { date } = req.query;

    if (!date || typeof date !== "string") {
      return errorResponse(res, 400, "Date is required");
    }

    // validate format YYYY-MM-DD
    if (!dayjs(date, "YYYY-MM-DD", true).isValid()) {
      return errorResponse(res, 400, "Invalid date format (YYYY-MM-DD)");
    }

    const todos = await getTodosBySpecificDate(userId, date);

    return successResponse(res, 200, "Get todos by date successfully", todos);
  } catch (error) {
    console.error(error);
    return errorResponse(
      res,
      500,
      (error as Error).message || "Internal server error"
    );
  }
};

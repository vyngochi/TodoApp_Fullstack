import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responseHelper";
import {
  loginUser,
  refreshAccessToken,
  registerUser,
} from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email) {
      return errorResponse(res, 400, "Missing email");
    }

    if (!password) {
      return errorResponse(res, 400, "Missing password");
    }

    if (!firstName) {
      return errorResponse(res, 400, "Missing first name");
    }

    if (!lastName) {
      return errorResponse(res, 400, "Missing last name ");
    }

    const result = await registerUser(firstName, lastName, email, password);

    return successResponse(res, 201, result.message, result.user);
  } catch (error) {
    return errorResponse(
      res,
      500,
      (error as Error).message || "Internal server error"
    );
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return errorResponse(res, 400, "Missing email");
    }
    if (!password) {
      return errorResponse(res, 400, "Missing password");
    }
    const result = await loginUser(email, password);
    return successResponse(res, 200, "Login successful", result);
  } catch (error) {
    return errorResponse(
      res,
      500,
      (error as Error).message || "Internal server error"
    );
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return errorResponse(res, 400, "Missing refresh token");
    }

    const result = await refreshAccessToken(refreshToken);

    return successResponse(res, 200, "Token refreshed successfully", result);
  } catch (error) {
    return errorResponse(
      res,
      500,
      (error as Error).message || "Internal server error"
    );
  }
};

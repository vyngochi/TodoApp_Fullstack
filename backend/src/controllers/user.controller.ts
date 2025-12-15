import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { errorResponse, successResponse } from "../utils/responseHelper";
import { getUserProfile } from "../services/user.service";

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return errorResponse(res, 401, "Unauthorized: User ID not found");
    }

    const user = await getUserProfile(userId);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    return successResponse(
      res,
      200,
      "User profile retrieved successfully",
      user
    );
  } catch (error) {
    return errorResponse(
      res,
      500,
      (error as Error).message || "Internal server error"
    );
  }
};

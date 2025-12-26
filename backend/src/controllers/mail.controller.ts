import { Request, Response } from "express";
import { changePassword, sendOtp, verifyOtp } from "../services/mail.service";
import { errorResponse, successResponse } from "../utils/responseHelper";

export const sendOtpChangePassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    await sendOtp(email);
    return successResponse(res, 200, "OTP is sent");
  } catch (error) {
    return errorResponse(
      res,
      500,
      (error as Error).message || "Internal server error"
    );
  }
};

export const verifyOtpCode = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    await verifyOtp(otp, email);
    return successResponse(res, 200, "OTP is verified", true);
  } catch (error) {
    return errorResponse(
      res,
      500,
      (error as Error).message || "Internal server error"
    );
  }
};

export const changePasswordController = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  try {
    await changePassword(password, email);
    return successResponse(res, 200, "Password is changed successfully", true);
  } catch (error) {
    return errorResponse(
      res,
      500,
      (error as Error).message || "Internal server error"
    );
  }
};

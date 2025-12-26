import api from "@/config/axiosConfig";
import type { OTPPayload, PassChangingPayload } from "@/model/AuthModel";
import type { ResponseModel } from "@/model/ResponseModel";
import { useMutation } from "@tanstack/react-query";

export const useSendOtp = () => {
  return useMutation({
    mutationKey: ["SendOtp"],
    mutationFn: async (email: string) => {
      const response = await api.post<ResponseModel<any>>(
        "/todoapp/todos/sendOtp",
        { email }
      );
      return response.data;
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationKey: ["VerifyOTP"],
    mutationFn: async (payload: OTPPayload) => {
      const response = await api.post<ResponseModel<boolean>>(
        "/todoapp/todos/verify",
        payload
      );
      return response.data;
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["ChangePass"],
    mutationFn: async (payload: PassChangingPayload) => {
      const response = await api.put<ResponseModel<boolean>>(
        "/todoapp/todos/change-password",
        payload
      );

      return response.data;
    },
  });
};

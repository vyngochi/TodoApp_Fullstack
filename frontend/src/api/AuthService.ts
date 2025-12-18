import { useMutation } from "@tanstack/react-query";
import type { LoginPayload, LoginResponseModel } from "../model/AuthModel";
import api from "../config/axiosConfig";
import type { ResponseModel } from "../model/ResponseModel";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (payload: LoginPayload) => {
      const response = await api.post<ResponseModel<LoginResponseModel>>(
        "/todoapp/login",
        payload
      );
      return response.data.data?.accessToken;
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import type {
  LoginPayload,
  LoginResponseModel,
  SignUpPayload,
  SignUpResponseModel,
} from "../model/AuthModel";
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
      return response.data;
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (payload: SignUpPayload) => {
      const response = await api.post<ResponseModel<SignUpResponseModel>>(
        "/todoapp/register",
        payload
      );
      return response.data;
    },
  });
};

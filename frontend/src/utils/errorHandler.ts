import { AxiosError, isAxiosError } from "axios";
import { ERROR_MESSAGE } from "./Messages/SystemMessage";

interface ApiErrorResponse {
  message: string;
}
export const getErrorMessage = (error: unknown) => {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    if (axiosError.response?.data.message) {
      return axiosError.response.data.message;
    }

    if (axiosError.message) {
      return axiosError.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return ERROR_MESSAGE.UNKNOWN_ERROR;
};

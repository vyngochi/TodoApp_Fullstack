import { ValidateMessage } from "../Messages/AuthMessage";
import { EMAIL_REGEX } from "../regex";

export const checkEmail = (email: string) => {
  if (!EMAIL_REGEX.test(email)) {
    return ValidateMessage.InvalidEmail;
  }
};

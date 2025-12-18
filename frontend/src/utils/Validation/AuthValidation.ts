import { PASSWORD_REGEX } from "./../regex";
import { ValidateMessage } from "../Messages/AuthMessage";
import { EMAIL_REGEX } from "../regex";

export interface LoginValues {
  email?: string;
  password?: string;
}

export interface SignUpValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPass?: string;
}

export const validateLogin = (values: LoginValues) => {
  const errors: LoginValues = {};

  if (!values.email) {
    errors.email = ValidateMessage.Empty_Email;
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = ValidateMessage.InvalidEmail;
  }

  if (!values.password) {
    errors.password = ValidateMessage.Empty_Password;
  } else if (values.password.length < 6) {
    errors.password = ValidateMessage.InvalidPassword;
  }

  return errors;
};

export const validateSignUp = (values: SignUpValues) => {
  const errors: SignUpValues = {};

  if (!values.firstName) {
    errors.firstName = ValidateMessage.Empty_FirstName;
  }

  if (!values.lastName) {
    errors.lastName = ValidateMessage.Empty_LastName;
  }

  if (!values.email) {
    errors.email = ValidateMessage.Empty_Email;
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = ValidateMessage.InvalidEmail;
  }

  if (!values.password) {
    errors.password = ValidateMessage.Empty_Password;
  } else if (values.password.length < 8) {
    errors.password = ValidateMessage.InvalidPassword;
  } else if (!PASSWORD_REGEX.test(values.password)) {
    errors.password = ValidateMessage.IncorrectPasswordFormat;
  }

  if (values.password !== values.confirmPass) {
    errors.confirmPass = ValidateMessage.Mismatch_Password;
  }

  return errors;
};

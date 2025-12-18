import { useNavigate } from "react-router-dom";
import BackButtonAuthen from "../common/BackButtonAuthen";
import TextFieldAuthen from "../common/TextFieldAuthen";
import * as S from "./styles/SignUpForm.styled1";
import useValidateForm from "../../hooks/useValidateForm";
import { useSignUp } from "../../api/AuthService";
import { validateSignUp } from "../../utils/Validation/AuthValidation";
import { useNotification } from "../common/NotificationStack";
import {
  AUTH_NOTI_TITLE,
  AUTH_RES_MESS,
} from "../../utils/Messages/AuthMessage";
import { getErrorMessage } from "../../utils/errorHandler";

interface SignUpFormProps {
  setIsSignUp?: (value: boolean) => void;
}
export default function SignUpForm({ setIsSignUp }: SignUpFormProps) {
  const navigate = useNavigate();
  const signup = useSignUp();
  const { showSuccess, showError } = useNotification();

  const { errors, handleChange, handleSubmit, values } = useValidateForm(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPass: "",
    },
    validateSignUp,
    () => handleSignUp()
  );

  const handleSignUp = () => {
    signup.mutate(
      {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          setIsSignUp?.(false);
          showSuccess(AUTH_NOTI_TITLE.SIGNUP, AUTH_RES_MESS.SIGNUP_SUCCESS);
        },
        onError: (error: any) => {
          const errorMessage = getErrorMessage(error);
          showError(AUTH_NOTI_TITLE.SIGNUP, errorMessage);
        },
      }
    );
  };
  return (
    <S.SignUpWrapper>
      <BackButtonAuthen onClick={() => navigate("/")} />
      <S.TitleWrapper>
        <h1>Create an Account</h1>
        <p>Start organizing your tasks today</p>
      </S.TitleWrapper>
      <S.NameWrapper>
        <TextFieldAuthen
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Enter your first name"
          value={values.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <TextFieldAuthen
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Enter your last name"
          value={values.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
      </S.NameWrapper>
      <TextFieldAuthen
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextFieldAuthen
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />
      <TextFieldAuthen
        label="Confirm Password"
        name="confirmPass"
        type="password"
        placeholder="Enter your confirm password"
        value={values.confirmPass}
        onChange={handleChange}
        error={errors.confirmPass}
      />
      <S.ButtonWrapper>
        <S.SubmitButton onClick={(e) => handleSubmit(e)}>
          Create Account
        </S.SubmitButton>
      </S.ButtonWrapper>
      <S.HrWrapper>
        <hr />
        <span>OR</span>
      </S.HrWrapper>
      <S.ButtonWrapper>
        <S.SubmitButton>Sign Up with Google</S.SubmitButton>
      </S.ButtonWrapper>
      <S.TextWrapper>
        Already have an account?{" "}
        <S.LinkText onClick={() => setIsSignUp?.(false)}>Login</S.LinkText>
      </S.TextWrapper>
    </S.SignUpWrapper>
  );
}

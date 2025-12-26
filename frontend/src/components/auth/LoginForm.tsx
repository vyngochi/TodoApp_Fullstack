import { useNavigate } from "react-router-dom";
import { useLogin } from "../../api/AuthService.ts";
import useValidateForm from "../../hooks/useValidateForm.ts";
import { getErrorMessage } from "../../utils/errorHandler.ts";
import { validateLogin } from "../../utils/Validation/AuthValidation.ts";
import BackButtonAuthen from "../common/BackButtonAuthen.tsx";
import { useNotification } from "../common/NotificationStack.tsx";
import TextFieldAuthen from "../common/TextFieldAuthen.tsx";
import * as S from "./styles/LoginForm.styled.tsx";
import {
  AUTH_NOTI_TITLE,
  AUTH_RES_MESS,
} from "../../utils/Messages/AuthMessage.ts";
import { setLoginSuccess } from "../../store/AuthStore.ts";

interface LoginFormProps {
  setIsSignUp?: (value: boolean) => void;
  setIsForgot?: (value: boolean) => void;
}

export default function LoginForm({
  setIsSignUp,
  setIsForgot,
}: LoginFormProps) {
  const login = useLogin();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();

  const { errors, handleChange, handleSubmit, values } = useValidateForm(
    {
      email: "",
      password: "",
    },
    validateLogin,
    () => handleLogin()
  );

  const handleLogin = () => {
    login.mutate(
      { email: values.email, password: values.password },
      {
        onSuccess: (data) => {
          localStorage.setItem("accessToken", data.data?.accessToken ?? "");
          setLoginSuccess({
            accessToken: data.data?.accessToken || null,
            refreshToken: data.data?.refreshToken || null,
            isAuthenticated: true,
          });
          showSuccess(AUTH_NOTI_TITLE.LOGIN, AUTH_RES_MESS.LOGIN_SUCCESS);
          navigate("/mytodo/todos");
        },
        onError: (error: any) => {
          const message = getErrorMessage(error);
          showError(AUTH_NOTI_TITLE.LOGIN, message);
        },
      }
    );
  };

  return (
    <S.LoginFormWrapper>
      <BackButtonAuthen onClick={() => navigate("/")} />
      <S.TitleWrapper>
        <h1>Welcome Back</h1>
        <p>Sign in to access your tasks and boost your productivity</p>
      </S.TitleWrapper>
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
      <S.ForgotLinkWrapper>
        <p onClick={() => setIsForgot?.(true)}>Forgot password?</p>
      </S.ForgotLinkWrapper>
      <S.ButtonWrapper>
        <S.SubmitButton onClick={(e) => handleSubmit(e)}>Log In</S.SubmitButton>
      </S.ButtonWrapper>
      <S.HrWrapper>
        <hr />
        <span>OR</span>
      </S.HrWrapper>
      <S.ButtonWrapper>
        <S.SubmitButton>Continue with Google</S.SubmitButton>
      </S.ButtonWrapper>
      <S.TextWrapper>
        Already have an account?{" "}
        <S.LinkText onClick={() => setIsSignUp?.(true)}>Sign Up</S.LinkText>
      </S.TextWrapper>
    </S.LoginFormWrapper>
  );
}

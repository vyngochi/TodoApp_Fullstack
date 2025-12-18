import { useLogin } from "../../api/AuthService.ts";
import { getErrorMessage } from "../../utils/errorHandler.ts";
import { useNotification } from "../common/NotificationStack.tsx";
import TextFieldAuthen from "../common/TextFieldAuthen.tsx";
import * as S from "./styles/LoginForm.styled.tsx";

interface LoginFormProps {
  setIsSignUp?: (value: boolean) => void;
  email: string;
  password: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  error?: string;
}

export default function LoginForm({
  setIsSignUp,
  email,
  password,
  setEmail,
  setPassword,
  error,
}: LoginFormProps) {
  const useLoginMutate = useLogin();
  const { showSuccess, showError } = useNotification();

  const handleLogin = () => {
    useLoginMutate.mutate(
      { email: email, password: password },
      {
        onSuccess: () => showSuccess("ok", "login thanh cong"),
        onError: (error: any) => {
          const message = getErrorMessage(error);
          showError("Login Failed", message);
        },
      }
    );
  };

  return (
    <S.LoginFormWrapper>
      <S.TitleWrapper>
        <h1>Welcome Back</h1>
        <p>Sign in to access your tasks and boost your productivity</p>
      </S.TitleWrapper>
      <TextFieldAuthen
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        setValue={setEmail}
        error={error}
      />
      <TextFieldAuthen
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        setValue={setPassword}
      />
      <S.ButtonWrapper>
        <S.SubmitButton onClick={handleLogin}>Log In</S.SubmitButton>
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

import { useState } from "react";
import * as S from "./styles/AuthLayout.styled";
import SignUpForm from "../components/auth/SignUpForm";
import LoginForm from "../components/auth/LoginForm";

export default function AuthLayout() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <S.LayoutWrapper>
      <S.Logo>
        <img src="/public/logo.png" alt="App Logo" />
      </S.Logo>
      <S.AuthWrapper>
        {isSignUp ? (
          <SignUpForm setIsSignUp={setIsSignUp} />
        ) : (
          <LoginForm setIsSignUp={setIsSignUp} />
        )}
      </S.AuthWrapper>
    </S.LayoutWrapper>
  );
}

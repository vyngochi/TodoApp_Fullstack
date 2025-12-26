import { useState } from "react";
import * as S from "./styles/AuthLayout.styled";
import SignUpForm from "../components/auth/SignUpForm";
import LoginForm from "../components/auth/LoginForm";
import OTPSending from "@/components/auth/OTPSending";

export default function AuthLayout() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgot, setIsForgot] = useState(false);

  return (
    <S.LayoutWrapper>
      <S.Logo>
        <img src="/public/logo.png" alt="App Logo" />
      </S.Logo>
      <S.AuthWrapper>
        {isSignUp ? (
          <SignUpForm setIsSignUp={setIsSignUp} />
        ) : !isForgot ? (
          <LoginForm setIsSignUp={setIsSignUp} setIsForgot={setIsForgot} />
        ) : (
          <OTPSending setIsSignUp={setIsSignUp} setIsForgot={setIsForgot} />
        )}
      </S.AuthWrapper>
    </S.LayoutWrapper>
  );
}

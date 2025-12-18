import { useState } from "react";
import * as S from "./styles/AuthLayout.styled";
import SignUpForm from "../components/auth/SignUpForm";
import LoginForm from "../components/auth/LoginForm";
import { checkEmail } from "../utils/Validation/AuthValidation";

export default function AuthLayout() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let invalidEmailMessage;
  if (email.trim() !== "") {
    invalidEmailMessage = checkEmail(email);
  }

  return (
    <S.LayoutWrapper>
      <S.Logo>
        <img src="./../../public/logo.png" alt="App Logo" />
      </S.Logo>
      <S.AuthWrapper>
        {isSignUp ? (
          <SignUpForm setIsSignUp={setIsSignUp} />
        ) : (
          <LoginForm
            setIsSignUp={setIsSignUp}
            email={email || ""}
            password={password || ""}
            setEmail={setEmail}
            setPassword={setPassword}
            error={invalidEmailMessage}
          />
        )}
      </S.AuthWrapper>
    </S.LayoutWrapper>
  );
}

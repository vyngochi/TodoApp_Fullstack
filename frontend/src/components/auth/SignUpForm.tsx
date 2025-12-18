import TextFieldAuthen from "../common/TextFieldAuthen";
import * as S from "./styles/SignUpForm.styled1";

interface SignUpFormProps {
  setIsSignUp?: (value: boolean) => void;
}
export default function SignUpForm({ setIsSignUp }: SignUpFormProps) {
  return (
    <S.SignUpWrapper>
      <S.TitleWrapper>
        <h1>Create an Account</h1>
        <p>Start organizing your tasks today</p>
      </S.TitleWrapper>
      <S.NameWrapper>
        <TextFieldAuthen label="First Name" />
        <TextFieldAuthen label="Last Name" />
      </S.NameWrapper>
      <TextFieldAuthen label="Email" />
      <TextFieldAuthen label="Password" />
      <TextFieldAuthen label="Confirm Password" />
      <S.ButtonWrapper>
        <S.SubmitButton>Create Account</S.SubmitButton>
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

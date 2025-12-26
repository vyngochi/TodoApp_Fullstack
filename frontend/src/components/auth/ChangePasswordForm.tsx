import useValidateForm from "@/hooks/useValidateForm";
import TextFieldAuthen from "../common/TextFieldAuthen";
import * as S from "./styles/LoginForm.styled";
import { validatePasswordChange } from "@/utils/Validation/AuthValidation";

interface ChangePasswordFormProps {
  onSubmit: (value: string) => void;
}
export default function ChangePasswordForm({
  onSubmit,
}: ChangePasswordFormProps) {
  const { errors, handleChange, handleSubmit, values } = useValidateForm(
    {
      password: "",
      confirmPassword: "",
    },
    validatePasswordChange,
    () => onSubmit(values.password)
  );

  return (
    <S.LoginFormWrapper>
      <S.TitleWrapper>
        <h1>Password Changing</h1>
      </S.TitleWrapper>
      <TextFieldAuthen
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your new password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />
      <TextFieldAuthen
        label="Confirm New Password"
        name="confirmPassword"
        type="password"
        placeholder="Enter your new password"
        value={values.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />
      <S.ButtonWrapper>
        <S.SubmitButton onClick={(e) => handleSubmit(e)}>
          Change Password
        </S.SubmitButton>
      </S.ButtonWrapper>
    </S.LoginFormWrapper>
  );
}

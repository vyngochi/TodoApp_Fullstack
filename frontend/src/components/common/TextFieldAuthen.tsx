import { useEffect, type ChangeEvent } from "react";
import * as S from "./styles/TextFieldAuthen.styled";
import { useDebounce } from "../../hooks/useDebounce";

interface TextFieldAuthenProps {
  label?: string;
  name?: string;
  type?: "text" | "password" | "email";
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function TextFieldAuthen({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}: TextFieldAuthenProps) {
  return (
    <S.TextFieldWrapper>
      <S.Label>{label}</S.Label>
      <S.TextField
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.TextFieldWrapper>
  );
}

import { useEffect, useRef, useState } from "react";
import * as S from "./styles/TextFieldAuthen.styled";
import { useDebounce } from "../../hooks/useDebounce";

interface TextFieldAuthenProps {
  label?: string;
  type?: "text" | "password" | "email";
  placeholder?: string;
  value?: string;
  setValue?: (value: string) => void;
  error?: string;
}

export default function TextFieldAuthen({
  label,
  type,
  placeholder,
  value,
  setValue,
  error,
}: TextFieldAuthenProps) {
  const debounceValue = useDebounce(value);

  useEffect(() => {
    setValue?.(debounceValue ?? "");
  }, [debounceValue]);

  return (
    <S.TextFieldWrapper>
      <S.Label>{label}</S.Label>
      <S.TextField
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue?.(e.target.value)}
      />
      <S.ErrorText>{error}</S.ErrorText>
    </S.TextFieldWrapper>
  );
}

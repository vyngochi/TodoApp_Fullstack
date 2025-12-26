import { useEffect, useState, type ChangeEvent } from "react";
import * as S from "./styles/TextFieldAuthen.styled";

interface TextFieldAuthenProps {
  label?: string;
  name?: string;
  type?: "text" | "password" | "email";
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  onSend?: (e: React.FormEvent) => void;
  isSuccess: boolean;
}

export default function EmailFieldSendingOTP({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  onSend,
  isSuccess,
}: TextFieldAuthenProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 0) return;

    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [count]);

  const handleSend = (e: React.FormEvent) => {
    onSend?.(e);
    setCount(40);
  };

  return (
    <S.TextFieldWrapper>
      <S.Label>{label}</S.Label>
      <S.FieldWrapper>
        <S.TextField
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <S.InsideButton
          $disabled={count > 0 && isSuccess}
          disabled={count > 0 && isSuccess}
          onClick={(e) => handleSend(e)}
        >
          {count > 0 && isSuccess ? `${count}s` : "Send"}
        </S.InsideButton>
      </S.FieldWrapper>

      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.TextFieldWrapper>
  );
}

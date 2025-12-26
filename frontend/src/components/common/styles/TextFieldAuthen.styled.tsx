import styled, { css } from "styled-components";

export const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
`;

export const TextField = styled.input`
  width: 75%;
  border: none;
  padding: 8px 5px;
  margin: 5px;

  &:focus {
    outline: none;
  }
`;

export const TextFieldAuth = styled.input`
  padding: 8px 10px;
  border-radius: 10px;
  border: 1.5px solid #ccc;

  &:focus {
    outline: none;
    border-color: #6d88ea;
    box-shadow: 0 0 5px rgba(54, 79, 171, 0.5);
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: smaller;
  margin: 0 10px;
`;

export const FieldWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 10px;
  border: 1.5px solid #ccc;

  &:focus {
    outline: none;
    border-color: #6d88ea;
    box-shadow: 0 0 5px rgba(54, 79, 171, 0.5);
  }
`;

export const InsideButton = styled.button<{ $disabled: boolean }>`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);

  height: 30px;
  padding: 0 12px;
  border-radius: 8px;
  border: none;
  background: #364fab;
  color: white;
  cursor: pointer;

  &:hover {
    background: #5a74d6;
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      background: #ccc;

      &:hover {
        background: #ccc;
      }
    `}
`;

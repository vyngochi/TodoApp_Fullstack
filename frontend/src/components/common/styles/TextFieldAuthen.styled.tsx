import styled from "styled-components";

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

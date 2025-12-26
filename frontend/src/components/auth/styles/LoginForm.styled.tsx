import styled from "styled-components";

export const LoginFormWrapper = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;

  h1 {
    font-size: 30px !important;
    margin-bottom: 0;
  }

  p {
    font-size: 15px;
    font-weight: 300;
    color: #686868;
    margin: 0;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubmitButton = styled.button`
  background-color: #364fab;
  box-shadow: 0px 4px 10px rgba(54, 79, 171, 0.3);
  width: 100%;
  max-width: 250px;
  height: 38px;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #2c3ea8;
  }
`;

export const HrWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 250px;
  margin: 15px auto;
  color: #666;

  &::before {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ccc;
    margin-right: 10px;
  }

  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ccc;
    margin-left: 10px;
  }

  span {
    font-weight: 500;
  }
`;

export const TextWrapper = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LinkText = styled.span`
  color: #364fab;
  cursor: pointer;
  font-weight: 500;
`;

export const ForgotLinkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  p {
    margin: 0;
    padding: 0;
    color: #076e6e;
    font-style: italic;
    font-size: 14px;
    cursor: pointer;
  }
`;

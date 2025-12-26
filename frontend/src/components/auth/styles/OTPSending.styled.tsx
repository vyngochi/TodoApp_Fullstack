import styled from "styled-components";

export const OTPSendingWrapper = styled.div`
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

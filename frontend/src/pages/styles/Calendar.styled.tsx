import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const CalendarWrapper = styled.div`
  font-family: "Lexend", sans-serif;
  height: calc(100vh - 100px);
  overflow-y: auto;
`;
export const Title = styled.h1`
  text-align: center;
  font-size: 48px;
  font-weight: 800;
  background: linear-gradient(135deg, #364fab 0%, #5a7de8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;
export const CalendarContent = styled.div`
  margin: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

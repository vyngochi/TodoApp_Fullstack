import styled from "styled-components";
import "react-day-picker/dist/style.css";

export const CalendarWrapper = styled.div`
  padding: 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(54, 79, 171, 0.1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  width: fit-content;
  font-family: "Lexend", sans-serif;

  .selected {
    background: linear-gradient(135deg, #364fab 0%, #5a7de8 100%) !important;
    color: white !important;
    font-weight: 700;
    transform: scale(1.05);
    border-radius: 10px;
  }

  .today {
    font-weight: 700;
    color: #364fab;
  }

  .day-has-todo {
    position: relative;
  }

  .day-has-todo::after {
    content: "";
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: green;
  }
`;

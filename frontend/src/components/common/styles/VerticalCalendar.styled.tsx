import styled from "styled-components";

export const CalendarContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
`;

export const NavHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    font-size: 1rem;
    color: #1e293b;
    text-transform: capitalize;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f1f5f9;
    border: none;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background: #e2e8f0;
    }
  }
`;

export const WeekList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DayItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  background: ${(props) => (props.active ? "#3b82f6" : "#f8fafc")};
  border: 1px solid ${(props) => (props.active ? "#3b82f6" : "#f1f5f9")};
  color: ${(props) => (props.active ? "white" : "black")};
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
  }
`;

export const DateCircle = styled.div<{ active: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background: ${(props) => (props.active ? "#fff" : "#fff")};
  color: ${(props) => (props.active ? "#3b82f6" : "#1e293b")};
  margin-right: 15px;
  font-size: 1.1rem;
`;

export const DateInfo = styled.div`
  display: flex;
  flex-direction: column;

  .day-name {
    font-weight: 600;
    color: inherit; /* Tự động đổi sang trắng khi DayItem active */
    text-transform: capitalize;
  }

  .full-date {
    font-size: 0.8rem;
    opacity: 0.7;
  }
`;

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

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  font-family: "Lexend", sans-serif;
`;

export const ContentWrapper = styled.div`
  height: calc(100vh - 100px);
  overflow-y: auto;
  /* padding-bottom: 500px; */
`;

export const Header = styled.div`
  max-width: 1000px;
  margin: 0 auto 50px;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: 800;
  background: linear-gradient(135deg, #364fab 0%, #5a7de8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const SubTitle = styled.p`
  font-size: 18px;
  color: #686868;
  font-weight: 500;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto 40px;
  animation: ${fadeIn} 0.6s ease-out 0.2s backwards;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

export const StatItem = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(54, 79, 171, 0.08);
  border: 1px solid rgba(54, 79, 171, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(54, 79, 171, 0.15);
  }
`;

export const StatNumber = styled.div`
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(135deg, #364fab 0%, #5a7de8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #686868;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InputSection = styled.div`
  max-width: 1000px;
  margin: 0 auto 30px;
  animation: ${slideInLeft} 0.6s ease-out 0.3s backwards;
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 12px;
  background: white;
  padding: 12px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(54, 79, 171, 0.1);
  border: 1px solid rgba(54, 79, 171, 0.2);
  transition: all 0.3s ease;

  &:focus-within {
    box-shadow: 0 8px 30px rgba(54, 79, 171, 0.2);
    border-color: #364fab;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 14px 20px;
  font-size: 16px;
  font-family: "Lexend", sans-serif;
  color: #333;
  background: transparent;

  &::placeholder {
    color: #999;
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

export const AddButton = styled.button`
  background: linear-gradient(135deg, #364fab 0%, #5a7de8 100%);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  font-family: "Lexend", sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  white-space: nowrap;

  span {
    font-size: 20px;
    font-weight: 700;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(54, 79, 171, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 12px;
  max-width: 1000px;
  margin: 0 auto 30px;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${fadeIn} 0.6s ease-out 0.4s backwards;
`;

export const FilterButton = styled.button<{ active: boolean }>`
  padding: 10px 24px;
  border: 2px solid ${(props) => (props.active ? "#364fab" : "#ccc")};
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #364fab 0%, #5a7de8 100%)"
      : "white"};
  color: ${(props) => (props.active ? "white" : "#686868")};
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: "Lexend", sans-serif;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) =>
      props.active
        ? "0 8px 20px rgba(54, 79, 171, 0.4)"
        : "0 4px 12px rgba(54, 79, 171, 0.15)"};
  }
`;

export const TodoList = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${fadeIn} 0.6s ease-out 0.5s backwards;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export const TodoItem = styled.div<{ completed: boolean }>`
  background: white;
  padding: 20px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 15px rgba(54, 79, 171, 0.08);
  border: 1px solid rgba(54, 79, 171, 0.1);
  transition: all 0.3s ease;
  opacity: ${(props) => (props.completed ? 0.7 : 1)};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(54, 79, 171, 0.15);
  }

  @media (max-width: 768px) {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TodoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;

export const CompleteButton = styled.button<{ completed: boolean }>`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 10px;
  border: 2px solid ${(props) => (props.completed ? "#364fab" : "#ccc")};
  background: ${(props) =>
    props.completed
      ? "linear-gradient(135deg, #364fab 0%, #5a7de8 100%)"
      : "transparent"};
  color: ${(props) => (props.completed ? "white" : "transparent")};
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #364fab;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const TodoText = styled.span<{ completed: boolean }>`
  font-size: 16px;
  color: ${(props) => (props.completed ? "#999" : "#333")};
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  font-weight: 500;
  transition: all 0.3s ease;
  word-break: break-word;
`;

export const TodoActions = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    gap: 8px;
  }
`;

export const EditButton = styled.button`
  background: linear-gradient(135deg, #364fab 0%, #5a7de8 100%);
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: "Lexend", sans-serif;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(54, 79, 171, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
    flex: 1;
  }
`;

export const DeleteButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: "Lexend", sans-serif;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 107, 107, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
    flex: 1;
  }
`;

export const EditInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  align-items: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const EditInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #364fab;
  border-radius: 10px;
  font-size: 16px;
  font-family: "Lexend", sans-serif;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    box-shadow: 0 4px 12px rgba(54, 79, 171, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SaveButton = styled.button`
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: "Lexend", sans-serif;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(76, 175, 80, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
    flex: 1;
  }
`;

export const CancelButton = styled.button`
  background: linear-gradient(135deg, #757575 0%, #616161 100%);
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: "Lexend", sans-serif;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(117, 117, 117, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
    flex: 1;
  }
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  background: rgba(54, 79, 171, 0.05);
  border-radius: 16px;
  border: 2px dashed rgba(54, 79, 171, 0.2);

  p {
    font-size: 18px;
    color: #686868;
    font-weight: 500;
  }
`;

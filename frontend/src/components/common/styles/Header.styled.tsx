import styled, { keyframes } from "styled-components";

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const HeaderWrapper = styled.div`
  background: white;
  border-bottom: 1px solid rgba(54, 79, 171, 0.1);
  height: 80px;
  box-shadow: 0 2px 8px rgba(54, 79, 171, 0.08);
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
  height: 100%;
`;

export const Logo = styled.div`
  width: 150px;
  height: 80px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const AvatarContainer = styled.div`
  position: relative;
`;

export const ProfileAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid rgba(54, 79, 171, 0.3);
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
  }
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #364fab;
    box-shadow: 0 4px 12px rgba(54, 79, 171, 0.2);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 70px;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(54, 79, 171, 0.15);
  border: 1px solid rgba(54, 79, 171, 0.1);
  min-width: 180px;
  overflow: hidden;
  z-index: 1000;
  animation: ${slideDown} 0.3s ease-out;
`;

export const MenuItem = styled.button<{ danger?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  color: ${(props) => (props.danger ? "#ff6b6b" : "#333")};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  align-content: center;
  gap: 12px;
  font-family: "Lexend", sans-serif;
  transition: all 0.2s ease;

  span {
    font-size: 15px;
  }

  &:hover {
    background: ${(props) =>
      props.danger ? "rgba(255, 107, 107, 0.1)" : "rgba(54, 79, 171, 0.08)"};
  }

  &:active {
    background: ${(props) =>
      props.danger ? "rgba(255, 107, 107, 0.15)" : "rgba(54, 79, 171, 0.15)"};
  }
`;

export const MenuDivider = styled.div`
  height: 1px;
  background: rgba(54, 79, 171, 0.1);
  margin: 8px 0;
`;

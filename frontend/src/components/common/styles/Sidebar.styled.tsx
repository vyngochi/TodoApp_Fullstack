import styled, { css } from "styled-components";

export const SideBarWrapper = styled.div`
  font-family: "Lexend", sans-serif;
  border-right: 1px solid #ccc;
  /* width: 100%;
  max-width: 150px; */
  height: calc(100vh - 100px);
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const SideBarItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  padding: 5px;

  ${({ $active }) =>
    $active &&
    css`
      background-color: #d4dbf7;
      border-radius: 10px;
      padding: 5px;
      color: #6d88ea;
      font-weight: 600;
      box-shadow: 0 4px 6px rgba(6, 78, 105, 0.1);
    `}
`;

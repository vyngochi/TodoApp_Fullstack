import styled from "styled-components";

export const SideBarWrapper = styled.div`
  font-family: "Lexend", sans-serif;
  border-right: 1px solid #ccc;
  width: 100%;
  max-width: 150px;
  height: calc(100vh - 100px);
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const SideBarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  flex: 1;
  gap: 0;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

export const MainContent = styled.div``;

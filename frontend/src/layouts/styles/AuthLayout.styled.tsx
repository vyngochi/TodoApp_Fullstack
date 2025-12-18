import styled from "styled-components";

export const LayoutWrapper = styled.div`
  * {
    font-family: "Lexend", sans-serif;
  }

  display: flex;
  min-height: 90vh;
  position: relative;
`;
export const Logo = styled.div`
  width: 150px;
  height: 100px;
  position: absolute;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const AuthWrapper = styled.div`
  margin: auto;
`;

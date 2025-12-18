import styled from "styled-components";

export const HeaderWrapper = styled.div`
  border-bottom: 1px solid #ccc;
  height: 80px;
`;
export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
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
export const ProfileAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #686868;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

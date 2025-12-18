import * as S from "./styles/Header.styled";
export default function Header() {
  return (
    <S.HeaderWrapper>
      <S.HeaderContent>
        <S.Logo>
          <img src="/public/logo.png" />
        </S.Logo>
        <S.ProfileAvatar>
          <img src="/public/logo.png" />
        </S.ProfileAvatar>
      </S.HeaderContent>
    </S.HeaderWrapper>
  );
}

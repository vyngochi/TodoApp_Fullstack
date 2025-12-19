import { useState, useRef, useEffect } from "react";
import * as S from "./styles/Header.styled";
import { LogOut, Settings, UserCog } from "lucide-react";
import { logout } from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleProfile = () => {
    setIsMenuOpen(false);
  };

  const handleSettings = () => {
    setIsMenuOpen(false);
  };

  return (
    <S.HeaderWrapper>
      <S.HeaderContent>
        <S.Logo>
          <img src="/public/logo.png" />
        </S.Logo>
        <S.AvatarContainer ref={menuRef}>
          <S.ProfileAvatar onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <img src="/public/logo.png" />
          </S.ProfileAvatar>
          {isMenuOpen && (
            <S.DropdownMenu>
              <S.MenuItem onClick={handleProfile}>
                <UserCog />
                <span>My Profile</span>
              </S.MenuItem>
              <S.MenuItem onClick={handleSettings}>
                <Settings />
                <span>Settings</span>
              </S.MenuItem>
              <S.MenuDivider />
              <S.MenuItem onClick={handleLogout} danger>
                <LogOut />
                <span>Logout</span>
              </S.MenuItem>
            </S.DropdownMenu>
          )}
        </S.AvatarContainer>
      </S.HeaderContent>
    </S.HeaderWrapper>
  );
}

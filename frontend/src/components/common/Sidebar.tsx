import {
  CalendarCheck,
  ListTodo,
  UserRoundCog,
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import * as S from "./styles/Sidebar.styled";
import { useLocation, useNavigate } from "react-router-dom";
import type React from "react";
import { useState, useEffect } from "react";

interface MenuSideBar {
  id: number;
  icon: React.ReactNode;
  title: string;
  path: string;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const menuSidebar: MenuSideBar[] = [
    {
      id: 1,
      icon: <ListTodo />,
      title: "My Tasks",
      path: "/mytodo/todos",
    },
    {
      id: 2,
      icon: <CalendarCheck />,
      title: "Calendar",
      path: "/mytodo/calendar",
    },
    {
      id: 3,
      icon: <UserRoundCog />,
      title: "Settings",
      path: "/mytodo/settings",
    },
  ];

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const handleOverlayClick = (): void => {
    setIsMobileOpen(false);
  };

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavigation = (path: string): void => {
    navigate(path);
  };

  return (
    <>
      <S.MobileToggle onClick={() => setIsMobileOpen(!isMobileOpen)}>
        {isMobileOpen ? <X /> : <Menu />}
      </S.MobileToggle>

      <S.MobileOverlay $isOpen={isMobileOpen} onClick={handleOverlayClick} />

      <S.SideBarWrapper
        className={`${isMobileOpen ? "open" : ""} ${
          isCollapsed ? "collapsed" : ""
        }`}
      >
        <S.DesktopToggle
          onClick={() => setIsCollapsed(!isCollapsed)}
          $isCollapsed={isCollapsed}
        >
          {isCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
        </S.DesktopToggle>

        <S.SidebarContent>
          <S.SidebarSection>
            {!isCollapsed && <S.SectionTitle>Main Menu</S.SectionTitle>}
            {menuSidebar.map((menu) => {
              const isActive = location.pathname === menu.path;

              return (
                <S.SideBarItem
                  key={menu.id}
                  $active={isActive}
                  onClick={() => handleNavigation(menu.path)}
                  title={isCollapsed ? menu.title : undefined}
                >
                  {menu.icon}
                  {!isCollapsed && (
                    <>
                      <S.ItemLabel>{menu.title}</S.ItemLabel>
                    </>
                  )}
                </S.SideBarItem>
              );
            })}
          </S.SidebarSection>
        </S.SidebarContent>
      </S.SideBarWrapper>
    </>
  );
}

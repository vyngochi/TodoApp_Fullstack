import { CalendarCheck, ListTodo, UserRoundCog } from "lucide-react";
import * as S from "./styles/Sidebar.styled";
import { useLocation, useNavigate } from "react-router-dom";
import type React from "react";

interface MenuSideBar {
  id: number;
  icon: React.ReactNode;
  title: string;
  path: string;
}
export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuSidebar: MenuSideBar[] = [
    { id: 1, icon: <ListTodo />, title: "My Tasks", path: "/mytodo/todos" },
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

  return (
    <S.SideBarWrapper>
      <S.SidebarContent>
        {menuSidebar.map((menu) => {
          const isActive = location.pathname === menu.path;

          return (
            <S.SideBarItem
              key={menu.id}
              $active={isActive}
              onClick={() => navigate(menu.path)}
            >
              {menu.icon}
              {menu.title}
            </S.SideBarItem>
          );
        })}
      </S.SidebarContent>
    </S.SideBarWrapper>
  );
}

import { CalendarCheck, ListTodo, UserRoundCog } from "lucide-react";
import * as S from "./styles/Sidebar.styled";

export default function Sidebar() {
  const menuSidebar = [
    { icon: <ListTodo />, title: "My Tasks" },
    { icon: <CalendarCheck />, title: "Calendar" },
    { icon: <UserRoundCog />, title: "Settings" },
  ];
  return (
    <S.SideBarWrapper>
      <S.SidebarContent>
        {menuSidebar.map((menu) => (
          <S.SideBarItem>
            {menu.icon} {menu.title}
          </S.SideBarItem>
        ))}
      </S.SidebarContent>
    </S.SideBarWrapper>
  );
}

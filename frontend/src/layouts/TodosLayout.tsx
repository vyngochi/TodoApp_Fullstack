import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
// import MyTasks from "../pages/MyTasks";
import {
  LayoutWrapper,
  ContentWrapper,
  MainContent,
} from "./styles/TodosLayout.styled";

export default function TodosLayout() {
  return (
    <LayoutWrapper>
      <Header />
      <ContentWrapper>
        <Sidebar />
        <MainContent>
          <Outlet />
        </MainContent>
      </ContentWrapper>
    </LayoutWrapper>
  );
}

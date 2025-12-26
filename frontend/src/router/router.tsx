import { createBrowserRouter } from "react-router-dom";
import TodoLandingPage from "../pages/Landing";
import AuthLayout from "../layouts/AuthLayout";
import TodosLayout from "../layouts/TodosLayout";
import MyTasks from "../pages/MyTasks";
import Calendar from "../pages/Calendar";
import Settings from "../pages/Settings";
// import MyTas from "../pages/MyTasks";

export const router = createBrowserRouter([
  { path: "/", element: <TodoLandingPage /> },
  { path: "/auth", element: <AuthLayout /> },
  {
    path: "/mytodo",
    element: <TodosLayout />,
    children: [
      { path: "todos", element: <MyTasks /> },
      {
        path: "calendar",
        element: <Calendar />,
      },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

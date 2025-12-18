import { createBrowserRouter } from "react-router-dom";
import TodoLandingPage from "../pages/Landing";
import AuthLayout from "../layouts/AuthLayout";
import Test from "../pages/test";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  { path: "/", element: <TodoLandingPage /> },
  { path: "/auth", element: <AuthLayout /> },
  { path: "/test", element: <Test /> },
  { path: "/mytodo", element: <Home /> },
]);

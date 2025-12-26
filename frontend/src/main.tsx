import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "./components/common/NotificationStack.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "./components/ui/provider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </NotificationProvider>
    </Provider>
  </StrictMode>
);

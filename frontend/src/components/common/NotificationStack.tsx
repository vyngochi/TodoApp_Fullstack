import React, {
  useState,
  useEffect,
  type JSX,
  createContext,
  useContext,
} from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from "lucide-react";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
`;

type NotificationType = "success" | "error" | "warning" | "info";

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  isExiting: boolean;
}

interface NotificationItemProps {
  $type: NotificationType;
  $isExiting: boolean;
}

interface ProgressBarProps {
  duration: number;
}

interface NotificationContextType {
  showSuccess: (title: string, message: string) => void;
  showError: (title: string, message: string) => void;
  showWarning: (title: string, message: string) => void;
  showInfo: (title: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

const slideIn = keyframes`
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
`;

const progress = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  width: 100%;

  @media (max-width: 768px) {
    left: 20px;
    right: 20px;
    max-width: none;
  }
`;

const getBackgroundColor = (type: NotificationType): string => {
  switch (type) {
    case "success":
      return "linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.95) 100%)";
    case "error":
      return "linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.95) 100%)";
    case "warning":
      return "linear-gradient(135deg, rgba(251, 191, 36, 0.95) 0%, rgba(245, 158, 11, 0.95) 100%)";
    case "info":
      return "linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%)";
    default:
      return "linear-gradient(135deg, rgba(54, 79, 171, 0.95) 0%, rgba(90, 125, 232, 0.95) 100%)";
  }
};

const NotificationItem = styled.div<NotificationItemProps>`
  background: ${(props) => getBackgroundColor(props.$type)};
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-start;
  gap: 16px;
  position: relative;
  overflow: hidden;
  animation: ${(props) => (props.$isExiting ? slideOut : slideIn)} 0.4s
    cubic-bezier(0.68, -0.55, 0.265, 1.55);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4);
  }

  transition: transform 0.2s ease;
`;

const ProgressBar = styled.div<ProgressBarProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  animation: ${progress} ${(props) => props.duration}ms linear;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  flex-shrink: 0;
  animation: ${pulse} 2s ease-in-out infinite;

  svg {
    color: white;
    width: 24px;
    height: 24px;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 0;
`;

const Message = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.4;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }

  svg {
    color: white;
    width: 18px;
    height: 18px;
  }
`;

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [nextId, setNextId] = useState<number>(1);

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isExiting: true } : n))
    );
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 400); // Khớp với thời gian animation slideOut
  };

  const addNotification = (
    type: NotificationType,
    title: string,
    message: string
  ) => {
    const id = nextId;
    setNextId((prev) => prev + 1);
    setNotifications((prev) => [
      ...prev,
      { id, type, title, message, isExiting: false },
    ]);

    // Tự động tắt sau 5s
    setTimeout(() => removeNotification(id), 5000);
  };

  // Các hàm helper để code gọn hơn
  const showSuccess = (t: string, m: string) =>
    addNotification("success", t, m);
  const showError = (t: string, m: string) => addNotification("error", t, m);
  const showWarning = (t: string, m: string) =>
    addNotification("warning", t, m);
  const showInfo = (t: string, m: string) => addNotification("info", t, m);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircle />;
      case "error":
        return <AlertCircle />;
      case "warning":
        return <AlertTriangle />;
      default:
        return <Info />;
    }
  };

  return (
    <NotificationContext.Provider
      value={{ showSuccess, showError, showWarning, showInfo }}
    >
      {/* Render nội dung trang web */}
      {children}

      {/* Render danh sách thông báo nằm đè lên trên cùng */}
      <NotificationContainer>
        {notifications.map((notif) => (
          <NotificationItem
            key={notif.id}
            $type={notif.type}
            $isExiting={notif.isExiting}
          >
            <IconWrapper>{getIcon(notif.type)}</IconWrapper>
            <Content>
              <Title>{notif.title}</Title>
              <Message>{notif.message}</Message>
            </Content>
            <CloseButton onClick={() => removeNotification(notif.id)}>
              <X />
            </CloseButton>
            {!notif.isExiting && <ProgressBar duration={5000} />}
          </NotificationItem>
        ))}
      </NotificationContainer>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

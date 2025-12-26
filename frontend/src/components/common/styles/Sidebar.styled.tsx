import styled, { css } from "styled-components";

export const SideBarWrapper = styled.div`
  font-family: "Lexend", sans-serif;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-right: 2px solid rgba(54, 79, 171, 0.1);
  width: 100%;
  max-width: 250px;
  height: calc(100vh - 100px);
  position: sticky;
  top: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;

  &.collapsed {
    max-width: 80px;

    @media (max-width: 1024px) {
      max-width: 70px;
    }
  }

  @media (max-width: 1024px) {
    max-width: 200px;
  }

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    max-width: 280px;
    transform: translateX(-100%);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

    &.open {
      transform: translateX(0);
    }

    &.collapsed {
      max-width: 280px;
    }
  }

  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(54, 79, 171, 0.2);
    border-radius: 10px;

    &:hover {
      background: rgba(54, 79, 171, 0.3);
    }
  }
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  gap: 8px;

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

export const SideBarItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 12px;
  transition: all 0.2s ease;
  position: relative;
  font-size: 15px;
  font-weight: 500;
  color: #4a5568;
  user-select: none;

  .collapsed & {
    justify-content: center;
    padding: 12px;
  }

  svg {
    width: 20px;
    height: 20px;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  ${({ $active }) =>
    !$active &&
    css`
      &:hover {
        background: rgba(54, 79, 171, 0.05);
        color: #364fab;
        transform: translateX(4px);

        .collapsed & {
          transform: scale(1.05);
        }

        svg {
          color: #364fab;
        }
      }
    `}

  ${({ $active }) =>
    $active &&
    css`
      background: linear-gradient(
        135deg,
        rgba(54, 79, 171, 0.1) 0%,
        rgba(90, 125, 232, 0.1) 100%
      );
      color: #364fab;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(54, 79, 171, 0.15);

      svg {
        color: #364fab;
        transform: scale(1.1);
      }

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 60%;
        background: linear-gradient(180deg, #364fab 0%, #5a7de8 100%);
        border-radius: 0 4px 4px 0;
        box-shadow: 0 0 10px rgba(54, 79, 171, 0.4);
      }
    `}
  
  &:active {
    transform: scale(0.98);

    .collapsed & {
      transform: scale(0.95);
    }
  }

  @media (max-width: 768px) {
    padding: 14px 18px;
    font-size: 16px;

    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

export const SidebarSection = styled.div`
  margin-top: 24px;

  &:first-child {
    margin-top: 0;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 16px 12px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 0 18px 14px;
  }
`;

export const MobileOverlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    z-index: 99;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;

    ${({ $isOpen }) =>
      $isOpen &&
      css`
        opacity: 1;
        pointer-events: all;
      `}
  }
`;

export const MobileToggle = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #364fab 0%, #5a7de8 100%);
    border: none;
    box-shadow: 0 4px 20px rgba(54, 79, 171, 0.4);
    cursor: pointer;
    z-index: 101;
    transition: all 0.3s ease;

    svg {
      color: white;
      width: 24px;
      height: 24px;
    }

    &:active {
      transform: scale(0.95);
    }

    &:hover {
      box-shadow: 0 6px 24px rgba(54, 79, 171, 0.5);
    }
  }
`;

export const ItemLabel = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ItemBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: linear-gradient(135deg, #364fab 0%, #5a7de8 100%);
  color: white;
  font-size: 11px;
  font-weight: 700;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(54, 79, 171, 0.2);
`;

export const DesktopToggle = styled.button<{ $isCollapsed: boolean }>`
  position: absolute;
  top: 20px;
  right: -16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #364fab 0%, #5a7de8 100%);
  border: 2px solid rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 12px rgba(54, 79, 171, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 101;

  svg {
    color: white;
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(54, 79, 171, 0.4);

    svg {
      transform: translateX(
        ${({ $isCollapsed }) => ($isCollapsed ? "2px" : "-2px")}
      );
    }
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const CollapsedBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  font-size: 10px;
  font-weight: 700;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4);
`;

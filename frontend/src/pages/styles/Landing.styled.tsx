import styled, { createGlobalStyle, keyframes } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Lexend", sans-serif;
  }
  
  body {
    overflow-x: hidden;
  }
`;

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  background-color: white;
  position: relative;
  overflow: hidden;
`;

export const BackgroundCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(54, 79, 171, 0.3) 0%,
    transparent 70%
  );
  filter: blur(60px);

  &:nth-child(1) {
    width: 500px;
    height: 500px;
    top: -200px;
    left: -200px;
    animation-delay: 0s;
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1300px;
  margin: 0 auto;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  animation: ${fadeInUp} 0.8s ease-out;
`;

export const Logo = styled.div`
  width: 200px;
  height: 200px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 30px;

  a {
    font-weight: 500;
    color: #686868;
    text-decoration: none;
    font-size: 16px;
    transition: color 0.3s;

    &:hover {
      color: #364fab;
    }
  }
`;

export const Hero = styled.section`
  text-align: center;
  margin-bottom: 60px;
`;

export const Title = styled.h1`
  font-size: 72px;
  font-weight: 800;
  color: black;
  margin-bottom: 24px;
  line-height: 1.1;
  animation: ${fadeInUp} 0.8s ease-out 0.2s backwards;

  span {
    background: linear-gradient(135deg, #364fab 0%, #5a7de8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

export const Subtitle = styled.p`
  font-size: 24px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 48px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: ${fadeInUp} 0.8s ease-out 0.4s backwards;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  animation: ${fadeInUp} 0.8s ease-out 0.6s backwards;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

export const Button = styled.button`
  padding: 18px 40px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;

  &.primary {
    background: linear-gradient(135deg, #364fab 0%, #5a7de8 100%);
    color: white;
    box-shadow: 0 10px 30px rgba(54, 79, 171, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 40px rgba(54, 79, 171, 0.6);
    }
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: black;
    backdrop-filter: blur(10px);
    border: 2px solid #ccc;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: #364fab;
    }
  }
`;

export const Features = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  margin-top: 80px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div<{ delay: number }>`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(70, 69, 69, 0.1);
  border-radius: 20px;
  padding: 40px;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out backwards;
  animation-delay: ${(props) => props.delay}s;

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(54, 79, 171, 0.5);
    box-shadow: 0 20px 40px rgba(54, 79, 171, 0.3);
  }
`;

export const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #364fab 0%, #5a7de8 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    color: white;
    width: 30px;
    height: 30px;
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 22px;
  color: black;
  margin-bottom: 12px;
  font-weight: 600;
`;

export const FeatureDescription = styled.p`
  font-size: 16px;
  color: #364fab;
  line-height: 1.6;
`;

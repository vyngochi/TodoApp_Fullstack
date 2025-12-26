import styled, { keyframes } from "styled-components";
import { Wrench, Sparkles, Clock, Bell } from "lucide-react";

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: #364fab;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
  font-family: "Lexend", sans-serif;
  overflow-y: hidden;
  height: calc(100vh - 100px);
`;

const BackgroundCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 70%
  );
  filter: blur(60px);
  animation: ${float} 6s ease-in-out infinite;

  &:nth-child(1) {
    width: 400px;
    height: 400px;
    top: -150px;
    left: -150px;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    width: 350px;
    height: 350px;
    bottom: -100px;
    right: -100px;
    animation-delay: 2s;
  }

  &:nth-child(3) {
    width: 300px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: 4s;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const MainIcon = styled.div`
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: ${pulse} 3s ease-in-out infinite;

  svg {
    width: 60px;
    height: 60px;
    color: white;
    animation: ${rotate} 8s linear infinite;
  }
`;

const FloatingIcon = styled.div<{ delay: number }>`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;

  svg {
    width: 30px;
    height: 30px;
    color: white;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
  animation: ${fadeInUp} 0.8s ease-out 0.2s backwards;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 32px;
  line-height: 1.6;
  animation: ${fadeInUp} 0.8s ease-out 0.4s backwards;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 24px;
  animation: ${fadeInUp} 0.8s ease-out 0.6s backwards;
`;

const ProgressFill = styled.div`
  width: 65%;
  height: 100%;
  background: linear-gradient(90deg, #364fab 0%, #5a7de8 50%, #364fab 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 2s linear infinite;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(54, 79, 171, 0.5);
`;

const ProgressText = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  font-weight: 600;
  animation: ${fadeInUp} 0.8s ease-out 0.7s backwards;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  animation: ${fadeInUp} 0.8s ease-out 0.8s backwards;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 16px;
  color: white;
  margin: 12px 0 8px;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
  margin: 0;
`;

const FeatureIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #364fab 0%, #5a7de8 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

const NotifyButton = styled.button`
  margin-top: 40px;
  padding: 16px 40px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 50px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out 1s backwards;
  display: inline-flex;
  align-items: center;
  gap: 10px;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function Settings() {
  const features = [
    {
      icon: <Wrench />,
      title: "Profile Settings",
      description: "Customize your account preferences",
    },
    {
      icon: <Sparkles />,
      title: "Themes",
      description: "Personalize your workspace",
    },
    {
      icon: <Clock />,
      title: "Notifications",
      description: "Manage your alerts",
    },
  ];

  return (
    <Container>
      <BackgroundCircle />
      <BackgroundCircle />
      <BackgroundCircle />

      <ContentWrapper>
        <IconContainer>
          <FloatingIcon delay={0}>
            <Wrench />
          </FloatingIcon>
          <MainIcon>
            <Wrench />
          </MainIcon>
          <FloatingIcon delay={1}>
            <Sparkles />
          </FloatingIcon>
        </IconContainer>

        <Title>Coming Soon</Title>
        <Subtitle>
          We're working hard to bring you an amazing settings experience. Stay
          tuned for exciting new features!
        </Subtitle>

        <ProgressBar>
          <ProgressFill />
        </ProgressBar>
        <ProgressText>Development Progress: 65%</ProgressText>

        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIconWrapper>{feature.icon}</FeatureIconWrapper>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeatureGrid>

        <NotifyButton>
          <Bell />
          Notify Me When Ready
        </NotifyButton>
      </ContentWrapper>
    </Container>
  );
}

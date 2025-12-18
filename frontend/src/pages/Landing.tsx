import { Sparkles, Zap, Target, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles/Landing.styled";

export default function TodoLandingPage() {
  const navigate = useNavigate();
  const features = [
    {
      icon: <Target />,
      title: "Smart Organization",
      description:
        "Manage tasks efficiently with an intelligent classification and prioritization system",
    },
    {
      icon: <Zap />,
      title: "Fast & Smooth",
      description:
        "Optimized user experience with high performance and an intuitive interface",
    },
    {
      icon: <Sparkles />,
      title: "Cross-Platform Sync",
      description:
        "Access anytime, anywhere with real-time data synchronization",
    },
  ];

  return (
    <>
      <S.GlobalStyle />
      <S.Container>
        <S.BackgroundCircle />

        <S.Content>
          <S.Header>
            <S.Logo>
              <img src="./../../public/logo.png" alt="" />
            </S.Logo>
            <S.Nav>
              <a href="#features">Features</a>
              <a href="#about">About Us</a>
              <a href="#contact">Contact</a>
            </S.Nav>
          </S.Header>

          <S.Hero>
            <S.Title>
              Manage tasks easily
              <br />
              <span>Smarter</span>
            </S.Title>
            <S.Subtitle>
              Enhance productivity with TodoApp - A modern, simple, and powerful
              task management application
            </S.Subtitle>
            <S.ButtonGroup>
              <S.Button className="primary" onClick={() => navigate("/auth")}>
                Start Now
                <ArrowRight size={20} />
              </S.Button>
              <S.Button className="secondary">Learn More</S.Button>
            </S.ButtonGroup>
          </S.Hero>

          <S.Features>
            {features.map((feature, index) => (
              <S.FeatureCard key={index} delay={0.8 + index * 0.2}>
                <S.IconWrapper>{feature.icon}</S.IconWrapper>
                <S.FeatureTitle>{feature.title}</S.FeatureTitle>
                <S.FeatureDescription>
                  {feature.description}
                </S.FeatureDescription>
              </S.FeatureCard>
            ))}
          </S.Features>
        </S.Content>
      </S.Container>
    </>
  );
}

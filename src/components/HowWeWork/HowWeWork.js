import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import HandshakeIcon from '@mui/icons-material/Handshake';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const Section = styled.section`
  padding: 80px 20px;
  background-color: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  color: #333;
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const Step = styled.div`
  text-align: center;
  padding: 20px;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background-color: #ff6b6b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
  svg {
    font-size: 40px;
  }
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
`;

const StepDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const HowWeWork = () => {
  const steps = [
    {
      icon: <SearchIcon />,
      title: "Поиск тура",
      description: "Вы оставляете заявку на подбор тура или связываетесь с нами любым удобным способом"
    },
    {
      icon: <HandshakeIcon />,
      title: "Обсуждение деталей",
      description: "Мы подбираем для вас оптимальные варианты и обсуждаем детали путешествия"
    },
    {
      icon: <FlightTakeoffIcon />,
      title: "Бронирование",
      description: "Бронируем для вас отель, билеты и оформляем все необходимые документы"
    },
    {
      icon: <EmojiEmotionsIcon />,
      title: "Отдых",
      description: "Вы наслаждаетесь отдыхом, а мы обеспечиваем поддержку 24/7"
    }
  ];

  return (
    <Section>
      <Container>
        <Title data-aos="fade-up">Как мы работаем</Title>
        <StepsContainer>
          {steps.map((step, index) => (
            <Step key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <IconWrapper>
                {step.icon}
              </IconWrapper>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Step>
          ))}
        </StepsContainer>
      </Container>
    </Section>
  );
};

export default HowWeWork; 
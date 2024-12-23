import styled from 'styled-components';
import HandshakeIcon from '@mui/icons-material/Handshake';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import WorkIcon from '@mui/icons-material/Work';

const PageContainer = styled.div`
  padding-top: 80px;
`;

const HeroSection = styled.section`
  height: 300px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Section = styled.section`
  padding: 80px 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 50px;
`;

const BenefitCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  svg {
    color: #ff6b6b;
    font-size: 40px;
    margin-bottom: 20px;
  }

  h3 {
    color: #333;
    margin-bottom: 15px;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

const PartnershipForm = styled.form`
  max-width: 600px;
  margin: 50px auto 0;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff5252;
  }
`;

const Partners = () => {
  const benefits = [
    {
      icon: <HandshakeIcon />,
      title: "Надежное партнерство",
      description: "Мы строим долгосрочные и взаимовыгодные отношения с нашими партнерами"
    },
    {
      icon: <MonetizationOnIcon />,
      title: "Выгодные условия",
      description: "Конкурентные комиссии и специальные условия для постоянных партнеров"
    },
    {
      icon: <SupportAgentIcon />,
      title: "Поддержка 24/7",
      description: "Персональный менеджер и круглосуточная поддержка по всем вопросам"
    },
    {
      icon: <WorkIcon />,
      title: "Простое сотрудничество",
      description: "Удобная система бронирования и оперативное решение всех вопросов"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Partnership form submitted');
  };

  return (
    <PageContainer>
      <HeroSection>
        <Title data-aos="fade-up">Партнерская программа</Title>
      </HeroSection>

      <Section>
        <Container>
          <Grid>
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                {benefit.icon}
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </BenefitCard>
            ))}
          </Grid>

          <PartnershipForm onSubmit={handleSubmit} data-aos="fade-up">
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Стать партнером</h2>
            <FormGroup>
              <Label>Название компании</Label>
              <Input type="text" required />
            </FormGroup>
            <FormGroup>
              <Label>Контактное лицо</Label>
              <Input type="text" required />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input type="email" required />
            </FormGroup>
            <FormGroup>
              <Label>Телефон</Label>
              <Input type="tel" required />
            </FormGroup>
            <FormGroup>
              <Label>Сообщение</Label>
              <TextArea required />
            </FormGroup>
            <Button type="submit">Отправить заявку</Button>
          </PartnershipForm>
        </Container>
      </Section>
    </PageContainer>
  );
};

export default Partners; 
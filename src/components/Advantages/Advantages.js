import styled from 'styled-components';
import CountUp from 'react-countup';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PublicIcon from '@mui/icons-material/Public';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';

const Section = styled.section`
  padding: 80px 20px;
  background-color: white;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
  text-align: center;
`;

const StatCard = styled.div`
  padding: 30px;
  background: #f8f9fa;
  border-radius: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  color: #ff6b6b;
  margin-bottom: 15px;
  
  svg {
    font-size: 40px;
  }
`;

const Number = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const Label = styled.div`
  color: #666;
  font-size: 1.1rem;
`;

const Advantages = () => {
  const stats = [
    {
      icon: <FavoriteIcon />,
      value: 1500,
      label: "Довольных клиентов",
      suffix: "+"
    },
    {
      icon: <PublicIcon />,
      value: 50,
      label: "Направлений",
      suffix: "+"
    },
    {
      icon: <GroupIcon />,
      value: 10,
      label: "Лет опыта",
      suffix: ""
    },
    {
      icon: <StarIcon />,
      value: 98,
      label: "Положительных отзывов",
      suffix: "%"
    }
  ];

  return (
    <Section>
      <Container>
        <Title data-aos="fade-up">Почему выбирают нас</Title>
        <Grid>
          {stats.map((stat, index) => (
            <StatCard key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
              <IconWrapper>{stat.icon}</IconWrapper>
              <Number>
                <CountUp 
                  end={stat.value} 
                  duration={2.5} 
                  suffix={stat.suffix}
                />
              </Number>
              <Label>{stat.label}</Label>
            </StatCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Advantages; 
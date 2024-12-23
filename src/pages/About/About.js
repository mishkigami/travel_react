import styled from 'styled-components';

const PageContainer = styled.div`
  padding-top: 80px; // для фиксированного header
`;

const HeroSection = styled.section`
  height: 400px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3');
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
  data-aos="fade-up"
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 40px;
`;

const InfoBlock = styled.div`
  text-align: center;
  padding: 20px;

  h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 15px;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

const TeamSection = styled(Section)`
  background-color: #f8f9fa;
`;

const TeamMember = styled.div`
  text-align: center;
  
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-bottom: 20px;
    object-fit: cover;
  }

  h3 {
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #666;
  }
`;

const About = () => {
  const team = [
    {
      name: "Екатерина Тропкина",
      position: "Основатель и CEO",
      image: "https://randomuser.me/api/portraits/women/76.jpg"
    },
    {
      name: "Александр Петров",
      position: "Руководитель отдела продаж",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Мария Иванова",
      position: "Старший менеджер",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ];

  return (
    <PageContainer>
      <HeroSection>
        <Title data-aos="fade-up">О нашей компании</Title>
      </HeroSection>

      <Section>
        <Container>
          <Grid>
            <InfoBlock data-aos="fade-up">
              <h3>Наша миссия</h3>
              <p>Мы стремимся сделать путешествия доступными и незабываемыми для каждого клиента, предоставляя высококачественный сервис и индивидуальный подход.</p>
            </InfoBlock>
            <InfoBlock data-aos="fade-up" data-aos-delay="100">
              <h3>Наш опыт</h3>
              <p>Более 10 лет успешной работы в сфере туризма. Сотни довольных клиентов и тысячи организованных путешествий по всему миру.</p>
            </InfoBlock>
            <InfoBlock data-aos="fade-up" data-aos-delay="200">
              <h3>Наши ценности</h3>
              <p>Качество, надежность и индивидуальный подход к каждому клиенту - основные принципы нашей работы.</p>
            </InfoBlock>
          </Grid>
        </Container>
      </Section>

      <TeamSection>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '50px' }} data-aos="fade-up">Наша команда</h2>
          <Grid>
            {team.map((member, index) => (
              <TeamMember key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.position}</p>
              </TeamMember>
            ))}
          </Grid>
        </Container>
      </TeamSection>
    </PageContainer>
  );
};

export default About;
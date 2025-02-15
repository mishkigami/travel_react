import { useRef } from 'react';
import styled from 'styled-components';
import HowWeWork from '../../components/HowWeWork/HowWeWork';
import TourForm from '../../components/TourForm/TourForm';
import PopularDestinations from '../../components/PopularDestinations/PopularDestinations';
import Advantages from '../../components/Advantages/Advantages';
import Reviews from '../../components/Reviews/Reviews';
// import Partners from '../../components/Partners/Partners';

const HeroSection = styled.section`
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff5252;
  }
`;

const Home = () => {
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <HeroSection>
        <HeroContent>
          <Title>Откройте мир путешествий вместе с нами</Title>
          <Subtitle>Индивидуальный подход к организации вашего отдыха</Subtitle>
          <Button onClick={scrollToForm}>Подобрать тур</Button>
        </HeroContent>
      </HeroSection>
      <HowWeWork />
      <PopularDestinations />
      <Advantages />
      <Reviews />
      {/* <Partners /> */}
      <div ref={formRef}>
        <TourForm />
      </div>
    </main>
  );
};

export default Home; 
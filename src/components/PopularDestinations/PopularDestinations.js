import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDestinations } from '../../services/api';
import { Link } from 'react-router-dom';

const Section = styled.section`
  padding: 80px 20px;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 32px;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  width: 375px;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const DestinationTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
`;

const Price = styled.p`
  font-size: 1.2rem;
  color: #ff6b6b;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  width: fit-content;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: center;

  &:hover {
    background-color: #ff5252;
  }
`;

const MoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const MoreButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.1rem;
  transition: background 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background: #ff5252;
  }
`;

const PopularDestinations = () => {
  const [destinations, setDestinations] = useState([]);

  const getMostPopularDestinations = async () => {
    const { data } = await getDestinations(3);
    console.log(data);
    setDestinations(data)
  }

  useEffect(() => {
    getMostPopularDestinations();
  }, [])


  if(destinations.length === 0) return null;

  return (
    <Section id="destinations">
      <Container>
        <Title data-aos="fade-up">Популярные направления</Title>
        <Grid>
          {destinations.map((destination, index) => (
            <Card key={destination.id} data-aos="fade-up" data-aos-delay={index * 100}>
              <ImageContainer>
                <Image src={destination.image_url} alt={destination.title} />
              </ImageContainer>
              <CardContent>
                <DestinationTitle>{destination.title}</DestinationTitle>
                <Price>{destination.price}</Price>
                <Description>{destination.description}</Description>
                <Button>Подробнее</Button>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <MoreButtonWrapper>
          <MoreButton as={Link} to="/destinations">
            Еще направления
          </MoreButton>
        </MoreButtonWrapper>
      </Container>
    </Section>
  );
};

export default PopularDestinations; 
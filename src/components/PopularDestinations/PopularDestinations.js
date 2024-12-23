import styled from 'styled-components';

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

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

const PopularDestinations = () => {
  const destinations = [
    {
      id: 1,
      title: "Мальдивы",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3",
      price: "от 180 000 ₽",
      description: "Райский отдых на белоснежных пляжах с кристально чистой водой"
    },
    {
      id: 2,
      title: "Турция",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3",
      price: "от 75 000 ₽",
      description: "Всё включено, отличные отели и богатая культурная программа"
    },
    {
      id: 3,
      title: "Греция",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3",
      price: "от 95 000 ₽",
      description: "Древняя история, прекрасные острова и средиземноморская кухня"
    }
  ];

  return (
    <Section>
      <Container>
        <Title data-aos="fade-up">Популярные направления</Title>
        <Grid>
          {destinations.map((destination, index) => (
            <Card key={destination.id} data-aos="fade-up" data-aos-delay={index * 100}>
              <ImageContainer>
                <Image src={destination.image} alt={destination.title} />
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
      </Container>
    </Section>
  );
};

export default PopularDestinations; 
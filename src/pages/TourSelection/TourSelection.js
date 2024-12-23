import { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding-top: 80px;
`;

const HeroSection = styled.section`
  height: 300px;
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
  grid-template-columns: 300px 1fr;
  gap: 40px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const FilterPanel = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  height: fit-content;
`;

const FilterGroup = styled.div`
  margin-bottom: 20px;
  
  h3 {
    margin-bottom: 15px;
    color: #333;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  
  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  
  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  
  input {
    margin-right: 10px;
  }
  
  label {
    color: #666;
  }
`;

const ToursGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
`;

const TourCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const TourImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const TourContent = styled.div`
  padding: 20px;
  
  h3 {
    margin-bottom: 10px;
    color: #333;
  }
  
  .price {
    color: #ff6b6b;
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  
  .details {
    color: #666;
    margin-bottom: 15px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
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

const TourSelection = () => {
  const [filters, setFilters] = useState({
    destination: '',
    budget: '',
    duration: '',
    date: '',
    type: []
  });

  const tours = [
    {
      id: 1,
      title: "Незабываемая Греция",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3",
      price: "от 95 000 ₽",
      duration: "7 дней",
      type: "Пляжный отдых"
    },
    {
      id: 2,
      title: "Магия Турции",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3",
      price: "от 75 000 ₽",
      duration: "10 дней",
      type: "Всё включено"
    },
    {
      id: 3,
      title: "Райские Мальдивы",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3",
      price: "от 180 000 ₽",
      duration: "12 дней",
      type: "Премиум отдых"
    }
    // Добавьте больше туров по желанию
  ];

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFilters(prev => ({
        ...prev,
        type: checked 
          ? [...prev.type, value]
          : prev.type.filter(t => t !== value)
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <PageContainer>
      <HeroSection>
        <Title data-aos="fade-up">Подбор тура</Title>
      </HeroSection>

      <Section>
        <Container>
          <Grid>
            <FilterPanel data-aos="fade-right">
              <FilterGroup>
                <h3>Направление</h3>
                <Select name="destination" value={filters.destination} onChange={handleFilterChange}>
                  <option value="">Все направления</option>
                  <option value="europe">Европа</option>
                  <option value="asia">Азия</option>
                  <option value="america">Америка</option>
                </Select>
              </FilterGroup>

              <FilterGroup>
                <h3>Бюджет</h3>
                <Select name="budget" value={filters.budget} onChange={handleFilterChange}>
                  <option value="">Любой бюджет</option>
                  <option value="economy">До 100 000 ₽</option>
                  <option value="standard">100 000 - 200 000 ₽</option>
                  <option value="luxury">Более 200 000 ₽</option>
                </Select>
              </FilterGroup>

              <FilterGroup>
                <h3>Длительность</h3>
                <Select name="duration" value={filters.duration} onChange={handleFilterChange}>
                  <option value="">Любая длительность</option>
                  <option value="short">До 7 дней</option>
                  <option value="medium">7-14 дней</option>
                  <option value="long">Более 14 дней</option>
                </Select>
              </FilterGroup>

              <FilterGroup>
                <h3>Дата</h3>
                <Input 
                  type="date" 
                  name="date" 
                  value={filters.date} 
                  onChange={handleFilterChange}
                />
              </FilterGroup>

              <FilterGroup>
                <h3>Тип отдыха</h3>
                <Checkbox>
                  <input 
                    type="checkbox" 
                    value="beach" 
                    checked={filters.type.includes('beach')}
                    onChange={handleFilterChange}
                  />
                  <label>Пляжный отдых</label>
                </Checkbox>
                <Checkbox>
                  <input 
                    type="checkbox" 
                    value="excursion" 
                    checked={filters.type.includes('excursion')}
                    onChange={handleFilterChange}
                  />
                  <label>Экскурсионный</label>
                </Checkbox>
                <Checkbox>
                  <input 
                    type="checkbox" 
                    value="adventure" 
                    checked={filters.type.includes('adventure')}
                    onChange={handleFilterChange}
                  />
                  <label>Приключенческий</label>
                </Checkbox>
              </FilterGroup>
            </FilterPanel>

            <ToursGrid>
              {tours.map((tour) => (
                <TourCard key={tour.id} data-aos="fade-up">
                  <TourImage src={tour.image} alt={tour.title} />
                  <TourContent>
                    <h3>{tour.title}</h3>
                    <p className="price">{tour.price}</p>
                    <p className="details">
                      Длительность: {tour.duration}<br />
                      Тип: {tour.type}
                    </p>
                    <Button>Подробнее</Button>
                  </TourContent>
                </TourCard>
              ))}
            </ToursGrid>
          </Grid>
        </Container>
      </Section>
    </PageContainer>
  );
};

export default TourSelection;
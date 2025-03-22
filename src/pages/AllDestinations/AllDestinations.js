import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getDestinations } from '../../services/api';

const ITEMS_PER_PAGE = 12;

const AllDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setIsLoading(true);
        const response = await getDestinations(ITEMS_PER_PAGE, 0);
        // Проверяем структуру ответа и адаптируемся к ней
        const destinationsData = response.destinations || response.data || [];
        setDestinations(destinationsData);
        
        // Проверяем, есть ли еще данные
        setHasMore(destinationsData.length === ITEMS_PER_PAGE);
        setError(null);
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError('Ошибка при загрузке направлений');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const loadMore = async () => {
    if (isLoadingMore) return;

    try {
      setIsLoadingMore(true);
      const newOffset = offset + ITEMS_PER_PAGE;
      const response = await getDestinations(ITEMS_PER_PAGE, newOffset);
      
      // Проверяем структуру ответа
      const newDestinations = response.destinations || response.data || [];
      setDestinations(prev => [...prev, ...newDestinations]);
      setOffset(newOffset);
      
      // Если получили меньше элементов, чем запросили, значит больше нет данных
      setHasMore(newDestinations.length === ITEMS_PER_PAGE);
    } catch (err) {
      console.error('Error loading more destinations:', err);
      setError('Ошибка при загрузке дополнительных направлений');
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (isLoading) {
    return <LoadingWrapper>Загрузка...</LoadingWrapper>;
  }

  if (error) {
    return <ErrorWrapper>{error}</ErrorWrapper>;
  }

  return (
    <PageContainer>
      <HeroSection>
        <Title>Все направления</Title>
        <Subtitle>Исследуйте мир с нами</Subtitle>
      </HeroSection>

      <Section>
        <Container>
          {destinations.length > 0 ? (
            <>
              <DestinationsGrid>
                {destinations.map((destination) => (
                  <DestinationCard key={destination.id} data-aos="fade-up">
                    <DestinationImage 
                      src={destination.image_url || destination.image || 'https://via.placeholder.com/300x200?text=Нет+изображения'} 
                      alt={destination.title}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Ошибка+загрузки';
                      }}
                    />
                    <DestinationContent>
                      <h3>{destination.title}</h3>
                      <p>{destination.description || 'Описание отсутствует'}</p>
                      <PriceTag>
                        {destination.min_price 
                          ? `от ${Number(destination.min_price).toLocaleString('ru-RU')} ₽` 
                          : 'Цена по запросу'}
                      </PriceTag>
                      <Button as={Link} to={`/tour-selection?destination=${destination.title}`}>
                        Подробнее
                      </Button>
                    </DestinationContent>
                  </DestinationCard>
                ))}
              </DestinationsGrid>
              
              {hasMore && (
                <LoadMoreWrapper>
                  <LoadMoreButton onClick={loadMore} disabled={isLoadingMore}>
                    {isLoadingMore ? 'Загрузка...' : 'Показать еще'}
                  </LoadMoreButton>
                </LoadMoreWrapper>
              )}
            </>
          ) : (
            <NoDestinations>Направления не найдены</NoDestinations>
          )}
        </Container>
      </Section>
    </PageContainer>
  );
};

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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  max-width: 800px;
`;

const Section = styled.section`
  padding: 80px 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const DestinationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
`;

const DestinationCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const DestinationImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const DestinationContent = styled.div`
  padding: 20px;
  
  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #333;
  }
  
  p {
    color: #666;
    margin-bottom: 15px;
  }
`;

const PriceTag = styled.div`
  font-weight: bold;
  color: #ff6b6b;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    background: #ff5252;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: #333;
`;

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: #ff5252;
`;

const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const LoadMoreButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.1rem;
  transition: background 0.3s ease;
  
  &:hover {
    background: #ff5252;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const NoDestinations = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.5rem;
  color: #666;
`;

export default AllDestinations; 
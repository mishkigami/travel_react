import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

const ReviewCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin: 20px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const QuoteIcon = styled(FormatQuoteIcon)`
  color: #ff6b6b;
  font-size: 40px !important;
  margin-bottom: 20px;
`;

const ReviewText = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
`;

const ReviewAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const AuthorImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  h4 {
    color: #333;
    margin-bottom: 5px;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const StyledSwiper = styled(Swiper)`
  padding: 20px 50px !important;
  
  .swiper-button-prev,
  .swiper-button-next {
    color: #ff6b6b;
    
    &::after {
      font-size: 24px;
    }
  }

  .swiper-button-prev {
    left: 0;
  }

  .swiper-button-next {
    right: 0;
  }

  .swiper-pagination-bullet {
    background: #ff6b6b;
  }
`;

const Reviews = () => {
  const reviews = [
    {
      text: "Прекрасная организация тура! Все было продумано до мелочей. Отдельное спасибо менеджеру за внимательность и индивидуальный подход.",
      author: "Анна Петрова",
      location: "Тур в Грецию",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      text: "Второй раз обращаемся в эту компанию и снова все на высшем уровне. Рекомендую всем, кто хочет качественный и беззаботный отдых.",
      author: "Михаил Иванов",
      location: "Тур в Турцию",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      text: "Отличный сервис, адекватные цены и профессиональный подход. Спасибо за незабываемый отпуск!",
      author: "Елена Сидорова",
      location: "Тур на Мальдивы",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      text: "Замечательное путешест��ие! Все трансферы вовремя, отель превзошел ожидания. Обязательно обратимся еще.",
      author: "Дмитрий Козлов",
      location: "Тур в Италию",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      text: "Спасибо за отлично организованный отдых! Все четко, понятно и без сюрпризов. Очень довольны!",
      author: "Ольга Морозова",
      location: "Тур в Испанию",
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      text: "Профессиональный подход и внимание к деталям. Отдых получился именно таким, как мы мечтали.",
      author: "Сергей Волков",
      location: "Тур в ОАЭ",
      image: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];

  return (
    <Section>
      <Container>
        <Title>Отзывы наших клиентов</Title>
        <StyledSwiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <ReviewCard>
                <QuoteIcon />
                <ReviewText>{review.text}</ReviewText>
                <ReviewAuthor>
                  <AuthorImage src={review.image} alt={review.author} />
                  <AuthorInfo>
                    <h4>{review.author}</h4>
                    <p>{review.location}</p>
                  </AuthorInfo>
                </ReviewAuthor>
              </ReviewCard>
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </Container>
    </Section>
  );
};

export default Reviews; 
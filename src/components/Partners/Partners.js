import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Section = styled.section`
  padding: 60px 20px;
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

const PartnerLogo = styled.img`
  max-width: 150px;
  height: auto;
  filter: grayscale(100%);
  opacity: 0.6;
  transition: all 0.3s ease;
  margin: 0 auto;

  &:hover {
    filter: grayscale(0%);
    opacity: 1;
  }
`;

const StyledSwiper = styled(Swiper)`
  padding: 20px 0;
`;

const Partners = () => {
  const partners = [
    {
      name: "Turkish Airlines",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Turkish_Airlines_logo_%282010-present%29.svg"
    },
    {
      name: "Emirates",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg"
    },
    {
      name: "Hilton",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Hilton_Worldwide_Logo.svg"
    },
    {
      name: "Marriott",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Marriott_Logo.svg"
    },
    {
      name: "Hyatt",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Hyatt_Logo.svg"
    },
    {
      name: "Qatar Airways",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Qatar_Airways_Logo.svg"
    }
  ];

  return (
    <Section>
      <Container>
        <Title>Наши партнеры</Title>
        <StyledSwiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={index}>
              <PartnerLogo 
                src={partner.logo} 
                alt={partner.name}
                title={partner.name}
              />
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </Container>
    </Section>
  );
};

export default Partners; 
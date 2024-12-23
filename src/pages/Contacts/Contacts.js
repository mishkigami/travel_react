import styled from 'styled-components';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const PageContainer = styled.div`
  padding-top: 80px;
`;

const HeroSection = styled.section`
  height: 300px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3');
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

const ContactInfo = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #333;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  svg {
    color: #ff6b6b;
    font-size: 24px;
    margin-right: 15px;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
    
    a {
      color: inherit;
      text-decoration: none;
      
      &:hover {
        color: #ff6b6b;
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  
  a {
    color: #666;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ff6b6b;
    }
    
    svg {
      font-size: 30px;
    }
  }
`;

const ContactForm = styled.form`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);

  h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #333;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
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
  padding: 12px 30px;
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

const MapSection = styled.section`
  padding: 0 20px 80px;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

const Contacts = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  // Координаты вашего офиса (замените на свои)
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 15,
  };

  return (
    <PageContainer>
      <HeroSection>
        <Title data-aos="fade-up">Контакты</Title>
      </HeroSection>

      <Section>
        <Container>
          <Grid>
            <ContactInfo data-aos="fade-right">
              <h2>Свяжитесь с нами</h2>
              <ContactItem>
                <PhoneIcon />
                <p><a href="tel:+79001234567">+7 (900) 123-45-67</a></p>
              </ContactItem>
              <ContactItem>
                <EmailIcon />
                <p><a href="mailto:info@tropkina.tour">info@tropkina.tour</a></p>
              </ContactItem>
              <ContactItem>
                <LocationOnIcon />
                <p>г. Москва, ул. Примерная, д. 1</p>
              </ContactItem>
              <SocialLinks>
                <a href="https://t.me/youraccount" target="_blank" rel="noopener noreferrer">
                  <TelegramIcon />
                </a>
                <a href="https://wa.me/yourphone" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                </a>
                <a href="https://instagram.com/youraccount" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon />
                </a>
              </SocialLinks>
            </ContactInfo>

            <ContactForm onSubmit={handleSubmit} data-aos="fade-left">
              <h2>Напишите нам</h2>
              <FormGroup>
                <Input type="text" placeholder="Ваше имя" required />
              </FormGroup>
              <FormGroup>
                <Input type="email" placeholder="Email" required />
              </FormGroup>
              <FormGroup>
                <Input type="tel" placeholder="Телефон" required />
              </FormGroup>
              <FormGroup>
                <TextArea placeholder="Ваше сообщение" required />
              </FormGroup>
              <Button type="submit">Отправить</Button>
            </ContactForm>
          </Grid>
        </Container>
      </Section>

      <MapSection>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }} data-aos="fade-up">
            Как нас найти
          </h2>
          <MapContainer data-aos="fade-up">
            <YMaps>
              <Map
                defaultState={defaultState}
                width="100%"
                height="100%"
              >
                <Placemark geometry={defaultState.center} />
              </Map>
            </YMaps>
          </MapContainer>
        </Container>
      </MapSection>
    </PageContainer>
  );
};

export default Contacts; 
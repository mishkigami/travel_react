import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 60px 20px 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #ff6b6b;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  svg {
    color: #ff6b6b;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;

  a {
    color: white;
    transition: color 0.3s ease;

    &:hover {
      color: #ff6b6b;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #ff6b6b;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #888;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>О компании</h3>
          <p>Уникальные путешествия - ваш надежный помощник в организации незабываемых путешествий. Мы создаем уникальные туры с учетом ваших пожеланий.</p>
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
        </FooterSection>

        <FooterSection>
          <h3>Контакты</h3>
          <ContactInfo>
            <ContactItem>
              <PhoneIcon />
              <a href="tel:+79001234567">+7 (900) 123-45-67</a>
            </ContactItem>
            <ContactItem>
              <EmailIcon />
              <a href="mailto:info@tropkina.tour">info@tropkina.tour</a>
            </ContactItem>
            <ContactItem>
              <LocationOnIcon />
              <span>г. Москва, ул. Примерная, д. 1</span>
            </ContactItem>
          </ContactInfo>
        </FooterSection>

        <FooterSection>
          <h3>Навигация</h3>
          <NavLinks>
            <Link to="/about">О нас</Link>
            <Link to="/tour-selection">Подбор тура</Link>

            <Link to="/contacts">Контакты</Link>
          </NavLinks>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {new Date().getFullYear()} Уникальные путешествия. Все права защищены.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 
import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const HeaderContainer = styled.header`
  padding: 1rem;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 1001;
  text-decoration: none;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    gap: 10px;
  }
  
  @media (max-width: 360px) {
    gap: 8px;
  }
`;

const LogoImage = styled.img`
  height: 70px;
  width: auto;
  object-fit: contain;
  
  @media (max-width: 768px) {
    height: 60px;
  }
  
  @media (max-width: 480px) {
    height: 55px;
  }
  
  @media (max-width: 360px) {
    height: 50px;
  }
`;

const LogoText = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
  
  @media (max-width: 360px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNavLinks = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    padding: 80px 2rem 2rem;
    transform: translateX(${props => props.isOpen ? '0' : '100%'});
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
    
    a {
      font-size: 1.2rem;
      padding: 1rem 0;
      border-bottom: 1px solid #eee;
      
      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: block;
  }
  
  svg {
    font-size: 2rem;
    color: #333;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Nav>
        <LogoContainer to="/" onClick={closeMenu}>
          <LogoImage src="/logo.jpg" alt="Уникальные путешествия" />
          <LogoText>Уникальные путешествия</LogoText>
        </LogoContainer>
        
        <NavLinks>
          <Link to="/about">О нас</Link>
          <Link to="/tour-selection">Подбор тура</Link>


        </NavLinks>
        
        <MenuButton onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </MenuButton>
        
        <MobileNavLinks isOpen={isMenuOpen}>
          <Link to="/about" onClick={closeMenu}>О нас</Link>
          <Link to="/tour-selection" onClick={closeMenu}>Подбор тура</Link>


        </MobileNavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 
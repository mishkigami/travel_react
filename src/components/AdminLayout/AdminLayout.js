import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children, backLink, title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <AdminNavBar>
        <NavContainer>
          <NavSection>
            {backLink && (
              <BackLink onClick={() => navigate(backLink)}>
                <ArrowIcon>←</ArrowIcon>
                {title || 'Назад'}
              </BackLink>
            )}
          </NavSection>
          
          <NavSection>
            <NavLink 
              onClick={() => navigate('/admin/tour-offers')}
              $active={location.pathname.includes('/admin/tour-offers')}
            >
              Туры
            </NavLink>
            <NavLink 
              onClick={() => navigate('/admin/bookings')}
              $active={location.pathname.includes('/admin/bookings')}
            >
              Бронирования
            </NavLink>
            <NavLink 
              onClick={() => navigate('/admin/company')}
              $active={location.pathname.includes('/admin/company')}
            >
              Компания
            </NavLink>
          </NavSection>
        </NavContainer>
      </AdminNavBar>
      
      <PageWrapper>
        {children}
      </PageWrapper>
    </>
  );
};

const AdminNavBar = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px;
  display: flex;
  align-items: center;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.$active ? `
    background: #ff6b6b;
    color: white;
  ` : `
    color: #666;
    
    &:hover {
      background: #f8f9fa;
      color: #333;
    }
  `}
`;

const BackLink = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 0;
  
  &:hover {
    color: #333;
  }
`;

const ArrowIcon = styled.span`
  margin-right: 8px;
  font-size: 20px;
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 80px 0 20px;
`;

export default AdminLayout; 
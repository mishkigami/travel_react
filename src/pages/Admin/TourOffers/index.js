import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTourOffers, deleteTourOffer } from '../../../services/api';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';

const TourOffers = () => {
    const [tours, setTours] = useState([]);
    const [meta, setMeta] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [failedImages, setFailedImages] = useState(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [tourToDelete, setTourToDelete] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = Cookies.get('token');
      
      if (!token) {
        navigate('/login');
        return;
      }
  
      const fetchTours = async () => {
        try {
          const response = await getTourOffers(token, currentPage);
          const parsedTours = typeof response.tour_offers === 'string' 
            ? JSON.parse(response.tour_offers)
            : response.tour_offers;
          
          setTours(parsedTours);
          setMeta(response.meta);
        } catch (err) {
          setError('Ошибка при загрузке туров');
          if (err.message.includes('401')) {
            Cookies.remove('token');
            navigate('/login');
          }
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchTours();
    }, [currentPage, navigate]);
  
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    };
  
    const handleImageError = (tourId) => {
      setFailedImages(prev => new Set([...prev, tourId]));
    };
  
    const handleDelete = async (tourId) => {
      try {
        const token = Cookies.get('token');
        await deleteTourOffer(token, tourId);
        const response = await getTourOffers(token, currentPage);
        const parsedTours = typeof response.tour_offers === 'string' 
          ? JSON.parse(response.tour_offers)
          : response.tour_offers;
        setTours(parsedTours);
        setMeta(response.meta);
        setShowDeleteModal(false);
        setTourToDelete(null);
      } catch (err) {
        setError('Ошибка при удалении тура');
      }
    };
  
    const handleDeleteClick = (e, tourId) => {
      e.stopPropagation();
      setTourToDelete(tourId);
      setShowDeleteModal(true);
    };
  
    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;
  
    return (
      <AdminLayout>
        <Container>
          <HeaderSection>
            <Title>Доступные туры</Title>
            <CreateButton onClick={() => navigate('/admin/tour-offers/new')}>
              Создать тур
            </CreateButton>
          </HeaderSection>
          {tours && tours.length > 0 ? (
            <>
              <TableWrapper>
                <Table>
                  <thead>
                    <tr>
                      <Th>Изображение</Th>
                      <Th>ID</Th>
                      <Th>Название</Th>
                      <Th>Отель</Th>
                      <Th>Цена (₽)</Th>
                      <Th>Описание</Th>
                      <Th>Дата начала</Th>
                      <Th>Дата окончания</Th>
                      <Th>Действия</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {tours.map((tour) => (
                      <Tr key={tour.id} onClick={() => navigate(`/admin/tour-offers/${tour.id}`)}>
                        <Td>
                          <ImageWrapper>
                            {tour.image_url && !failedImages.has(tour.id) ? (
                              <TourImage 
                                src={tour.image_url} 
                                alt={tour.title}
                                onError={() => handleImageError(tour.id)}
                              />
                            ) : (
                              <NoImage>Нет фото</NoImage>
                            )}
                          </ImageWrapper>
                        </Td>
                        <Td>{tour.id}</Td>
                        <Td>{tour.title}</Td>
                        <Td>{tour.hotel}</Td>
                        <Td>{Number(tour.price).toLocaleString('ru-RU')}</Td>
                        <Td>{tour.description}</Td>
                        <Td>{new Date(tour.start_date).toLocaleDateString('ru-RU')}</Td>
                        <Td>{new Date(tour.end_date).toLocaleDateString('ru-RU')}</Td>
                        <Td>
                          <DeleteButton onClick={(e) => handleDeleteClick(e, tour.id)}>
                            Удалить
                          </DeleteButton>
                        </Td>
                      </Tr>
                    ))}
                  </tbody>
                </Table>
              </TableWrapper>
              {meta && (
                <PaginationWrapper>
                  <PaginationInfo>
                    Страница {meta.current_page} из {meta.total_pages} (Всего туров: {meta.total_count})
                  </PaginationInfo>
                  <PaginationControls>
                    <PaginationButton 
                      onClick={() => handlePageChange(meta.current_page - 1)}
                      disabled={meta.current_page === 1}
                    >
                      Назад
                    </PaginationButton>
                    {[...Array(meta.total_pages)].map((_, index) => (
                      <PageNumber
                        key={index + 1}
                        $active={meta.current_page === index + 1}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </PageNumber>
                    ))}
                    <PaginationButton 
                      onClick={() => handlePageChange(meta.current_page + 1)}
                      disabled={meta.current_page === meta.total_pages}
                    >
                      Вперед
                    </PaginationButton>
                  </PaginationControls>
                </PaginationWrapper>
              )}
            </>
          ) : (
            <NoTours>Нет доступных туров</NoTours>
          )}

          {showDeleteModal && (
            <Modal>
              <ModalContent>
                <h3>Подтверждение удаления</h3>
                <p>Вы уверены, что хотите удалить этот тур?</p>
                <ModalButtons>
                  <CancelButton onClick={() => setShowDeleteModal(false)}>
                    Отмена
                  </CancelButton>
                  <ConfirmButton onClick={() => handleDelete(tourToDelete)}>
                    Удалить
                  </ConfirmButton>
                </ModalButtons>
              </ModalContent>
            </Modal>
          )}
        </Container>
      </AdminLayout>
    );
  };
  
  const Container = styled.div`
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
  `;
  
  const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  `;
  
  const TableWrapper = styled.div`
    overflow-x: auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin-bottom: 20px;
  `;
  
  const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: white;
  `;
  
  const Th = styled.th`
    background-color: #f4f4f4;
    color: #333;
    padding: 12px;
    text-align: left;
    font-weight: 600;
    border-bottom: 2px solid #ddd;
    white-space: nowrap;
  `;
  
  const Td = styled.td`
    padding: 12px;
    border-bottom: 1px solid #ddd;
    color: #666;
    vertical-align: middle;
  `;
  
  const Tr = styled.tr`
    cursor: pointer;
    transition: background-color 0.2s;
  
    &:hover {
      background-color: #f8f8f8;
    }
  `;
  
  const NoTours = styled.div`
    text-align: center;
    padding: 20px;
    color: #666;
    background-color: #f8f8f8;
    border-radius: 8px;
  `;
  
  const PaginationWrapper = styled.div`
    margin-top: 20px;
    padding: 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  `;
  
  const PaginationInfo = styled.div`
    text-align: center;
    margin-bottom: 15px;
    color: #666;
  `;
  
  const PaginationControls = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  `;
  
  const PaginationButton = styled.button`
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: ${props => props.disabled ? '#f4f4f4' : '#007bff'};
    color: ${props => props.disabled ? '#666' : 'white'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: background-color 0.2s;
  
    &:hover:not(:disabled) {
      background-color: #0056b3;
    }
  `;
  
  const PageNumber = styled.button`
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    background-color: ${props => props.$active ? '#007bff' : '#f4f4f4'};
    color: ${props => props.$active ? 'white' : '#666'};
    cursor: pointer;
    transition: all 0.2s;
  
    &:hover {
      background-color: ${props => props.$active ? '#0056b3' : '#e4e4e4'};
    }
  `;
  
  const ImageWrapper = styled.div`
    width: 100px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f4f4f4;
    border-radius: 4px;
    overflow: hidden;
  `;
  
  const TourImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.2s;
  
    &:hover {
      transform: scale(1.1);
    }
  `;
  
  const NoImage = styled.div`
    color: #999;
    font-size: 12px;
    text-align: center;
  `;
  
  const DeleteButton = styled.button`
    background-color: #dc3545;
    color: white;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  
    &:hover {
      background-color: #c82333;
    }
  `;
  
  const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `;
  
  const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
  
    h3 {
      margin-top: 0;
      color: #333;
    }
  
    p {
      color: #666;
    }
  `;
  
  const ModalButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  `;
  
  const CancelButton = styled.button`
    background-color: #6c757d;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  
    &:hover {
      background-color: #5a6268;
    }
  `;
  
  const ConfirmButton = styled(DeleteButton)`
    padding: 8px 16px;
  `;
  
  const HeaderSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `;
  
  const CreateButton = styled.button`
    background-color: #28a745;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-weight: 500;
  
    &:hover {
      background-color: #218838;
    }
  `;
  
  export default TourOffers; 
// ... остальной код из TourOffers.js ...
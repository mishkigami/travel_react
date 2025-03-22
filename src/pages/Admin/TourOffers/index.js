import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { getTourOffers, deleteTourOffer } from '../../../services/api';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';

const ITEMS_PER_PAGE = 10;

const TourOffers = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tourToDelete, setTourToDelete] = useState(null);
  const navigate = useNavigate();

  const fetchTours = async () => {
    const token = Cookies.get('token');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await getTourOffers(token, ITEMS_PER_PAGE, offset);
      console.log(response);
      
      setTours(response.data);
      
      // Обновляем общее количество элементов, если доступно
      if (response.meta && response.meta.total_count) {
        setTotalItems(response.meta.total_count);
      }
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

  useEffect(() => {
    fetchTours();
  }, [offset, navigate]);

  const handleNextPage = () => {
    if (offset + ITEMS_PER_PAGE < totalItems) {
      setOffset(offset + ITEMS_PER_PAGE);
    }
  };

  const handlePrevPage = () => {
    if (offset - ITEMS_PER_PAGE >= 0) {
      setOffset(offset - ITEMS_PER_PAGE);
    }
  };

  const handleDeleteClick = (e, tourId) => {
    e.stopPropagation();
    setTourToDelete(tourId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const token = Cookies.get('token');
      await deleteTourOffer(token, tourToDelete);
      // Обновляем список после удаления
      fetchTours();
      setShowDeleteModal(false);
      setTourToDelete(null);
    } catch (err) {
      setError('Ошибка при удалении тура');
    }
  };

  // Вычисляем текущую страницу и общее количество страниц
  const currentPage = Math.floor(offset / ITEMS_PER_PAGE) + 1;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  if (isLoading && tours.length === 0) {
    return (
      <AdminLayout>
        <Container>
          <LoadingMessage>Загрузка...</LoadingMessage>
        </Container>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Container>
        <HeaderSection>
          <Title>Доступные туры</Title>
          <CreateButton onClick={() => navigate('/admin/tour-offers/new')}>
            Создать тур
          </CreateButton>
        </HeaderSection>

        {error && <ErrorMessage>{error}</ErrorMessage>}

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
                        {tour.image_url ? (
                          <TourImage src={tour.image_url} alt={tour.title} />
                        ) : (
                          <NoImage>Нет изображения</NoImage>
                        )}
                      </Td>
                      <Td>{tour.id}</Td>
                      <Td>{tour.title}</Td>
                      <Td>{tour.hotel}</Td>
                      <Td>{Number(tour.price).toLocaleString('ru-RU')}</Td>
                      <Td className="description">{tour.description}</Td>
                      <Td>{new Date(tour.start_date).toLocaleDateString('ru-RU')}</Td>
                      <Td>{new Date(tour.end_date).toLocaleDateString('ru-RU')}</Td>
                      <Td onClick={(e) => e.stopPropagation()}>
                        <DeleteButton onClick={(e) => handleDeleteClick(e, tour.id)}>
                          Удалить
                        </DeleteButton>
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>

            {totalPages > 1 && (
              <Pagination>
                <PaginationButton 
                  onClick={handlePrevPage} 
                  disabled={offset === 0}
                >
                  Предыдущая
                </PaginationButton>
                <PageInfo>
                  Страница {currentPage} из {totalPages}
                </PageInfo>
                <PaginationButton 
                  onClick={handleNextPage} 
                  disabled={offset + ITEMS_PER_PAGE >= totalItems}
                >
                  Следующая
                </PaginationButton>
              </Pagination>
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
                <ConfirmButton onClick={handleDelete}>
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
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
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

const TableWrapper = styled.div`
  overflow-x: auto;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const Th = styled.th`
  padding: 12px 15px;
  text-align: left;
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  color: #495057;
  font-weight: 600;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #dee2e6;
  color: #212529;
  
  &.description {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Tr = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const TourImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const NoImage = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 4px;
  color: #6c757d;
  font-size: 12px;
  text-align: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0056b3;
  }
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.div`
  color: #495057;
  font-weight: 500;
`;

const NoTours = styled.div`
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #6c757d;
  font-size: 18px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #6c757d;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
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

export default TourOffers; 
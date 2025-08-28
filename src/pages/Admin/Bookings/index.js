import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getBookings, updateBooking, deleteBooking } from '../../../services/api';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import {
  Container,
  HeaderSection,
  Title,
  TableWrapper,
  Table,
  Th,
  Td,
  Tr,
  CustomerInfo,
  StatusSelect,
  DeleteButton,
  NoBookings,
  LoadingMessage,
  ErrorMessage,
  Modal,
  ModalContent,
  StatusChangeInfo,
  StatusBadge,
  ModalButtons,
  CancelButton,
  ConfirmButton
} from './Bookings.styled';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusChangeData, setStatusChangeData] = useState(null);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    const token = Cookies.get('token');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await getBookings(token);
      setBookings(response);
    } catch (err) {
      setError('Ошибка при загрузке бронирований');
      if (err.message.includes('401')) {
        Cookies.remove('token');
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [navigate]);

  const handleDeleteClick = (e, bookingId) => {
    e.stopPropagation();
    setBookingToDelete(bookingId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const token = Cookies.get('token');
      await deleteBooking(token, bookingToDelete);
      fetchBookings();
      setShowDeleteModal(false);
      setBookingToDelete(null);
    } catch (err) {
      setError('Ошибка при удалении бронирования');
    }
  };

  const handleStatusChange = (e, bookingId, newStatus, oldStatus) => {
    e.preventDefault();
    setStatusChangeData({
      bookingId,
      newStatus,
      oldStatus,
      customerName: bookings.find(b => b.id === bookingId)?.customer?.full_name || 'Клиент'
    });
    setShowStatusModal(true);
  };

  const confirmStatusChange = async () => {
    try {
      const token = Cookies.get('token');
      const booking = bookings.find(b => b.id === statusChangeData.bookingId);
      if (!booking) return;

      const updatedBooking = { ...booking, status: statusChangeData.newStatus };
      await updateBooking(token, statusChangeData.bookingId, updatedBooking);
      
      // Обновляем локальное состояние
      setBookings(prev => prev.map(b => 
        b.id === statusChangeData.bookingId ? { ...b, status: statusChangeData.newStatus } : b
      ));
      
      setShowStatusModal(false);
      setStatusChangeData(null);
    } catch (err) {
      setError('Ошибка при обновлении статуса');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'confirmed': return '#28a745';
      case 'cancelled': return '#dc3545';
      case 'completed': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Ожидает';
      case 'confirmed': return 'Подтверждено';
      case 'cancelled': return 'Отменено';
      case 'completed': return 'Завершено';
      default: return status;
    }
  };

  if (isLoading && bookings.length === 0) {
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
          <Title>Бронирования</Title>
        </HeaderSection>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {bookings && bookings.length > 0 ? (
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th>ID</Th>
                  <Th>Клиент</Th>
                  <Th>Описание</Th>
                  <Th>Дата начала</Th>
                  <Th>Дата окончания</Th>
                  <Th>Бюджет (₽)</Th>
                  <Th>Взрослые</Th>
                  <Th>Дети</Th>
                  <Th>Статус</Th>
                  <Th>Действия</Th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <Tr key={booking.id}>
                    <Td>{booking.id}</Td>
                    <Td>
                      <CustomerInfo>
                        <div><strong>{booking.customer?.full_name}</strong></div>
                        <div>{booking.customer?.email}</div>
                        <div>{booking.customer?.phone}</div>
                      </CustomerInfo>
                    </Td>
                    <Td className="description">{booking.description}</Td>
                    <Td>{new Date(booking.date_start).toLocaleDateString('ru-RU')}</Td>
                    <Td>{new Date(booking.date_end).toLocaleDateString('ru-RU')}</Td>
                    <Td>{booking.budget ? Number(booking.budget).toLocaleString('ru-RU') : '-'}</Td>
                    <Td>{booking.adult_count || 0}</Td>
                    <Td>{booking.children_count || 0}</Td>
                    <Td>
                      <StatusSelect
                        value={booking.status || 'pending'}
                        onChange={(e) => handleStatusChange(e, booking.id, e.target.value, booking.status)}
                        color={getStatusColor(booking.status)}
                      >
                        <option value="pending">Ожидает</option>
                        <option value="confirmed">Подтверждено</option>
                        <option value="cancelled">Отменено</option>
                        <option value="completed">Завершено</option>
                      </StatusSelect>
                    </Td>
                    <Td onClick={(e) => e.stopPropagation()}>
                      <DeleteButton onClick={(e) => handleDeleteClick(e, booking.id)}>
                        Удалить
                      </DeleteButton>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        ) : (
          <NoBookings>Нет доступных бронирований</NoBookings>
        )}

        {/* Модальное окно удаления */}
        {showDeleteModal && (
          <Modal>
            <ModalContent>
              <h3>Подтверждение удаления</h3>
              <p>Вы уверены, что хотите удалить это бронирование?</p>
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

        {/* Модальное окно подтверждения изменения статуса */}
        {showStatusModal && statusChangeData && (
          <Modal>
            <ModalContent>
              <h3>Подтверждение изменения статуса</h3>
              <p>
                Вы уверены, что хотите изменить статус бронирования для{' '}
                <strong>{statusChangeData.customerName}</strong>?
              </p>
              <StatusChangeInfo>
                <span>Текущий статус: </span>
                <StatusBadge color={getStatusColor(statusChangeData.oldStatus)}>
                  {getStatusText(statusChangeData.oldStatus)}
                </StatusBadge>
              </StatusChangeInfo>
              <StatusChangeInfo>
                <span>Новый статус: </span>
                <StatusBadge color={getStatusColor(statusChangeData.newStatus)}>
                  {getStatusText(statusChangeData.newStatus)}
                </StatusBadge>
              </StatusChangeInfo>
              <ModalButtons>
                <CancelButton onClick={() => {
                  setShowStatusModal(false);
                  setStatusChangeData(null);
                }}>
                  Отмена
                </CancelButton>
                <ConfirmButton onClick={confirmStatusChange}>
                  Подтвердить
                </ConfirmButton>
              </ModalButtons>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </AdminLayout>
  );
};

export default Bookings;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { getTourOffer, updateTourOffer } from '../../../services/api';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';

const TourShow = () => {
    const [tour, setTour] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
  
    useEffect(() => {
      const token = Cookies.get('token');
      
      if (!token) {
        navigate('/login');
        return;
      }
  
      const fetchTour = async () => {
        try {
          const data = await getTourOffer(id, token);
          setTour(data);
        } catch (err) {
          setError(err.message);
          if (err.message.includes('401')) {
            Cookies.remove('token');
            navigate('/login');
          }
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchTour();
    }, [id, navigate]);
  
    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        // Создаем превью изображения
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Создаем объект с данными формы
      const formData = {
        title: e.target.title.value,
        hotel: e.target.hotel.value,
        price: e.target.price.value,
        description: e.target.description.value,
        start_date: e.target.start_date.value,
        end_date: e.target.end_date.value
      };

      // Если есть новое изображение, добавляем его
      if (imageFile) {
        formData.image = imageFile;
      }

      try {
        const token = Cookies.get('token');
        await updateTourOffer(token, id, formData);
        const updatedTour = await getTourOffer(id, token);
        setTour(updatedTour);
        setIsEditing(false);
        setImageFile(null);
        setImagePreview(null);
      } catch (err) {
        setError('Ошибка при обновлении тура');
      }
    };
  
    if (isLoading) return <LoadingWrapper>Загрузка...</LoadingWrapper>;
    if (error) return <ErrorWrapper>{error}</ErrorWrapper>;
    if (!tour) return <ErrorWrapper>Тур не найден</ErrorWrapper>;
  
    return (
      <AdminLayout 
        backLink="/admin/tour-offers"
        title="Назад к списку туров"
      >
        <Container>
          {isEditing ? (
            <EditForm onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Название:</Label>
                <Input name="title" defaultValue={tour.title} required />
              </FormGroup>
  
              <FormGroup>
                <Label>Отель:</Label>
                <Input name="hotel" defaultValue={tour.hotel} required />
              </FormGroup>
  
              <FormGroup>
                <Label>Цена:</Label>
                <Input type="number" name="price" defaultValue={tour.price} required />
              </FormGroup>
  
              <FormGroup>
                <Label>Описание:</Label>
                <Textarea name="description" defaultValue={tour.description} required />
              </FormGroup>
  
              <FormGroup>
                <Label>Дата начала:</Label>
                <Input 
                  type="date" 
                  name="start_date" 
                  defaultValue={tour.start_date.split('T')[0]} 
                  required 
                />
              </FormGroup>
  
              <FormGroup>
                <Label>Дата окончания:</Label>
                <Input 
                  type="date" 
                  name="end_date" 
                  defaultValue={tour.end_date.split('T')[0]} 
                  required 
                />
              </FormGroup>
  
              <FormGroup>
                <Label>Изображение:</Label>
                <ImageUploadWrapper>
                  {(imagePreview || tour.image_url) && (
                    <PreviewImage 
                      src={imagePreview || tour.image_url} 
                      alt="Preview" 
                    />
                  )}
                  <FileInput
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    id="image-upload"
                  />
                  <UploadButton htmlFor="image-upload">
                    {imageFile ? 'Изменить изображение' : 'Загрузить изображение'}
                  </UploadButton>
                </ImageUploadWrapper>
              </FormGroup>
  
              <ButtonGroup>
                <SaveButton type="submit">Сохранить</SaveButton>
                <CancelButton type="button" onClick={() => setIsEditing(false)}>
                  Отмена
                </CancelButton>
              </ButtonGroup>
            </EditForm>
          ) : (
            <ContentWrapper>
              <ImageSection>
                {tour.image_url && !imageError ? (
                  <TourImage
                    src={tour.image_url}
                    alt={tour.title}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <NoImage>Изображение недоступно</NoImage>
                )}
              </ImageSection>
  
              <InfoSection>
                <TitleRow>
                  <Title>{tour.title}</Title>
                  <EditButton onClick={handleEdit}>Редактировать</EditButton>
                </TitleRow>
                
                <InfoGrid>
                  <InfoItem>
                    <Label>Отель:</Label>
                    <Value>{tour.hotel}</Value>
                  </InfoItem>
                  
                  <InfoItem>
                    <Label>Цена:</Label>
                    <Value>{Number(tour.price).toLocaleString('ru-RU')} ₽</Value>
                  </InfoItem>
                  
                  <InfoItem>
                    <Label>Дата начала:</Label>
                    <Value>{new Date(tour.start_date).toLocaleDateString('ru-RU')}</Value>
                  </InfoItem>
                  
                  <InfoItem>
                    <Label>Дата окончания:</Label>
                    <Value>{new Date(tour.end_date).toLocaleDateString('ru-RU')}</Value>
                  </InfoItem>
                </InfoGrid>
  
                <Description>
                  <Label>Описание:</Label>
                  <Value>{tour.description}</Value>
                </Description>
              </InfoSection>
            </ContentWrapper>
          )}
        </Container>
      </AdminLayout>
    );
  };
  
  const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `;
  
  const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  `;
  
  const ImageSection = styled.div`
    height: 400px;
    background: #f4f4f4;
  `;
  
  const TourImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `;
  
  const NoImage = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    background: #f4f4f4;
  `;
  
  const InfoSection = styled.div`
    padding: 30px;
  `;
  
  const Title = styled.h1`
    margin: 0 0 20px 0;
    color: #333;
    font-size: 24px;
  `;
  
  const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
  `;
  
  const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
  `;
  
  const Label = styled.span`
    color: #666;
    font-size: 14px;
    margin-bottom: 5px;
  `;
  
  const Value = styled.span`
    color: #333;
    font-size: 16px;
  `;
  
  const Description = styled.div`
    display: flex;
    flex-direction: column;
  `;
  
  const LoadingWrapper = styled.div`
    text-align: center;
    padding: 40px;
    color: #666;
  `;
  
  const ErrorWrapper = styled.div`
    text-align: center;
    padding: 40px;
    color: #ff4444;
  `;
  
  const EditForm = styled.form`
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  `;
  
  const FormGroup = styled.div`
    margin-bottom: 20px;
  `;
  
  const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    &:focus {
      outline: none;
      border-color: #007bff;
    }
  `;
  
  const Textarea = styled.textarea`
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-height: 100px;
    
    &:focus {
      outline: none;
      border-color: #007bff;
    }
  `;
  
  const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
  `;
  
  const TitleRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `;
  
  const EditButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background-color: #0056b3;
    }
  `;
  
  const SaveButton = styled.button`
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background-color: #218838;
    }
  `;
  
  const CancelButton = styled.button`
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background-color: #c82333;
    }
  `;
  
  const ImageUploadWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  `;
  
  const PreviewImage = styled.img`
    max-width: 200px;
    max-height: 200px;
    object-fit: cover;
    border-radius: 4px;
  `;
  
  const FileInput = styled.input`
    display: none;
  `;
  
  const UploadButton = styled.label`
    background-color: #007bff;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0056b3;
    }
  `;
  
  export default TourShow; 
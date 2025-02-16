import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { createTourOffer } from '../../../services/api';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';

const NewTourOffer = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      title: e.target.title.value,
      hotel: e.target.hotel.value,
      price: e.target.price.value,
      description: e.target.description.value,
      start_date: e.target.start_date.value,
      end_date: e.target.end_date.value
    };

    if (imageFile) {
      formData.image = imageFile;
    }

    try {
      const token = Cookies.get('token');
      await createTourOffer(token, formData);
      navigate('/admin/tour-offers');
    } catch (err) {
      setError('Ошибка при создании тура');
    }
  };

  return (
    <AdminLayout>
      <Container>
        <Title>Создание нового тура</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Название:</Label>
            <Input
              type="text"
              name="title"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Отель:</Label>
            <Input
              type="text"
              name="hotel"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Цена:</Label>
            <Input
              type="number"
              name="price"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Описание:</Label>
            <Textarea
              name="description"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Дата начала:</Label>
            <Input
              type="date"
              name="start_date"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Дата окончания:</Label>
            <Input
              type="date"
              name="end_date"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Изображение:</Label>
            <ImageUploadWrapper>
              {imagePreview && (
                <PreviewImage 
                  src={imagePreview} 
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
            <CancelButton type="button" onClick={() => navigate('/admin/tour-offers')}>
              Отмена
            </CancelButton>
            <SubmitButton type="submit">
              Создать тур
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </Container>
    </AdminLayout>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 500;
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
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #218838;
  }
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

const ErrorMessage = styled.div`
  color: #dc3545;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #f8d7da;
  border-radius: 4px;
  text-align: center;
`;

export default NewTourOffer; 
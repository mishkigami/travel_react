import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getCompanyInfo, updateCompanyInfo } from '../../../services/api';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import {
  Container,
  HeaderSection,
  Title,
  Form,
  FormSection,
  SectionTitle,
  FormGroup,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  SaveButton,
  ResetButton,
  LoadingMessage,
  ErrorMessage,
  SuccessMessage,
  SocialLinksSection,
  SocialLinkGroup,
  LinkPreview
} from './GeneralCompany.styled';

const GeneralCompany = () => {
  const [formData, setFormData] = useState({
    description: '',
    address: '',
    phone: '',
    email: '',
    telagramm_link: '',
    instagram_link: '',
    whatsapp_link: ''
  });
  
  const [originalData, setOriginalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const fetchCompanyData = async () => {
    const token = Cookies.get('token');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    try {
      setIsLoading(true);
      const data = await getCompanyInfo(token);
      setFormData(data);
      setOriginalData(data);
    } catch (err) {
      setError('Ошибка при загрузке данных компании');
      if (err.message.includes('401')) {
        Cookies.remove('token');
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, [navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);

      const updatedData = await updateCompanyInfo(token, formData);
      setFormData(updatedData);
      setOriginalData(updatedData);
      setSuccess('Информация о компании успешно обновлена!');
      
      // Скрываем сообщение об успехе через 3 секунды
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (originalData) {
      setFormData(originalData);
      setError(null);
      setSuccess(null);
    }
  };

  const hasChanges = () => {
    // Если это первое заполнение (нет оригинальных данных)
    if (!originalData) {
      // Проверяем, заполнены ли обязательные поля
      const hasRequiredFields = formData.description && formData.address && formData.phone && formData.email;
      return hasRequiredFields;
    }
    
    // Если есть оригинальные данные, проверяем изменения
    return Object.keys(formData).some(key => formData[key] !== originalData[key]);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <Container>
          <LoadingMessage>Загрузка данных компании...</LoadingMessage>
        </Container>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Container>
        <HeaderSection>
          <Title>Информация о компании</Title>
        </HeaderSection>



        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <Form onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Основная информация</SectionTitle>
            
            <FormGroup>
              <Label>Описание компании *</Label>
              <TextArea
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Введите описание компании"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Адрес *</Label>
              <Input
                type="text"
                value={formData.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Введите адрес компании"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Телефон *</Label>
              <Input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+7 (999) 123-45-67"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Email *</Label>
              <Input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="company@example.com"
                required
              />
            </FormGroup>
          </FormSection>

          <FormSection>
            <SectionTitle>Социальные сети</SectionTitle>
            <p style={{ color: '#6c757d', fontSize: '14px', marginBottom: '20px' }}>
              Ссылки на социальные сети необязательны для заполнения
            </p>
            
            <SocialLinksSection>
              <SocialLinkGroup>
                <FormGroup>
                  <Label>Telegram ссылка</Label>
                  <Input
                    type="url"
                    value={formData.telagramm_link || ''}
                    onChange={(e) => handleInputChange('telagramm_link', e.target.value)}
                    placeholder="https://t.me/username"
                  />
                  {formData.telagramm_link && (
                    <LinkPreview>
                      <a href={formData.telagramm_link} target="_blank" rel="noopener noreferrer">
                        Открыть ссылку
                      </a>
                    </LinkPreview>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Instagram ссылка</Label>
                  <Input
                    type="url"
                    value={formData.instagram_link || ''}
                    onChange={(e) => handleInputChange('instagram_link', e.target.value)}
                    placeholder="https://instagram.com/username"
                  />
                  {formData.instagram_link && (
                    <LinkPreview>
                      <a href={formData.instagram_link} target="_blank" rel="noopener noreferrer">
                        Открыть ссылку
                      </a>
                    </LinkPreview>
                  )}
                </FormGroup>
              </SocialLinkGroup>

              <FormGroup>
                <Label>WhatsApp ссылка</Label>
                <Input
                  type="url"
                  value={formData.whatsapp_link || ''}
                  onChange={(e) => handleInputChange('whatsapp_link', e.target.value)}
                  placeholder="https://wa.me/79991234567"
                />
                {formData.whatsapp_link && (
                  <LinkPreview>
                    <a href={formData.whatsapp_link} target="_blank" rel="noopener noreferrer">
                      Открыть ссылку
                    </a>
                  </LinkPreview>
                )}
              </FormGroup>
            </SocialLinksSection>
          </FormSection>

          <ButtonGroup>
            <ResetButton 
              type="button" 
              onClick={handleReset}
              disabled={!hasChanges()}
            >
              Сбросить
            </ResetButton>
            <SaveButton 
              type="submit" 
              disabled={isSaving || !hasChanges()}
            >
              {isSaving ? 'Сохранение...' : 'Сохранить'}
            </SaveButton>
          </ButtonGroup>
        </Form>
      </Container>
    </AdminLayout>
  );
};

export default GeneralCompany;

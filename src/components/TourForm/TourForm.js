import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getDestinations } from '../../services/api';

const Section = styled.section`
  padding: 80px 20px;
  background-color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  color: #333;
`;

const FormContainer = styled.form`
  max-width: 600px;
  margin: 0 auto;
  display: grid;
  gap: 20px;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
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

const Select = styled.select`
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

const Button = styled.button`
  padding: 15px 30px;
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

const DateRangeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const DateLabel = styled.label`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
  display: block;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
  
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    color: #ff6b6b;
  }
`;

const TourForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: ''
  });

  const [destinations, setDestinations] = useState([]);
  const [loadingDestinations, setLoadingDestinations] = useState(true);

  // Загрузка направлений при монтировании компонента
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoadingDestinations(true);
        const response = await getDestinations(100, 0); // Загружаем больше данных для полного списка
        const destinationsData = response.destinations || response.data || [];
        
        // Извлекаем уникальные названия направлений
        const uniqueDestinations = [...new Set(destinationsData.map(item => item.title))];
        setDestinations(uniqueDestinations);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoadingDestinations(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Валидация: дата окончания не может быть раньше даты начала
      if (name === 'startDate' && newData.endDate && value > newData.endDate) {
        newData.endDate = '';
      }
      if (name === 'endDate' && newData.startDate && value < newData.startDate) {
        return prev; // Не обновляем, если дата некорректна
      }
      
      return newData;
    });
  };

  // Получаем сегодняшнюю дату для минимального значения
  const today = new Date().toISOString().split('T')[0];

  return (
    <Section>
      <Container>
        <Title data-aos="fade-up">Подберем тур для вас</Title>
        <FormContainer 
          onSubmit={handleSubmit}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <Input
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Select
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          >
            <option value="">
              {loadingDestinations ? 'Загрузка направлений...' : 'Выберите направление'}
            </option>
            {destinations.map((destination, index) => (
              <option key={index} value={destination}>
                {destination}
              </option>
            ))}
          </Select>
          <DateRangeContainer>
            <div>
              <DateLabel>Дата заезда</DateLabel>
              <DateInput
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleDateChange}
                min={today}
                required
              />
            </div>
            <div>
              <DateLabel>Дата выезда</DateLabel>
              <DateInput
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleDateChange}
                min={formData.startDate || today}
                required
              />
            </div>
          </DateRangeContainer>
          <Select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          >
            <option value="">Выберите бюджет</option>
            <option value="economy">До 100 000 ₽</option>
            <option value="standard_1">100 000 - 250 000 ₽</option>
            <option value="standard_2">250 000 - 500 000 ₽</option>
            <option value="luxury">Более 500 000 ₽</option>
          </Select>
          <Button type="submit">Отправить заявку</Button>
        </FormContainer>
      </Container>
    </Section>
  );
};

export default TourForm; 
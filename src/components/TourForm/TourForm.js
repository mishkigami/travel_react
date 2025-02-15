import styled from 'styled-components';
import { useState } from 'react';

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

const TourForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    dates: '',
    budget: ''
  });

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
            <option value="">Выберите направление</option>
            <option value="europe">Европа</option>
            <option value="asia">Азия</option>
            <option value="america">Америка</option>
            <option value="africa">Африка</option>
          </Select>
          <Input
            type="text"
            name="dates"
            placeholder="Предпочтительные даты"
            value={formData.dates}
            onChange={handleChange}
          />
          <Select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          >
            <option value="">Выберите бюджет</option>
            <option value="economy">До 100 000 ₽</option>
            <option value="standard">100 000 - 200 000 ₽</option>
            <option value="luxury">Более 200 000 ₽</option>
          </Select>
          <Button type="submit">Отправить заявку</Button>
        </FormContainer>
      </Container>
    </Section>
  );
};

export default TourForm; 
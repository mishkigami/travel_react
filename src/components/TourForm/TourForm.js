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

const TravelersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const TravelerGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const TravelerLabel = styled.label`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
  display: block;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
`;

const CounterButton = styled.button`
  background: #f8f9fa;
  border: none;
  padding: 12px 15px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  color: #666;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #e9ecef;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CounterDisplay = styled.div`
  flex: 1;
  text-align: center;
  padding: 12px;
  background: white;
  font-size: 16px;
  font-weight: 500;
`;

const ChildrenAgesContainer = styled.div`
  margin-top: 15px;
  grid-column: 1 / -1;
`;

const ChildrenAgesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 10px;
`;

const ChildAgeGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChildLabel = styled.label`
  font-size: 12px;
  color: #888;
  margin-bottom: 5px;
  font-weight: 500;
`;

const AgeSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #ff6b6b;
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
    adults: 2,
    children: 0,
    childrenAges: [],
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

  // Обработчики для изменения количества путешественников
  const handleAdultsChange = (increment) => {
    setFormData(prev => ({
      ...prev,
      adults: Math.max(1, prev.adults + increment)
    }));
  };

  const handleChildrenChange = (increment) => {
    setFormData(prev => {
      const newChildren = Math.max(0, prev.children + increment);
      const newChildrenAges = [...prev.childrenAges];
      
      // Если увеличиваем количество детей, добавляем новые возрасты
      if (newChildren > prev.children) {
        for (let i = prev.children; i < newChildren; i++) {
          newChildrenAges.push('');
        }
      }
      // Если уменьшаем, удаляем лишние возрасты
      else if (newChildren < prev.children) {
        newChildrenAges.splice(newChildren);
      }
      
      return {
        ...prev,
        children: newChildren,
        childrenAges: newChildrenAges
      };
    });
  };

  const handleChildAgeChange = (index, age) => {
    setFormData(prev => {
      const newChildrenAges = [...prev.childrenAges];
      newChildrenAges[index] = age;
      return {
        ...prev,
        childrenAges: newChildrenAges
      };
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
          <Input
            type="text"
            name="destination"
            placeholder="Куда хотите поехать?"
            value={formData.destination}
            onChange={handleChange}
            required
          />
          <TravelersContainer>
            <TravelerGroup>
              <TravelerLabel>Взрослые</TravelerLabel>
              <CounterContainer>
                <CounterButton 
                  type="button"
                  onClick={() => handleAdultsChange(-1)}
                  disabled={formData.adults <= 1}
                >
                  −
                </CounterButton>
                <CounterDisplay>{formData.adults}</CounterDisplay>
                <CounterButton 
                  type="button"
                  onClick={() => handleAdultsChange(1)}
                  disabled={formData.adults >= 10}
                >
                  +
                </CounterButton>
              </CounterContainer>
            </TravelerGroup>
            
            <TravelerGroup>
              <TravelerLabel>Дети</TravelerLabel>
              <CounterContainer>
                <CounterButton 
                  type="button"
                  onClick={() => handleChildrenChange(-1)}
                  disabled={formData.children <= 0}
                >
                  −
                </CounterButton>
                <CounterDisplay>{formData.children}</CounterDisplay>
                <CounterButton 
                  type="button"
                  onClick={() => handleChildrenChange(1)}
                  disabled={formData.children >= 6}
                >
                  +
                </CounterButton>
              </CounterContainer>
            </TravelerGroup>
            
            {formData.children > 0 && (
              <ChildrenAgesContainer>
                <TravelerLabel>Возраст детей</TravelerLabel>
                <ChildrenAgesGrid>
                  {formData.childrenAges.map((age, index) => (
                    <ChildAgeGroup key={index}>
                      <ChildLabel>{index + 1}-й ребенок</ChildLabel>
                      <AgeSelect
                        value={age}
                        onChange={(e) => handleChildAgeChange(index, e.target.value)}
                        required
                      >
                        <option value="">Выберите возраст</option>
                        {Array.from({ length: 17 }, (_, i) => i + 1).map(ageOption => (
                          <option key={ageOption} value={ageOption}>
                            {ageOption} {ageOption === 1 ? 'год' : ageOption < 5 ? 'года' : 'лет'}
                          </option>
                        ))}
                      </AgeSelect>
                    </ChildAgeGroup>
                  ))}
                </ChildrenAgesGrid>
              </ChildrenAgesContainer>
            )}
          </TravelersContainer>
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
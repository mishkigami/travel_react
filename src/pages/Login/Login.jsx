import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { loginUser } from '../../services/api';
import {
  LoginContainer,
  LoginForm,
  Title,
  FormGroup,
  Button,
  ErrorMessage,
} from './Login.styles';

const RECAPTCHA_SITE_KEY = '6LfkJrgqAAAAAIlr-mFhI3cijrjDECMsyVFj4EL9';

const Login = () => {
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleRecaptchaChange = (token) => {
    console.log("ReCAPTCHA value:", token);
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      setError('Пожалуйста, подтвердите, что вы не робот');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await loginUser(formData.email, formData.password, recaptchaToken);
      console.log('Login response:', response);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Ошибка при входе. Попробуйте снова.');
      recaptchaRef.current.reset(); // Сбрасываем капчу при ошибке
      setRecaptchaToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Вход в систему</Title>
        
        <FormGroup>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Введите ваш email"
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Введите ваш пароль"
          />
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={handleRecaptchaChange}
        />

        <Button type="submit" disabled={isLoading || !recaptchaToken}>
          {isLoading ? 'Выполняется вход...' : 'Войти'}
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
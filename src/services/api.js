const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (email, password, recaptchaToken) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        recaptcha_token: recaptchaToken
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Ошибка при входе');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}; 
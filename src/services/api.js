import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (email, password, recaptchaToken) => {
  try {
    
    const response = await fetch(`${API_URL}/api/v1/admin/login`, {
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
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при входе');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Login API Error:', error);
    throw error;
  }
};

export const getTourOffers = async (token, page = 1) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/admin/tour_offers?page=${page}&per_page=10`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Ошибка при получении списка туров');
    }

    return await response.json();
  } catch (error) {
    console.error('Tour Offers API Error:', error);
    throw error;
  }
};

export const getTourOffer = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/admin/tour_offers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при получении тура');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Tour Offer API Error:', error);
    throw error;
  }
};

export const updateTourOffer = async (token, id, formData) => {
  try {
    // Создаем новый FormData
    const data = new FormData();
    
    // Добавляем все поля с правильным неймспейсом tour_offer[]
    if (formData.title) data.append('tour_offer[title]', formData.title);
    if (formData.hotel) data.append('tour_offer[hotel]', formData.hotel);
    if (formData.price) data.append('tour_offer[price]', formData.price);
    if (formData.description) data.append('tour_offer[description]', formData.description);
    if (formData.start_date) data.append('tour_offer[start_date]', formData.start_date);
    if (formData.end_date) data.append('tour_offer[end_date]', formData.end_date);
    
    // Добавляем изображение, если оно есть
    if (formData.image) {
      data.append('tour_offer[image]', formData.image);
    }

    const response = await fetch(`${API_URL}/api/v1/admin/tour_offers/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteTourOffer = async (token, id) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/admin/tour_offers/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createTourOffer = async (token, formData) => {
  try {
    const data = new FormData();
    
    // Добавляем все поля с правильным неймспейсом tour_offer[]
    if (formData.title) data.append('tour_offer[title]', formData.title);
    if (formData.hotel) data.append('tour_offer[hotel]', formData.hotel);
    if (formData.price) data.append('tour_offer[price]', formData.price);
    if (formData.description) data.append('tour_offer[description]', formData.description);
    if (formData.start_date) data.append('tour_offer[start_date]', formData.start_date);
    if (formData.end_date) data.append('tour_offer[end_date]', formData.end_date);
    
    // Добавляем изображение, если оно есть
    if (formData.image) {
      data.append('tour_offer[image]', formData.image);
    }

    const response = await fetch(`${API_URL}/api/v1/admin/tour_offers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}; 
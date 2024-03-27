import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const UserService = {
  async createUser(userData) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Token de acceso no encontrado');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    return axios.post(`${API_URL}/create-user`, userData, config)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  async getUsers() {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Token de acceso no encontrado');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };

      const response = await axios.get(`${API_URL}/users`, config);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
  }
};

export default UserService;

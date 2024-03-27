import axios from 'axios';

const PasswordService = {
  async updatePassword(token, email, password) {
    const requestData = {
      password: password
    };

    return axios.put(`http://127.0.0.1:8000/api/update-password/${token}`, requestData, {
      params: {
        email: email
      }
    })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
  },
  
  async forgotPassword(email) {
    const requestData = {
      email: email
    };

    return axios.post('http://127.0.0.1:8000/api/forgot-password', requestData)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },
};

export default PasswordService;

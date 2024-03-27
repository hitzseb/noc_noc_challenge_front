import axios from 'axios';

const StatusService = {
  async getStatusList() {
    return axios.get('http://127.0.0.1:8000/api/status')
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },
};

export default StatusService;

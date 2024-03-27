import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const TaskService = {
  async addTask(taskData) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(`${API_URL}/create-task`, taskData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error al agregar la tarea: ${error.message}`);
    }
  },

  async getAllTasks() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Token de acceso no encontrado');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    return axios.get(`${API_URL}/all-tasks`, config)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  async getMyTasks() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Token de acceso no encontrado');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    return axios.get(`${API_URL}/my-tasks`, config)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  async getTaskById(id) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Token de acceso no encontrado');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    return axios.get(`${API_URL}/tasks/${id}`, config)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  async getStatusList() {
    return axios.get(`${API_URL}/status`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  async updateTaskStatus(taskId, statusData) {
    const accessToken = localStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    return axios.put(`${API_URL}/tasks/${taskId}/update-status`, statusData, config)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  async addComment(taskId, comment) {
    const accessToken = localStorage.getItem('accessToken');
    const url = `${API_URL}/tasks/${taskId}/comment`;
    const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    };

    return axios.post(url, { content: comment }, config)
      .then(response => response.data)
      .catch(error => {
        throw new Error(`Error adding comment: ${error.message}`);
      });
  },

  async attachFile(taskId, formData) {
    const accessToken = localStorage.getItem('accessToken');
    const url = `${API_URL}/tasks/${taskId}/attach`;
    const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    return axios.post(url, formData, config)
      .then(response => response.data)
      .catch(error => {
        throw new Error(`Error attaching file: ${error.message}`);
      });
  },

  async deleteAttachment(attachmentId) {
    const accessToken = localStorage.getItem('accessToken');
    const url = `${API_URL}/attachments/${attachmentId}/delete`;
    const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    };

    return axios.delete(url, config)
      .then(response => response.data)
      .catch(error => {
        throw new Error(`Error deleting attachment: ${error.message}`);
      });
  },
};

export default TaskService;

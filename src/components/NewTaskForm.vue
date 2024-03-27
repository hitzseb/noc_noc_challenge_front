<template>
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h3>Nueva Tarea</h3>
          <form @submit.prevent="createTask">
            <div class="mb-3">
              <label for="title" class="form-label">Título:</label>
              <input type="text" class="form-control" id="title" v-model="title">
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Descripción:</label>
              <textarea class="form-control" id="description" v-model="description"></textarea>
            </div>
            <div class="mb-3">
              <label for="status" class="form-label">Estado:</label>
              <select class="form-select" id="status" v-model="selectedStatus">
                <option v-for="status in statusList" :key="status.id" :value="status.id">{{ status.status }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="assignedUser" class="form-label">Usuario Asignado:</label>
              <select class="form-select" id="assignedUser" v-model="selectedUser">
                <option v-for="user in userList" :key="user.id" :value="user.id">{{ user.name }}</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Crear Tarea</button>
          </form>
          <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
          {{ successMessage }}
        </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TaskService from '@/services/TaskService';
  import UserService from '@/services/UserService';
  
  export default {
    data() {
      return {
        title: '',
        description: '',
        selectedStatus: null,
        selectedUser: null,
        statusList: [],
        userList: [],
      };
    },
    async mounted() {
      await this.fetchStatusList();
      await this.fetchUserList();
    },
    methods: {
      async fetchStatusList() {
        try {
          this.statusList = await TaskService.getStatusList();
        } catch (error) {
          console.error('Error fetching status list:', error);
        }
      },
      async fetchUserList() {
        try {
          this.userList = await UserService.getUsers();
        } catch (error) {
          console.error('Error fetching user list:', error);
        }
      },
      async createTask() {
        try {
          const taskData = {
            title: this.title,
            description: this.description,
            status_id: this.selectedStatus,
            user_id: this.selectedUser,
          };
          await TaskService.addTask(taskData);
          // Reset form fields
          this.title = '';
          this.description = '';
          this.selectedStatus = null;
          this.selectedUser = null;
          this.successMessage = 'Tarea creada exitosamente';
          console.log('Tarea creada exitosamente');
        } catch (error) {
          console.error('Error creating task:', error);
        }
      },
    },
  };
  </script>
  
<template>
  <div class="container my-5">
    <div v-if="isAuthenticated">
      <div class="row">
        <div class="col-md-4 mb-4" v-for="task in tasks" :key="task.id">
          <div class="card">
            <div class="card-body">
              <h5>{{ task.title }}</h5>
              <p>{{ task.description }}</p>
              <p><strong>Estado:</strong> {{ task.status.status }}</p>
              <p><strong>Empleado:</strong> {{ task.user.name }}</p>
            </div>
            <div class="card-footer">
              <router-link :to="'/task/' + task.id">Ver detalle</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import AuthService from '@/services/AuthService';
import TaskService from '@/services/TaskService';
import { useRoute } from 'vue-router';

export default {
  name: "TaskList",
  setup() {
    const isAuthenticated = ref(false);
    const tasks = ref([]);
    const route = useRoute();

    async function fetchTasks() {
      try {
        const userData = await AuthService.getUserData();
        if (userData) {
          isAuthenticated.value = true;
          const userId = userData.id;
          const tasksFunction = route.path === '/all-tasks' ? TaskService.getAllTasks : TaskService.getMyTasks;
          tasks.value = await tasksFunction(userId);
        } else {
          isAuthenticated.value = false;
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario y las tareas:', error);
        isAuthenticated.value = false;
      }
    }

    onMounted(async () => {
      await fetchTasks();
    });

    watch(() => route.path, async (newPath) => {
      console.log('La ruta cambió:', newPath);
      await fetchTasks();
    });

    return {
      isAuthenticated,
      tasks
    };
  }
}
</script>

<style scoped>
.card {
  width: 75%;
}
</style>

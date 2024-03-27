<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-lg-8">
        <h3 v-if="isSuperAdmin" class="text-center">Crear nuevo usuario</h3>
        <form v-if="!isSuperAdmin" @submit.prevent="createUser">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre:</label>
            <input type="text" id="name" v-model="name" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Correo electrónico:</label>
            <input type="email" id="email" v-model="email" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary">Crear usuario</button>
          <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
            {{ successMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService';

export default {
  name: 'CreateUserForm',
  setup() {
    const userData = ref(null);
    const router = useRouter();

    const name = ref('');
    const email = ref('');
    const error = ref(null);
    const successMessage = ref('');

    onMounted(async () => {
      try {
        userData.value = await AuthService.getUserData();
        if (!userData.value || userData.value.role !== 'super_admin') {
          console.error('Acceso denegado: No eres super_admin');
          router.push('/login');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        router.push('/login');
      }
    });

    function isAdmin(userData) {
      return userData && userData.role === 'super_admin';
    }

    const createUser = async () => {
      try {
        const userData = {
          name: name.value,
          email: email.value,
        };
        await UserService.createUser(userData);
        successMessage.value = 'Usuario creado exitosamente';
        clearForm();
      } catch (err) {
        error.value = err.message;
      }
    };

    const clearForm = () => {
      name.value = '';
      email.value = '';
    };

    return {
      name,
      email,
      error,
      successMessage,
      createUser,
      isSuperAdmin: isAdmin(userData.value)
    };
  },
};
</script>

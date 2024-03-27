<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="login-form">
          <h3>Inicio de sesión</h3>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="email" class="form-label">Email:</label>
              <input type="email" id="email" v-model="email" class="form-control" required>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Contraseña:</label>
              <input type="password" id="password" v-model="password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
  name: "LoginForm",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      AuthService.login(this.email, this.password)
        .then(response => {
          // Inicio de sesión fue exitoso
          console.log('Inicio de sesión exitoso:', response);
          // Redireccionar a my-tasks
          this.$router.push('/my-tasks');
        })
        .catch(error => {
          // Error al iniciar sesión
          console.error('Error al iniciar sesión:', error);
        });
    }
  }
}
</script>

<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <h3>Actualizar contraseña</h3>
        <form @submit.prevent="updatePassword">
          <div class="mb-3">
            <label for="email" class="form-label">Correo electrónico:</label>
            <input type="email" id="email" v-model="email" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Nueva contraseña:</label>
            <input type="password" id="password" v-model="password" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirmar nueva contraseña:</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary">Actualizar contraseña</button>
          <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordService from '@/services/PasswordService';

export default {
  name: 'UpdatePassword',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      token: null,
      successMessage: null,
      errorMessage: null
    };
  },
  created() {
    // Obtiene el token de los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    this.token = urlParams.get('token');
  },
  methods: {
    updatePassword() {
      // Verifica que las contraseñas coincidan
      if (this.password !== this.confirmPassword) {
        console.error('Las contraseñas no coinciden');
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
      }

      // Envia solicitud solo si las contraseñas coinciden
      PasswordService.updatePassword(this.token, this.email, this.password) // Pasar email como parámetro
        .then(response => {
          console.log('Contraseña actualizada exitosamente:', response);
          this.successMessage = '¡Contraseña actualizada exitosamente!';
        })
        .catch(error => {
          console.error('Error al actualizar la contraseña:', error);
        });
    },
  },
};
</script>

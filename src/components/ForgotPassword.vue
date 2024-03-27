<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <h3>Olvidé mi contraseña</h3>
        <form @submit.prevent="forgotPassword">
          <div class="mb-3">
            <label for="email" class="form-label">Correo electrónico:</label>
            <input type="email" id="email" v-model="email" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary">Enviar solicitud de restablecimiento de contraseña</button>
          <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
            {{ successMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordService from '@/services/PasswordService';

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      successMessage: null
    };
  },
  methods: {
    forgotPassword() {
      PasswordService.forgotPassword(this.email)
        .then(response => {
          console.log('Solicitud de restablecimiento de contraseña enviada:', response);
          this.successMessage = 'Se ha enviado un correo electrónico para restablecer la contraseña.';
        })
        .catch(error => {
          console.error('Error al enviar la solicitud de restablecimiento de contraseña:', error);
        });
    },
  },
};
</script>

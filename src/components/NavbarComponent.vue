<template>
    <div class="sidebar fs-4">
      <ul class="nav flex-column">
        <li class="nav-item my-2">
          <router-link class="nav-link" to="/my-tasks">Mis Tareas</router-link>
        </li>
        <li class="nav-item my-2">
          <router-link class="nav-link" to="/all-tasks">Todas las Tareas</router-link>
        </li>
        <li class="nav-item my-2">
          <router-link class="nav-link" to="/forgot-password">Olvidé mi Contraseña</router-link>
        </li>
        <li class="nav-item my-2">
          <router-link class="nav-link" to="/update-password">Actualizar Contraseña</router-link>
        </li>
        <li class="nav-item my-2">
          <router-link class="nav-link" to="/login">Iniciar Sesión</router-link>
        </li>
        <li class="nav-item my-2" v-if="isSuperAdmin">
          <router-link class="nav-link" to="/new-task">Agregar tarea</router-link>
        </li>
        <li class="nav-item my-2" v-if="isSuperAdmin">
          <router-link class="nav-link" to="/create-user">Crear Usuario</router-link>
        </li>
        <li class="nav-item my-2 shadow" v-if="isSuperAdmin">
          <router-link class="nav-link" to="/make-report">Reporte</router-link>
        </li>
      </ul>
    </div>
  </template>

<script>
import { ref, watchEffect } from 'vue';
import authService from '@/services/AuthService';

export default {
    name: 'NavbarComponent',
    setup() {
        const isSuperAdmin = ref(false);

        // TODO: arreglar
        // watchEffect para observar los cambios en la autenticación del usuario
        watchEffect(async () => {
            try {
                const userData = await authService.getUserData();
                isSuperAdmin.value = userData && userData.role === 'super_admin';
                console.log('isSuperAdmin actualizado:', isSuperAdmin.value);
            } catch (error) {
                console.error('Error al verificar el rol de superadministrador:', error);
            }
        });

        return {
            isSuperAdmin
        };
    }
};
</script>

<style>
/* Estilo hover para los elementos li */
.nav-item:hover {
    background-color: rgba(0, 0, 0, 0.1); /* Cambia el color de fondo al pasar el puntero */
    transition: background-color 0.1s ease; /* Agrega una transición suave */
}
</style>
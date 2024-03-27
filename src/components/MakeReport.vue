<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <h3>Generar Informe</h3>
        <div class="mb-3">
          <label for="start-date" class="form-label">Fecha de inicio:</label>
          <input type="date" id="start-date" v-model="startDate" class="form-control">
        </div>
        <div class="mb-3">
          <label for="end-date" class="form-label">Fecha de fin:</label>
          <input type="date" id="end-date" v-model="endDate" class="form-control">
        </div>
        <button @click="generateReport" class="btn btn-primary">Generar Informe</button>
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
        <div v-if="success" class="alert alert-success mt-3">{{ success }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '@/services/AuthService';
import ReportService from '@/services/ReportService';

export default {
  name: 'MakeReport',
  setup() {
    const userData = ref(null);
    const router = useRouter();
    const startDate = ref('');
    const endDate = ref('');
    const error = ref('');
    const success = ref('');

    onMounted(async () => {
      try {
        userData.value = await AuthService.getUserData();
        if (!isAdmin(userData.value)) {
          console.error('Acceso denegado: No eres super_admin');
          router.push('/my-tasks');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    });

    function isAdmin(userData) {
      return userData && userData.role === 'super_admin';
    }

    async function generateReport() {
      try {
        const response = await ReportService.generateReport(startDate.value, endDate.value);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.pdf');
        document.body.appendChild(link);
        link.click();
        success.value = 'Informe generado con éxito.';
      } catch (error) {
        error.value = 'Error al generar el informe.';
        console.error('Error al generar el informe:', error);
      }
    }

    return {
      userData,
      isAdmin,
      startDate,
      endDate,
      generateReport,
      error,
      success
    };
  }
};
</script>
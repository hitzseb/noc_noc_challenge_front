<template>
  <div>
    <div class="container my-5">
      <div class="row">
        <div class="col-lg-10">
          <div v-if="task">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">{{ task.title }}</h2>
                <p class="card-text"><strong>Descripción:</strong> {{ task.description }}</p>
                <p class="card-text"><strong>Estado:</strong> {{ task.status.status }}</p>
                <p class="card-text"><strong>Fecha inicio:</strong> {{ task.created_at }}</p>

                <!-- Comentarios -->
                <div v-if="task.comments.length > 0">
                  <h3>Comentarios:</h3>
                  <figure v-for="comment in task.comments" :key="comment.id">
                    <blockquote class="blockquote">
                      <p>{{ comment.content }}</p>
                    </blockquote>
                    <figcaption class="blockquote-footer">
                      {{ comment.user.name }}
                    </figcaption>
                  </figure>
                </div>

                <div class="container px-5 my-5">
                  <!-- Archivos adjuntos -->
                  <div v-if="task.attachments.length > 0">
                    <h3>Archivos adjuntos:</h3>
                    <div v-for="attachment in task.attachments" :key="attachment.id" class="alert alert-primary"
                      role="alert">
                      <a :href="`http://127.0.0.1:8000/api/download/${attachment.path}`" target="_blank"
                        class="icon-link">
                        <svg class="bi" aria-hidden="true">
                          <use xlink:href="#box-seam"></use>
                        </svg>
                        {{ attachment.path }}
                      </a>
                      <button @click="deleteAttachment(attachment.id)"
                        class="btn btn-danger btn-sm float-end">Eliminar</button>
                    </div>
                  </div>

                  <!-- Cambiar estado -->
                  <div class="mt-3">
                    <label for="status" class="form-label">Cambiar Estado:</label>
                    <select v-model="selectedStatus" id="status" class="form-select mb-3">
                      <option v-for="status in statusList" :key="status.id" :value="status.id">{{ status.status }}
                      </option>
                    </select>
                    <button @click="updateTaskStatus" class="btn btn-primary">Actualizar Estado</button>
                  </div>

                  <!-- Agregar comentario -->
                  <div class="mt-3">
                    <textarea v-model="newComment" placeholder="Escribe un comentario"
                      class="form-control mb-2"></textarea>
                    <button @click="addComment(newComment)" class="btn btn-primary">Agregar Comentario</button>
                  </div>

                  <!-- Adjuntar archivo -->
                  <div class="mt-3">
                    <form @submit.prevent="attachFile">
                      <input type="file" ref="fileInput" accept=".pdf,.doc,.docx,.txt" class="form-control mb-2">
                      <button type="submit" class="btn btn-primary">Adjuntar Archivo</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="text-center">
              <div class="spinner-border text-dark" role="status">
                <span class="visually-hidden">Cargando...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskService from '@/services/TaskService';

export default {
  data() {
    return {
      task: null,
      selectedStatus: null,
      statusList: [],
    };
  },
  async mounted() {
    await this.fetchTaskDetails();
    await this.fetchStatusList();
    this.selectedStatus = this.task.status_id;
  },
  methods: {
    async fetchTaskDetails() {
      try {
        const taskId = this.$route.params.id;
        this.task = await TaskService.getTaskById(taskId);
      } catch (error) {
        console.error('Error al cargar los detalles de la tarea:', error);
      }
    },
    async fetchStatusList() {
      try {
        this.statusList = await TaskService.getStatusList();
      } catch (error) {
        console.error('Error al obtener la lista de estados:', error);
      }
    },
    async updateTaskStatus() {
      try {
        const taskId = this.$route.params.id;
        await TaskService.updateTaskStatus(taskId, { status_id: this.selectedStatus });
        // Actualiza la tarea después de la actualización del estado
        await this.fetchTaskDetails();
        console.log('Estado de la tarea actualizado correctamente');
      } catch (error) {
        console.error('Error al actualizar el estado de la tarea:', error);
      }
    },

    async deleteAttachment(attachmentId) {
      try {
        await TaskService.deleteAttachment(attachmentId);
        console.log('Archivo adjunto eliminado correctamente');
        // Actualiza la lista de archivos adjuntos localmente eliminando el archivo adjunto eliminado
        this.task.attachments = this.task.attachments.filter(attachment => attachment.id !== attachmentId);
      } catch (error) {
        console.error('Error deleting attachment:', error);
      }
    },
  },
};
</script>

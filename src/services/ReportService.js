import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const ReportService = {
  async generateReport(startDate, endDate) {
    const accessToken = localStorage.getItem('accessToken');
    // Construiye el objeto de solicitud con las fechas
    const requestData = {
      start_date: startDate + ' 00:00:00', // Agrega la hora 00:00:00 a la fecha de inicio
      end_date: endDate + ' 23:59:59', // Agrega la hora 23:59:59 a la fecha de fin
    };

    return axios.get(`${API_URL}/generate-report`, {
      params: requestData, // Pasa los parámetros en la URL
      responseType: 'blob', // Especifica el tipo de respuesta como blob
      headers: {
        Authorization: `Bearer ${accessToken}`, // Bearer token
      },
    })
    .then(response => {
      // Crea un enlace temporal para la descarga del PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Crea un enlace en el DOM y hacer clic en él para iniciar la descarga
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf');
      document.body.appendChild(link);
      link.click();

      // Libera recursos después de cierto tiempo para evitar pérdida de memoria
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }, 100);
    })
    .catch(error => {
      throw new Error('Error al generar el informe: ' + error.message);
    });
  },
};

export default ReportService;

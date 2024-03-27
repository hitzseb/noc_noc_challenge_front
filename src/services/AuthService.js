import axios from 'axios';

const AuthService = {
    async login(email, password) {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/login', { email, password });
        const accessToken = response.data.access_token;
        localStorage.setItem('accessToken', accessToken);
        console.log(response.data);
        return response.data;
    },

    async getUserData() {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Token de acceso no encontrado');
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };
        console.log('Configuración de la solicitud:', config);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/me', {}, config);
            console.log('Respuesta del servidor:', response);
            console.log('Datos del usuario:', response.data);
            return response.data;
        } catch (error) {
            throw new Error(`Error al obtener los datos del usuario: ${error.message}`);
        }
    },
};

export default AuthService;

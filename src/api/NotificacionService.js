import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const NotificacionService = {

  getNotificaciones: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notificaciones`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener notificaciones:', error);
      throw error;
    }
  },

  getNotificacionesByUserId: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/api/notificaciones/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener notificaciones por ID de usuario:', error);
      throw error;
    }
  },

  getNotificacionById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/notificacion/${parseInt(id)}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener el notificacion por ID: ' + error.message);
    }
  },

  deleteNotificacion: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/notificacion/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el notificacion:', error);
      throw error;
    }
  },

  createNotificacion: async (notificacion) => {
    try {
      notificacion.fecha = new Date(notificacion.fecha).toISOString();
      const response = await axios.post(`${API_URL}/api/create-notificacion`, notificacion, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al crear el notificacion:', error);
      throw error;
    }
  },

  markAsRead: async (id) => {
    try {
      const response = await axios.put(`${API_URL}/api/notificacion/${id}/leido`);
      return response.data;
    } catch (error) {
      console.error('Error al marcar la notificacion como leída:', error);
      throw error;
    }
  },

  markAllAsRead: async (userId) => {
    try {
      const response = await axios.put(`${API_URL}/api/notificacion/leido/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error al marcar todas las notificaciones como leídas:', error);
      throw error;
    }
  }
};

export default NotificacionService;
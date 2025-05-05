import apiClient from "./apiClient";

const API_URL = process.env.REACT_APP_API_URL; 

const UsuarioService = {

    getUsuarios: async () => {
    try {
      const response = await apiClient.get(`${API_URL}/api/usuario`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  },

  getUsuarioById: async (id) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/usuario/${parseInt(id)}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener el usuario por ID: ' + error.message);
    }
  },

  getTaskListByUserId: async (id) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/usuario/${id}/tasklist`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la lista de tareas del usuario:', error);
      throw error;
    }
  },

  deleteUsuario: async (id) => {
    try {
      const response = await apiClient.delete(`${API_URL}/api/usuario/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      throw error;
    }
  },

  createUsuario: async (usuario) => {
    try {
      const response = await apiClient.post(`${API_URL}/api/create-usuario`, usuario);
      return response.data;
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw error;
    }
  },
};

export default UsuarioService;
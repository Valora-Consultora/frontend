import apiClient from "./apiClient";

const API_URL = process.env.REACT_APP_API_URL; 

const TasadorService = {

    getTasadores: async () => {
    try {
      const response = await apiClient.get(`${API_URL}/api/usuario?roles=TASADOR`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener tasadores:', error);
      throw error;
    }
  },

  getTasadorById: async (id) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/tasador/${parseInt(id)}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener el tasador por ID: ' + error.message);
    }
  },


};

export default TasadorService;
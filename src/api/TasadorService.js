import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL; 

const TasadorService = {

    getTasadores: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tasadores`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener tasadores:', error);
      throw error;
    }
  },

  getTasadorById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/tasador/${parseInt(id)}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener el tasador por ID: ' + error.message);
    }
  },


};

export default TasadorService;
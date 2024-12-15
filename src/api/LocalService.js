import apiClient from "./apiClient";
import axios from 'axios';

const API_URL = 'https://valora-app-53efe0915b3a.herokuapp.com'; 

const LocalService = {

  createLocal: async (localData) => {
    try {
        const response = await axios.post(`${API_URL}/api/create-local`, localData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear local:', error);
        throw error;
    }
},
  updateLocal: async (id, localData) => {
    try {
        const response = await axios.put(`${API_URL}/api/update-local/${parseInt(id)}`, localData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar local:', error);
        throw error;
    }
  },

    getLocalByIdInspeccion: async (idInspeccion) => {
      try {
        const response = await axios.get(`${API_URL}/api/locales/${parseInt(idInspeccion)}`);
        return response.data;
      } catch (error) {
        console.error('Error al obtener locales:', error);
        throw error;
      }
    },

    deleteLocalById: async (idLocal) => {
      try {
        const response = await axios.delete(`${API_URL}/api/local/${parseInt(idLocal)}`);
        return response.data;
      } catch (error) {
        console.error('Error al eliminar el local:', error);
        throw error;
      }
    },
}

export default LocalService;

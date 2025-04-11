import apiClient from "./apiClient";

const API_URL = process.env.REACT_APP_API_URL; 

const LocalService = {

  createLocal: async (localData) => {
    try {
        const response = await apiClient.post(`${API_URL}/api/create-local`, localData, {
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
        const response = await apiClient.put(`${API_URL}/api/update-local/${parseInt(id)}`, localData, {
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
        const response = await apiClient.get(`${API_URL}/api/locales/${parseInt(idInspeccion)}`);
        return response.data;
      } catch (error) {
        console.error('Error al obtener locales:', error);
        throw error;
      }
    },

    deleteLocalById: async (idLocal) => {
      try {
        const response = await apiClient.delete(`${API_URL}/api/local/${parseInt(idLocal)}`);
        return response.data;
      } catch (error) {
        console.error('Error al eliminar el local:', error);
        throw error;
      }
    },
}

export default LocalService;

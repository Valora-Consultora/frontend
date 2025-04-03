import apiClient from "./apiClient";

const API_URL = process.env.REACT_APP_API_URL;

const ItemObraCivilService = {

  createItemObraCivil: async (item, idInforme) => {
    try {
      const response = await apiClient.post(`${API_URL}/api/itemObraCivil/${idInforme}`, item, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear item de obra civil:", error);
      throw error;
    }
  },
  getItemsObraCivilByIdInforme: async (idInforme) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/obtenerItemsObraCivil/${parseInt(idInforme)}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener locales:', error);
      throw error;
    }
  },
  updateItemObraCivil: async (id, updatedFields) => {
    try {
      console.log('updatedFields ', updatedFields);
      const response = await apiClient.put(`${API_URL}/api/itemObraCivil/${id}`, updatedFields, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el item de obra civil:', error);
      throw error;
    }
  },


};

export default ItemObraCivilService;

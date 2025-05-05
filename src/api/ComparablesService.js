import apiClient from "./apiClient";

const API_URL = process.env.REACT_APP_API_URL;

const ComparablesService = {
  getComparables: async (params) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/comparables?${params}&limit=30`);
      // FIXME: BACKEND CAPAZ
      response.data.results.map((result) => {
        result.thumbnail = result.thumbnail.replace("I.jpg", "F.jpg");
        return result;
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener los comparables:", error);
      throw error;
    }
  },

  saveComparable: async (comparable) => {
    try {
      const response = await apiClient.post(`${API_URL}/api/comparables`, comparable, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al guardar el comparable:", error);
      throw error;
    }
  },

  uploadThumbnail: async (file, id) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await apiClient.post(`${API_URL}/api/comparables/${id}/thumbnail`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al subir la miniatura:", error);
      throw error;
    }
  }
};

export default ComparablesService;

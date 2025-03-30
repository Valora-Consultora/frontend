import apiClient from "./apiClient";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const InformeItauService = {
  updateInformeItau: async (id, informeItauData) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/informeItau/${id}`,
        informeItauData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error al actualizar informe:", error);
      throw error;
    }
  },

  uploadFoto: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${API_URL}/api/fotos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // Retorna la URL del archivo subido
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      throw error;
    }
  },

  createInformeItau: async (informeItauData) => {
    try {
      console.log("Creando informe Itau:", informeItauData);
      
      // Si hay comparables, filtrar solo los seleccionados
      if (informeItauData.comparables) {
        informeItauData.comparables = informeItauData.comparables.filter(
          (comparable) => comparable.selected
        );
      }
      
      const response = await axios.post(
        `${API_URL}/api/create-informe-itau`,
        informeItauData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      return response.data;
    } catch (error) {
      console.error("Error al crear el informe Itau:", error);
      throw error;
    }
  },

  saveCalculo: async (informeId, calculoData) => {
    try {
      // Verificar que el ID de informe es válido
      if (!informeId) {
        throw new Error("ID de informe no válido para guardar el cálculo");
      }

      // Clonar el objeto para evitar modificar el original
      const calculoToSend = JSON.parse(JSON.stringify(calculoData));
      
      console.log("Guardando cálculo para informe ID:", informeId);
      
      const response = await axios.post(
        `${API_URL}/api/informeItau/${informeId}/calculo`,
        calculoToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 30000 // 30 segundos
        }
      );
      
      return response.data;
    } catch (error) {
      console.error("Error al guardar el cálculo:", error);
      throw error;
    }
  },

  // Obtener el cálculo de un informe
  getCalculo: async (informeId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/informeItau/${informeId}/calculo`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener el cálculo:", error);
      return null;
    }
  },

  // Obtener las superficies del cálculo
  getSuperficiesCalculo: async (informeId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/informeItau/${informeId}/calculo/superficies`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener las superficies:", error);
      return [];
    }
  },
};

export default InformeItauService;
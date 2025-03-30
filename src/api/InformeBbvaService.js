import { combineSlices } from "@reduxjs/toolkit";
import apiClient from "./apiClient";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const InformeBbvaService = {
  updateInformeBbva: async (id, informeBbvaData) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/informeBbva/${id}`,
        informeBbvaData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //console.log("response " + response);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar informe:", error);
      throw error;
    }
  },

  uploadFirma: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${API_URL}/api/informeBbva/uploadFirma`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data; // Retorna la URL del archivo subido
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      throw error;
    }
  },

  uploadPlanos: async (id, formData) => {
    try {
      console.log("📤 Enviando imágenes al backend con ID:", id);
      formData.forEach((file) => console.log("Archivo enviado:", file.name)); // 🔥 DEBUG

      const response = await axios.post(
        `${API_URL}/api/informeBbva/${id}/uploadPlanos`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("✅ Respuesta del servidor:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al subir imágenes:", error);
      throw error;
    }
  },

  uploadFotos: async (id, formData) => {
    try {
      console.log("📤 Enviando imágenes al backend con ID:", id);
      formData.forEach((file) => console.log("Archivo enviado:", file.name)); // 🔥 DEBUG

      const response = await axios.post(
        `${API_URL}/api/informeBbva/${id}/uploadFotos`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("✅ Respuesta del servidor:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al subir imágenes:", error);
      throw error;
    }
  },

  getInformeById: async (idInforme) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/obtenerInformeBbva/${parseInt(idInforme)}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener locales:", error);
      throw error;
    }
  },

  deletePlano: async (id, imageUrl) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/informeBbva/${id}/deletePlano`,
        { params: { imageUrl } }
      );
      return response.data;
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      throw error;
    }
  },

  /*   getItemsObraCivilByIdInforme: async (idInforme) => {
    try {
      console.log('Llega al getItemsObraCivilByIdInforme ')
      console.log('idInforme ', idInforme)
      const response = await axios.get(`${API_URL}/api/obtenerItemsObraCivil/${parseInt(idInforme)}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener locales:', error);
      throw error;
    }
  }, */
  /* createInformeBbva: async (id,informeBbvaData) => {
    try {
      console.log("ingresa en el create de informeBbvaService");
      console.log("informeBbvaData", informeBbvaData);

      const response = await axios.post(
        `${API_URL}/api/create-informeBbva`,
        informeBbvaData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response " + response);

      return response.data;
    } catch (error) {
      console.error("Error al crear el informe Bbva:", error.data);
      throw error;
    }
  }, */

  /*  updateInspeccion: async (id, inspeccionData) => {
        try {

            console.log('ingresa en el update de inspeccionService');
            console.log('inspeccionData', inspeccionData);

            
            const response = await axios.put(`${API_URL}/api/inspecciones/${id}`, inspeccionData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('response ' + response)
            return response.data;
        } catch (error) {
            console.error('Error al actualizar inspeccion:', error);
            throw error;
        }
    },

    deleteInspeccion: async (id) => {
        try {
            console.log('Llega al deleteInspeccion ')
          const response = await axios.delete(`${API_URL}/api/inspeccion/${id}`);
          return response.data;
        } catch (error) {
          console.error("Error al eliminar la inspección:", error);
          return null;
        }
    }, */

  // Obtener el cálculo de un informe
  getCalculo: async (informeId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/informeBbva/${informeId}/calculo`
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
        `${API_URL}/api/informeBbva/${informeId}/calculo/superficies`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener las superficies:", error);
      return [];
    }
  },

  // Guardar el cálculo para un informe
  saveCalculo: async (informeId, calculoData) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/informeBbva/${informeId}/calculo`,
        calculoData
      );
      return response.data;
    } catch (error) {
      console.error("Error al guardar el cálculo:", error);
      throw error;
    }
  },
};

export default InformeBbvaService;

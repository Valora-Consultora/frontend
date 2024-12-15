import { combineSlices } from "@reduxjs/toolkit";
import apiClient from "./apiClient";
import axios from "axios";

const API_URL = "https://valora-app-53efe0915b3a.herokuapp.com";

const InformeScotiaService = {
  updateInformeScotia: async (id, informeScotiaData) => {
    try {
      console.log("ingresa en el update de InformeScotiaService");
      console.log("id ", id);
      console.log("informeScotiaData ", informeScotiaData);

      const response = await axios.put(
        `${API_URL}/api/informeScotia/${id}`,
        informeScotiaData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response " + response);
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

      const response = await axios.post(
        `${API_URL}/api/fotos`,
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

  createInformeScotia: async (id, informeScotiaData) => {
    try {
      console.log("ingresa en el create de InformeScotiaService");
      console.log("informeScotiaData", informeScotiaData);

      async function obtenerDatosFotoRelevamiento(foto) {
        const url = await InformeScotiaService.uploadFoto(foto);
        return {
          url: url,
          categoria: "Relevamiento",
        };
      }

      async function obtenerDatosFotoAnexo(foto) {
        const url = await InformeScotiaService.uploadFoto(foto);
        return {
          url: url,
          categoria: "Anexo",
        };
      }

      // Pasamos las fotos al formato correcto
      // Usar Promise.all
      const relevamientos = await Promise.all(
        informeScotiaData.fotos.map((foto) => obtenerDatosFotoRelevamiento(foto))
      );

      const anexos = await Promise.all(
        informeScotiaData.anexos.map((foto) => obtenerDatosFotoAnexo(foto)) 
      );

      informeScotiaData.fotos = relevamientos;
      informeScotiaData.anexos = anexos;

      const response = await axios.post(
        `${API_URL}/api/create-informe-scotia`,
        informeScotiaData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response " + response);

      return response.data;
    } catch (error) {
      console.error("Error al crear el informe Scotia:", error.data);
      throw error;
    }
  },

  getComparables: async (params) => {
    try {
      const response = await axios.get(`https://api.mercadolibre.com/sites/MLU/search?category=MLU1459&OPERATION=242075&${params}&limit=25`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los comparables:", error);
      throw error;
    }
  }

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
};

export default InformeScotiaService;

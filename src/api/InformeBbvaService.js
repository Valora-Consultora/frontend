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
  getInformeById: async (idInforme) => {
    try {
      const response = await axios.get(`${API_URL}/api/obtenerInformeBbva/${parseInt(idInforme)}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener locales:', error);
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
};

export default InformeBbvaService;

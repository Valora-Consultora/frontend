import { combineSlices } from "@reduxjs/toolkit";
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
      console.log("Ingreso a crear informe ITAU", informeItauData);

      informeItauData.ascensores = informeItauData.ascensores === "Si";
      informeItauData.servicioVigilancia = informeItauData.servicioVigilancia === "Si";

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
};

export default InformeItauService;

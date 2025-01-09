import { combineSlices } from "@reduxjs/toolkit";
import apiClient from "./apiClient";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const InformeHsbcService = {
  updateInformeHsbc: async (id, informeHsbcData) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/informeHsbc/${id}`,
        informeHsbcData,
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

  createInformeHsbc: async (informeHsbcData) => {
    try {
      console.log('Ingreso a crear informe HSBC', informeHsbcData);

      informeHsbcData.comparables = informeHsbcData.comparables.filter((comparable) => comparable.selected);

      const response = await axios.post(
        `${API_URL}/api/create-informe-Hsbc`,
        informeHsbcData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error al crear el informe Hsbc:", error.data);
      throw error;
    }
  },
};

export default InformeHsbcService;

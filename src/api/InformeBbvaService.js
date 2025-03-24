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
      const response = await axios.get(
        `${API_URL}/api/obtenerInformeBbva/${parseInt(idInforme)}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener locales:", error);
      throw error;
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

  /* saveCalculo: async (informeId, calculoData) => {
    try {
      // Verificar que tenemos un ID válido
      if (!informeId || informeId === "undefined") {
        console.error("ID de informe no válido:", informeId);
        throw new Error("ID de informe no válido para guardar el cálculo");
      }

      // Clonar el objeto para evitar modificar el original
      const calculoToSend = JSON.parse(JSON.stringify(calculoData));

      // Asegurarse de que las superficies estén en el formato correcto
      if (
        calculoToSend.superficies &&
        Array.isArray(calculoToSend.superficies)
      ) {
        // Eliminar cualquier referencia circular o innecesaria
        calculoToSend.superficies = calculoToSend.superficies.map(
          (superficie) => ({
            descripcion: superficie.descripcion,
            m2: parseFloat(superficie.m2) || 0,
            ampliaciones: superficie.ampliaciones || "",
            promedioEdad: parseFloat(superficie.promedioEdad) || 0,
            factorEdad: parseFloat(superficie.factorEdad) || 0,
            conservacion: superficie.conservacion || "",
            factorConservacion: parseFloat(superficie.factorConservacion) || 0,
            precioMetro: parseFloat(superficie.precioMetro) || 0,
            precioMetroCorregido:
              parseFloat(superficie.precioMetroCorregido) || 0,
            valorTotal: parseFloat(superficie.valorTotal) || 0,
            valorTotalSinCorregir:
              parseFloat(superficie.valorTotalSinCorregir) || 0,
          })
        );
      }

      console.log("Enviando cálculo:", JSON.stringify(calculoToSend, null, 2));

      const response = await axios.post(`${API_URL}/api/informeBbva/${informeId}/calculo`,
        calculoToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 30000, // 30 segundos
        }
      );

      console.log("Respuesta del servidor:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al guardar el cálculo:", error);

      if (error.response) {
        console.error(
          "Detalles del error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor");
      } else {
        console.error("Error al configurar la solicitud:", error.message);
      }

      throw error;
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

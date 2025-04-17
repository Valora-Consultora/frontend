import { combineSlices } from "@reduxjs/toolkit";
import apiClient from "./apiClient";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const InformeScotiaService = {
  updateInformeScotia: async (id, informeScotiaData) => {
    try {
      //console.log("ingresa en el update de InformeScotiaService");
      //console.log("id ", id);
      //console.log("informeScotiaData ", informeScotiaData);

      const response = await axios.put(
        `${API_URL}/api/informeScotia/${id}`,
        informeScotiaData,
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

  createInformeScotia: async (id, informeScotiaData) => {
    try {
      //console.log("ingresa en el create de InformeScotiaService");
      informeScotiaData.id = id;

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
        informeScotiaData.fotos.map((foto) =>
          obtenerDatosFotoRelevamiento(foto)
        )
      );

      const anexos = await Promise.all(
        informeScotiaData.anexos.map((foto) => obtenerDatosFotoAnexo(foto))
      );

      informeScotiaData.fotos = relevamientos;
      informeScotiaData.anexos = anexos;
      //debugger

      const normalizedComparables = informeScotiaData.comparables.map(
        (comparable) => {
          const normalizedComparable = { ...comparable };
          if (comparable.id.id) {
            normalizedComparable.id = comparable.id.id;
          }
          return normalizedComparable;
        }
      );

      informeScotiaData.comparables = normalizedComparables;

      //console.log("informeScotiaData", informeScotiaData);

      const response = await axios.post(
        `${API_URL}/api/create-informe-scotia`,
        informeScotiaData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //console.log("response " + response);

      return response.data;
    } catch (error) {
      console.error("Error al crear el informe Scotia:", error.data);
      throw error;
    }
  },

  /*  updateInspeccion: async (id, inspeccionData) => {
        try {

            //console.log('ingresa en el update de inspeccionService');
            //console.log('inspeccionData', inspeccionData);

            
            const response = await axios.put(`${API_URL}/api/inspecciones/${id}`, inspeccionData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            //console.log('response ' + response)
            return response.data;
        } catch (error) {
            console.error('Error al actualizar inspeccion:', error);
            throw error;
        }
    },

    deleteInspeccion: async (id) => {
        try {
            //console.log('Llega al deleteInspeccion ')
          const response = await axios.delete(`${API_URL}/api/inspeccion/${id}`);
          return response.data;
        } catch (error) {
          console.error("Error al eliminar la inspección:", error);
          return null;
        }
    }, */

  // Añadir estos métodos a InformeScotiaService.js

  // Guardar el cálculo para un informe
  saveCalculo: async (informeId, calculoData) => {
    try {
      // Clonar el objeto para evitar modificar el original
      const calculoToSend = JSON.parse(JSON.stringify(calculoData));
      
      // Asegurarse de que las superficies estén en el formato correcto
      if (calculoToSend.superficies && Array.isArray(calculoToSend.superficies)) {
        // Eliminar cualquier referencia circular o innecesaria
        calculoToSend.superficies = calculoToSend.superficies.map(superficie => ({
          descripcion: superficie.descripcion,
          m2: parseFloat(superficie.m2) || 0,
          ampliaciones: superficie.ampliaciones || '',
          promedioEdad: parseFloat(superficie.promedioEdad) || 0,
          factorEdad: parseFloat(superficie.factorEdad) || 0,
          conservacion: superficie.conservacion || '',
          factorConservacion: parseFloat(superficie.factorConservacion) || 0,
          precioMetro: parseFloat(superficie.precioMetro) || 0,
          precioMetroCorregido: parseFloat(superficie.precioMetroCorregido) || 0,
          valorTotal: parseFloat(superficie.valorTotal) || 0,
          valorTotalSinCorregir: parseFloat(superficie.valorTotalSinCorregir) || 0
          // No incluir 'calculo' aquí, se establecerá en el backend
        }));
      }
      
      //console.log("Enviando cálculo:", JSON.stringify(calculoToSend, null, 2));
      
      const response = await axios.post(
        `${API_URL}/api/informeScotia/${informeId}/calculo`,
        calculoToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 30000 // 30 segundos
        }
      );
      
      //console.log("Respuesta del servidor:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al guardar el cálculo:", error);
      
      if (error.response) {
        console.error("Detalles del error:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor");
      } else {
        console.error("Error al configurar la solicitud:", error.message);
      }
      
      throw error;
    }
  },

  // Obtener el cálculo de un informe
  getCalculo: async (informeId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/informeScotia/${informeId}/calculo`
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
        `${API_URL}/api/informeScotia/${informeId}/calculo/superficies`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener las superficies:", error);
      return [];
    }
  },
};

export default InformeScotiaService;

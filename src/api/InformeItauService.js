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
      //console.log("Ingreso a crear informe ITAU", informeItauData);
  
      // Crear una copia para no modificar el original
      const informeData = { ...informeItauData };
      
      // Asegurarse que estos campos estén correctos
      informeData.Ascensores = informeData.ascensores === "Si";
      informeData.servicioVigilancia = informeData.servicioVigilancia === "Si";
      
      // Mapear los campos críticos de habitaciones residenciales
      informeData.CantidadAmbientesResidenciaCochera = informeData.cocheras || 0;
      informeData.CantidadAmbientesResidenciaEstar = informeData.estares || 0;
      informeData.CantidadAmbientesResidenciaBanos = informeData.banios || 0;
      informeData.CantidadAmbientesResidenciaDormitorios = informeData.dormitorios || 0;
      informeData.CantidadAmbientesResidenciaPatioInternos = informeData.patiosInternos || 0;
      informeData.CantidadAmbientesResidenciaDeposito = informeData.depositos || 0;
      informeData.CantidadAmbientesResidenciaLavadero = informeData.lavaderos || 0;
      informeData.CantidadAmbientesResidenciaBarbacoa = informeData.barbacoas || 0;
      informeData.CantidadAmbientesResidenciaFondo = informeData.fondos || 0;
      
      // Asegurarse que el banco esté configurado
      informeData.banco = "Itau";
      
      // Si hay comparables, filtrar solo los seleccionados
      if (informeData.comparables) {
        informeData.comparables = informeData.comparables.filter(
          (comparable) => comparable.selected
        );
      }
  
      //console.log("Datos a enviar:", JSON.stringify(informeData, null, 2));
  
      const response = await axios.post(
        `${API_URL}/api/create-informe-itau`,
        informeData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error("Error al crear el informe Itau:", error);
      
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.status, error.response.data);
      }
      
      throw error;
    }
  },

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
        }));
      }
      
      //console.log("Enviando cálculo:", JSON.stringify(calculoToSend, null, 2));
      
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
  }
};

export default InformeItauService;

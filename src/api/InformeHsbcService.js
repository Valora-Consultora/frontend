import apiClient from "./apiClient";

const API_URL = process.env.REACT_APP_API_URL;

const InformeHsbcService = {
  updateInformeHsbc: async (id, informeHsbcData) => {
    try {
      const response = await apiClient.put(
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

      const response = await apiClient.post(`${API_URL}/api/fotos`, formData, {
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

  createInformeHsbc: async (informeHsbcData) => {
    try {
      console.log("Ingreso a crear informe HSBC", informeHsbcData);

      // Si hay comparables, filtrar solo los seleccionados
      if (informeHsbcData.comparables) {
        informeHsbcData.comparables = informeHsbcData.comparables.filter(
          (comparable) => comparable.selected
        );
      }

      // Procesar fotos y anexos si existen
      async function obtenerDatosFotoRelevamiento(foto) {
        const url = await InformeHsbcService.uploadFoto(foto);
        return {
          url: url,
          categoria: "Relevamiento",
        };
      }

      async function obtenerDatosFotoAnexo(foto) {
        const url = await InformeHsbcService.uploadFoto(foto);
        return {
          url: url,
          categoria: "Anexo",
        };
      }

      // Procesar fotos y anexos si existen
      let fotosPromises = [];
      let anexosPromises = [];

      if (informeHsbcData.fotos && informeHsbcData.fotos.length > 0) {
        fotosPromises = informeHsbcData.fotos.map((foto) =>
          obtenerDatosFotoRelevamiento(foto)
        );
      }

      if (informeHsbcData.anexos && informeHsbcData.anexos.length > 0) {
        anexosPromises = informeHsbcData.anexos.map((foto) =>
          obtenerDatosFotoAnexo(foto)
        );
      }

      const [relevamientos, anexos] = await Promise.all([
        Promise.all(fotosPromises),
        Promise.all(anexosPromises),
      ]);

      informeHsbcData.fotos = relevamientos;
      informeHsbcData.anexos = anexos;

      const response = await apiClient.post(
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
      console.error("Error al crear el informe Hsbc:", error);
      throw error;
    }
  },

  /* createInformeHsbc ORIGINAL
  
  createInformeHsbc: async (informeHsbcData) => {
    try {
      console.log("Ingreso a crear informe HSBC", informeHsbcData);

      informeHsbcData.comparables = informeHsbcData.comparables.filter(
        (comparable) => comparable.selected
      );

      const response = await apiClient.post(
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
  }, */

  // Guardar el cálculo para un informe
  // Guardar el cálculo para un informe
  saveCalculo: async (informeId, calculoData) => {
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

      const response = await apiClient.post(
        `${API_URL}/api/informeHsbc/${informeId}/calculo`,
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
  },

  // Obtener el cálculo de un informe
  getCalculo: async (informeId) => {
    try {
      const response = await apiClient.get(
        `${API_URL}/api/informeHsbc/${informeId}/calculo`
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
      const response = await apiClient.get(
        `${API_URL}/api/informeHsbc/${informeId}/calculo/superficies`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener las superficies:", error);
      return [];
    }
  },
};

export default InformeHsbcService;

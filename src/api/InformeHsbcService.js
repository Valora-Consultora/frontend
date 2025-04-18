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
      //console.log(
/*         "InformeHsbcService - Iniciando creación de informe HSBC",
        JSON.stringify(informeHsbcData, null, 2)
      ); */

      // Si hay comparables, filtrar solo los seleccionados
      if (informeHsbcData.comparables) {
        //console.log("InformeHsbcService - Filtrando comparables seleccionados");
        informeHsbcData.comparables = informeHsbcData.comparables.filter(
          (comparable) => comparable.selected
        );
/*         //console.log(
          "InformeHsbcService - Comparables después del filtrado:",
          informeHsbcData.comparables.length
        ); */
      }

      // Procesar fotos y anexos si existen
      async function obtenerDatosFotoRelevamiento(foto) {
        //console.log("InformeHsbcService - Procesando foto de relevamiento");
        const url = await InformeHsbcService.uploadFoto(foto);
        return {
          url: url,
          categoria: "Relevamiento",
        };
      }

      async function obtenerDatosFotoAnexo(foto) {
        //console.log("InformeHsbcService - Procesando foto de anexo");
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
        //console.log(
/*           "InformeHsbcService - Procesando array de fotos:",
          informeHsbcData.fotos.length
        ); */
        fotosPromises = informeHsbcData.fotos.map((foto) =>
          obtenerDatosFotoRelevamiento(foto)
        );
      }

      if (informeHsbcData.anexos && informeHsbcData.anexos.length > 0) {
        //console.log(
/*           "InformeHsbcService - Procesando array de anexos:",
          informeHsbcData.anexos.length
        ); */
        anexosPromises = informeHsbcData.anexos.map((foto) =>
          obtenerDatosFotoAnexo(foto)
        );
      }

      //console.log("InformeHsbcService - Esperando resultados de uploads");
      const [relevamientos, anexos] = await Promise.all([
        Promise.all(fotosPromises),
        Promise.all(anexosPromises),
      ]);

      informeHsbcData.fotos = relevamientos;
      informeHsbcData.anexos = anexos;

      //console.log(
/*         "InformeHsbcService - Enviando datos al backend",
        JSON.stringify(informeHsbcData, null, 2)
      ); */

      const response = await apiClient.post(
        `${API_URL}/api/create-informe-Hsbc`,
        informeHsbcData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //console.log("InformeHsbcService - Respuesta recibida:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "InformeHsbcService - Error al crear el informe Hsbc:",
        error
      );
      if (error.response) {
        console.error(
          "InformeHsbcService - Respuesta de error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("InformeHsbcService - No se recibió respuesta");
      } else {
        console.error("InformeHsbcService - Error:", error.message);
      }
      throw error;
    }
  },

  /* createInformeHsbc ORIGINAL
  
  createInformeHsbc: async (informeHsbcData) => {
    try {
      //console.log("Ingreso a crear informe HSBC", informeHsbcData);

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

  // Modificaciones a InformeHsbcService.js para usar el nuevo endpoint

  saveCalculo: async (informeId, calculoData) => {
    try {
      // Verificar que el ID de informe es válido
      if (!informeId || informeId === "undefined") {
        console.error("ID de informe no válido:", informeId);
        throw new Error("ID de informe no válido para guardar el cálculo");
      }

      //console.log("Iniciando saveCalculo con informeId:", informeId);

      // Clonar el objeto para evitar modificar el original
      const calculoToSend = JSON.parse(JSON.stringify(calculoData));

      // Verificar que tipoPropiedad tiene un valor permitido
      const tiposPermitidos = ["PH", "CASA", "TERRENO", "DEPARTAMENTO"];
      if (!tiposPermitidos.includes(calculoToSend.tipoPropiedad)) {
        console.warn(
          `Tipo de propiedad '${calculoToSend.tipoPropiedad}' no válido, se usará 'CASA' por defecto`
        );
        calculoToSend.tipoPropiedad = "CASA";
      }

      // Función para asegurar que los valores sean números
      const asegurarNumero = (valor) => {
        if (valor === null || valor === undefined || valor === "") return 0;
        if (valor === "G") return 0; // Convierte 'G' a 0 para evitar problemas
        const num = parseFloat(valor);
        return isNaN(num) ? 0 : num;
      };

      // Aplicar conversión numérica a campos principales
      calculoToSend.superficieTerreno = asegurarNumero(
        calculoToSend.superficieTerreno
      );
      calculoToSend.valorMetroTerreno = asegurarNumero(
        calculoToSend.valorMetroTerreno
      );
      calculoToSend.valorTerreno = asegurarNumero(calculoToSend.valorTerreno);
      calculoToSend.valorMercado = asegurarNumero(calculoToSend.valorMercado);
      calculoToSend.valorVentaRapida = asegurarNumero(
        calculoToSend.valorVentaRapida
      );
      calculoToSend.valorRemate = asegurarNumero(calculoToSend.valorRemate);
      calculoToSend.costoReposicion = asegurarNumero(
        calculoToSend.costoReposicion
      );
      calculoToSend.valorIntrinseco = asegurarNumero(
        calculoToSend.valorIntrinseco
      );
      calculoToSend.valorMercadoMetroCuadrado = asegurarNumero(
        calculoToSend.valorMercadoMetroCuadrado
      );
      calculoToSend.valorVentaRapidaMetroCuadrado = asegurarNumero(
        calculoToSend.valorVentaRapidaMetroCuadrado
      );
      calculoToSend.valorRemateMetroCuadrado = asegurarNumero(
        calculoToSend.valorRemateMetroCuadrado
      );
      calculoToSend.costoReposicionMetroCuadrado = asegurarNumero(
        calculoToSend.costoReposicionMetroCuadrado
      );
      calculoToSend.superficieConstruidaTotal = asegurarNumero(
        calculoToSend.superficieConstruidaTotal
      );
      calculoToSend.factorConservacion = asegurarNumero(
        calculoToSend.factorConservacion
      );

      // Si es PH, asegurar los campos específicos
      if (calculoToSend.tipoPropiedad === "PH") {
        calculoToSend.totalSuperficieEdificio = asegurarNumero(
          calculoToSend.totalSuperficieEdificio
        );
        calculoToSend.cuotaPartePorcentaje = asegurarNumero(
          calculoToSend.cuotaPartePorcentaje
        );
        calculoToSend.cuotaParteValor = asegurarNumero(
          calculoToSend.cuotaParteValor
        );
      }

      // Asegurarse de que las superficies estén en el formato correcto
      if (
        calculoToSend.superficies &&
        Array.isArray(calculoToSend.superficies)
      ) {
        //console.log(
/*           "Procesando array de superficies:",
          calculoToSend.superficies.length
        );
 */
        // Procesar cada superficie para asegurar tipos de datos correctos
        calculoToSend.superficies = calculoToSend.superficies.map(
          (superficie) => {
            // Asegurarse de que tipoSuperficie sea válido
            const tipoSuperficieValido =
              superficie.tipoSuperficie === "propio" ||
              superficie.tipoSuperficie === "comun" ||
              superficie.tipoSuperficie === "comun_exclusivo"
                ? superficie.tipoSuperficie
                : "propio";

            // Tratar valores especiales como 'G'
            const m2Value =
              superficie.m2 === "G" ? 0 : asegurarNumero(superficie.m2);
            const precioMetroValue =
              superficie.precioMetro === "G"
                ? 0
                : asegurarNumero(superficie.precioMetro);
            const precioMetroCorregidoValue =
              superficie.precioMetroCorregido === "G"
                ? 0
                : asegurarNumero(superficie.precioMetroCorregido);

            // Construir objeto de superficie limpio
            return {
              descripcion: superficie.descripcion || "",
              m2: m2Value,
              ampliaciones: superficie.ampliaciones || "",
              promedioEdad: asegurarNumero(superficie.promedioEdad),
              factorEdad: asegurarNumero(superficie.factorEdad),
              conservacion: superficie.conservacion || "",
              factorConservacion: asegurarNumero(superficie.factorConservacion),
              precioMetro: precioMetroValue,
              precioMetroCorregido: precioMetroCorregidoValue,
              valorTotal: asegurarNumero(superficie.valorTotal),
              valorTotalSinCorregir: asegurarNumero(
                superficie.valorTotalSinCorregir
              ),
              tipoSuperficie: tipoSuperficieValido,
            };
          }
        );
      }

      //console.log("Enviando cálculo a nuevo endpoint:", informeId);

      // Usar el nuevo endpoint con nuestro nuevo CalculoHsbcController
      const response = await apiClient.post(
        `${API_URL}/api/calculos/hsbc/informe/${informeId}`,
        calculoToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 30000, // 30 segundos
        }
      );

      //console.log("Respuesta del servidor:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al guardar el cálculo:", error);

      // Intentar con el endpoint antiguo si el nuevo falla
      try {
        //console.log("Intentando con endpoint antiguo...");
        const calculoToSend = JSON.parse(JSON.stringify(calculoData));
        // Asegurarnos de que tipoPropiedad siga siendo válido
        calculoToSend.tipoPropiedad = "CASA";

        const response = await axios.post(
          `${API_URL}/api/informeHsbc/${informeId}/calculo`,
          calculoToSend,
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 30000,
          }
        );

        //console.log(
/*           "Respuesta del servidor (endpoint antiguo):",
          response.data
        ); */
        return response.data;
      } catch (secondError) {
        console.error("Error también con el endpoint antiguo:", secondError);

        if (error.response) {
          console.error(
            "Detalles del error original:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor");
        } else {
          console.error("Error al configurar la solicitud:", error.message);
        }

        throw error; // Lanzar el error original
      }
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

import apiClient from "./apiClient";

const obtenerInformes = async () => {
  try {
    const response = await apiClient.get("/api/informe");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los informes:", error);
    throw error;
  }
};

export default { obtenerInformes };

import apiClient from "./apiClient";

const API_URL = process.env.REACT_APP_API_URL; 

const OrderService = {
  getOrdenById: async (id) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/orden/${parseInt(id)}`);
      return response.data;
      } catch (error) {
        console.error('Error al obtener orden por ID:', error);
        throw error;
      }
  },

  getLocalidadesByDepartamentoId: async (id) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/departamento/localidades/${parseInt(id)}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener localidades por departamento ID:', error);
      throw error;
    }
  },

  getLocalidadById: async (id) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/localidad/${parseInt(id)}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener localidad por ID:', error);
      throw error;
    }
  },

  createOrden: async (ordenData) => {
    try {
      //console.log('llega al create orden ')
      //console.log('ordenData ', ordenData)
      const response = await apiClient.post(`${API_URL}/api/create-orden`, ordenData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
/*       const response = await apiClient.post(`${API_URL}/api/create-orden`, ordenData);
 */      return response.data;
    } catch (error) {
      console.error('Error al crear orden:', error);
      throw error;
    }
  },

  getOrdenesByTasadorId: async (id) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/orden/tasador/${parseInt(id)}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener ordenes por tasador ID:', error);
      throw error;
    }
  },

  getAllOrdenes: async () => {
    try {
      const response = await apiClient.get(`${API_URL}/api/orden`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener todas las ordenes', error);
      throw error;
    }
  },

  getTasadores: async () => {
    try {
      const response = await apiClient.get(`${API_URL}/api/usuario?roles=TASADOR,ADMINISTRADOR`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener tasadores:', error);
      throw error;
    }
  },

  getTasadorById: async (id) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/tasador/${parseInt(id)}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener el tasador por ID: ' + error.message);
    }
  },

  getBancoById: async (id) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/banco/${parseInt(id)}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener bancos:', error);
      throw error;
    }
  },

  getBancos: async () => {
    try {
      const response = await apiClient.get(`${API_URL}/api/bancos`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener bancos:', error);
      throw error;
    }
  },

  getDepartamentoById: async (id) => {
    try {
      const response = await apiClient.get(`${API_URL}/api/departamento/${parseInt(id)}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener departamento:', error);
      throw error;
    }
  },

  getDepartamentos: async () => {
    try {
      const response = await apiClient.get(`${API_URL}/api/departamento`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener departamentos:', error);
      throw error;
    }
  },


};

export default OrderService;
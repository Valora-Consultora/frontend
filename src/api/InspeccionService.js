import apiClient from "./apiClient";

const API_URL = process.env.REACT_APP_API_URL; 

const InspeccionService = {

    createInspeccion: async (inspeccionData) => {
      try {
          console.log('ingresa en el create de inspeccionService');
          console.log('inspeccionData', inspeccionData);

          const response = await apiClient.post(`${API_URL}/api/create-inspeccion`, inspeccionData, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          return response.data;
      } catch (error) {
          console.error('Error al crear inspeccion:', error.data);
          throw error;
      }
  },

    updateInspeccion: async (id, inspeccionData) => {
        try {

            console.log('ingresa en el update de inspeccionService');
            console.log('id ', id);
            console.log('inspeccionData ', inspeccionData);

            
            const response = await apiClient.put(`${API_URL}/api/inspecciones/${id}`, inspeccionData, {
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
          const response = await apiClient.delete(`${API_URL}/api/inspeccion/${id}`);
          return response.data;
        } catch (error) {
          console.error("Error al eliminar la inspección:", error);
          return null;
        }
    },


}

export default InspeccionService;
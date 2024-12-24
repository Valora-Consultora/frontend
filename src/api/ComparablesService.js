import axios from "axios";

const ComparablesService = {
  getComparables: async (params) => {
    try {
      const response = await axios.get(`https://api.mercadolibre.com/sites/MLU/search?category=MLU1459&OPERATION=242075&${params}&limit=25`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los comparables:", error);
      throw error;
    }
  }
};

export default ComparablesService;

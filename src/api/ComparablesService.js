import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ComparablesService = {
  getComparables: async (params) => {
    try {
      const response = await axios.get(`https://api.mercadolibre.com/sites/MLU/search?category=MLU1459&OPERATION=242075&${params}&limit=30`);
      response.data.results.map((result) => {
        result.thumbnail = result.thumbnail.replace("I.jpg", "F.jpg");
        return result;
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener los comparables:", error);
      throw error;
    }
  },

  saveComparable: async (comparable) => {
    try {
      const response = await axios.post(`${API_URL}/api/comparables`, comparable, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al guardar el comparable:", error);
      throw error;
    }
  },
};

export default ComparablesService;

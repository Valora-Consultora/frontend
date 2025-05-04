import apiClient from "./apiClient";

const LoginService = {
  login: async (loginReq) => {
    try {
      const response = await apiClient.post("/api/login", loginReq, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  },

  verifyRegisteredEmail: async (email) => {
    console.log('email', email);
    try {
      const response = await apiClient.get(`/api/verify-email/${email}`);
      return response.data;
    } catch (error) {
      console.error("Error al verificar el correo electrónico:", error);
      throw error;
    }
  }
}

export default LoginService;

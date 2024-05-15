import apiClient from "./apiClient";

const LoginService = async (loginReq) => {
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
};

export default LoginService;

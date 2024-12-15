import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://valora-app-53efe0915b3a.herokuapp.com",
    headers: {
        "Content-Type": "application/json",
    },
    });

export default apiClient;
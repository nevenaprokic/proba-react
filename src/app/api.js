import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8082",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    let token = null;
    try {
      token = localStorage.getItem("user");
      
    } catch (e) { }
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log(config.headers);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
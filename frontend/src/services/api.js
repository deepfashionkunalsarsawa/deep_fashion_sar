import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// 🔐 Handle expired/invalid token
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");

      const ADMIN_PATH = import.meta.env.VITE_ADMIN_SECRET_PATH;
      window.location.href = `/${ADMIN_PATH}/login`;
    }
    return Promise.reject(error);
  }
);

export default API;
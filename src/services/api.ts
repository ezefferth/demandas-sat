import axios from "axios";

const API_BASE =
  window.location.hostname.includes("10.21.39.75")
    ? "http://10.21.39.75:4001"
    : "/api";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
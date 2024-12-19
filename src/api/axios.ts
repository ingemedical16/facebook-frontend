import axios from "axios";

const API_URL =
  process.env.BACKEND_URL || "https://facebook-backend-8n2p.onrender.com/api";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

import axios from "axios";

const API_URL = process.env.BACKEND_URL || "http://localhost:8000/api";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
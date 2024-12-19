import axios from "axios";

const API_URL =
  process.env.BACKEND_URL || "https://facebook-backend-2f6a.onrender.com/api";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

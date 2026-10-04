import axios from "axios";

export const API = axios.create({
  baseURL: "https://nextcart-backend-kxc0.onrender.com/api",
  withCredentials: true, // apna backend base URL daal do
});

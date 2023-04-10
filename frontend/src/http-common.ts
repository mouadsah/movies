import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    'Accept'        : 'application/json',
    'Content-Type'  : 'application/json'
  },
});

export default apiClient;

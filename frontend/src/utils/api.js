import axios from "axios";

const api = axios.create({
  baseURL: "https://expense-tracker-bend-1q77.onrender.com/api/v1", // Update this to your backend URL
});

export default api;

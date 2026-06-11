import axios from "axios";

const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const api = axios.create({
  baseURL: isLocalhost
    ? "http://localhost:5000/api/v1" // Local Machine Backend
    : "https://expense-tracker-bend-1q77.onrender.com/api/v1", // Render Live Backend
});

export default api;

import axios from "axios";

const URL = process.env.API_URL || "http://localhost:8000";
const api = axios.create({
  baseURL: URL,
});

export { api };

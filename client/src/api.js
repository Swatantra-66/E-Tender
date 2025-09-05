import axios from 'axios';

// Use environment variable from Vercel, fallback to localhost for local dev
const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"
});

export default API;

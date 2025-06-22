// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vehicle-flowapi.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;

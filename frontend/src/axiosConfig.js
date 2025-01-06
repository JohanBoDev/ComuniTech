import axios from 'axios';

const api = axios.create({
  baseURL: 'https://comunitech.onrender.com/api', // Cambia esto según tu backend
});

export default api;

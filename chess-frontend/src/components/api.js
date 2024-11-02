import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser  = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username, password });
  return response.data;
};

export const createGame = async () => {
  const response = await axios.post(`${API_URL}/games`);
  return response.data;
};

export const getGame = async (id) => {
  const response = await axios.get(`${API_URL}/games/${id}`);
  return response.data;
};

export const updateGame = async (id, fen, history) => {
  const response = await axios.put(`${API_URL}/games/${id}`, { fen, history });
  return response.data;
};

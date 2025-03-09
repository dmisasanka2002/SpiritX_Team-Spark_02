import axios from "axios";

const API_URL = "http://localhost:5002/api/auth";

export const signup = async (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};

export const login = async (credentials) => {
  try {
    // Send the credentials to the backend
    const response = await axios.post(`${API_URL}/login`, credentials, { withCredentials: true });

    // The token is automatically handled in the cookie, so no need to store it on the frontend
    return response;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
};

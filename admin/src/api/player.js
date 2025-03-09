import axios from "axios";
import Cookies from "js-cookie";

const API_URL = `${import.meta.env.VITE_API_URL}/players`;

export const fetchPlayers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
};

// export const addPlayer = async (playerData) => {
//   try {
//     const response = await axios.post(`${API_URL}/add`, playerData);
//     return response.data;
//   } catch (error) {
//     console.error("Error adding player:", error);
//     throw error;
//   }
// };

export const addPlayer = async (playerData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, playerData, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding player:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updatePlayer = async (id, playerData) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, playerData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating player:", error);
    throw error;
  }
};

export const deletePlayer = async (id) => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`, {
        withCredentials: true,
      });
  } catch (error) {
    console.error("Error deleting player:", error);
    throw error;
  }
};

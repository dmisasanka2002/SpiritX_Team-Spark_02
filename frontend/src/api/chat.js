import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL; // Adjust if needed

export const getChatResponse = async (userMessage) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, { userMessage });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Chat API Error:", error);
    return { message: "Something went wrong. Please try again later." };
  }
};

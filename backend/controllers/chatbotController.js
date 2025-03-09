import { fetchChatbotReply } from "../services/chatbotService.js";
import Player from '../models/playerModel.js';

export const getChatbotResponse = async (req, res) => {
  try {
    const { userMessage } = req.body;
    console.log(userMessage)

    const data = await getAllPlayers();
    console.log(typeof(data))
    const base64Data = Buffer.from(jsonData).toString('base64')

    const response = await fetchChatbotReply(userMessage, base64Data);
    res.json({ reply: response });
  } catch (error) {
    res.status(500).json({ error: "Error processing chatbot request" });
  }
};


const getAllPlayers = async () => {
  try {
    const players = await Player.find().lean();
    return players;
  } catch (error) {
    return ""
  }
}; 



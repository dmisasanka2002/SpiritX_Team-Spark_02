import { fetchChatbotReply } from "../services/chatbotService.js";

export const getChatbotResponse = async (req, res) => {
  try {
    const { userMessage } = req.body;
    const response = await fetchChatbotReply(userMessage);
    res.json({ reply: response });
  } catch (error) {
    res.status(500).json({ error: "Error processing chatbot request" });
  }
};

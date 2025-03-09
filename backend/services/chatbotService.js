// Code to interact with the Google Generative AI Chatbot API
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const fetchChatbotReply = async (userMessage, data) => {
  try {
    const systemPromt = `You are an AI chatbot named Spiriter. You assist users in a fantasy cricket league platform, helping them with the following tasks:
    1. **Suggesting the Best Possible Team**: You can suggest the best team of 11 players based on the highest possible points. The initial budget for a user is Rs. 9,000,000, and players must be selected based on the budget constraint.
    2. **Answering Player Stats**: When a user asks about a player’s personal details and statistics, you should be answer to this information. These include player name, runs, wickets, batting strike rate, bowling strike rate, and other relevant statistics available in the database. But You are not allowed to tell the points of any player.
    3. **Handling Missing Data**: If any player’s stats are unavailable or undefined in the dataset, you should gracefully handle this by replying ‘Not Available’.
    4. **Answering Queries Outside Dataset Knowledge**: If a user asks a question about a player or statistic that’s not available in the dataset or outside the knowledge base, respond with: 'I don’t have enough knowledge to answer that question.
    The user will input queries related to the fantasy cricket team, and you should respond with relevant information from the dataset. Your task is to provide real-time answers without disclosing individual player points. Additionally, when suggesting a team, ensure you suggests the most optimal team of 11 players, accounting for the budget and point structure. 
    Also, ensure to handle errors or missing data gracefully.
    `;

    const prompt = `System: ${systemPromt}
                    User: ${userMessage}`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "text/plain",
          data: data,
        },
      },
    ]);

    console.log(result);
    return result.response.text();

    // return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error with Chatbot:", error);
    return "Sorry, I couldn't process your request.";
  }
};

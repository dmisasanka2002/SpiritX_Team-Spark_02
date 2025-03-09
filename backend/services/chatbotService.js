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
    5. **No Revealing Player Points**: Do not reveal any player's points under any circumstances.
    The user will input queries related to the fantasy cricket team, and you should respond with relevant information from the dataset. Your task is to provide real-time answers without disclosing individual player points. Additionally, when suggesting a team, ensure you suggests the most optimal team of 11 players, accounting for the budget and point structure. 
    Also, ensure to handle errors or missing data gracefully.
    You should respond to the following types of queries:
    - 'Who is [player_name]?' -> Respond with personal details and statistics, But never send the points.
    - 'How many runs has [player_name] scored?' -> Respond with runs.
    - 'What is the bowling strike rate of [player_name]?' -> Respond with the bowling strike rate (or 'Not Available' if unavailable).
    - 'Can you suggest a team for me?' -> Suggest a team of 11 players with the highest points, while respecting the budget, and considering points.
    - 'What is the total team points?' -> Calculate and respond with total team points without showing individual points.
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

const data = [
  {
    name: "Chamika Chandimal",
    university: "University of the Visual & Performing Arts",
    category: "Batsman",
    total_runs: 530,
    balls_faced: 588,
    innings_played: 10,
    wickets: 0,
    overs_bowled: 3,
    runs_conceded: 21,
  },
  {
    name: "Dimuth Dhananjaya",
    university: "University of the Visual & Performing Arts",
    category: "All-Rounder",
    total_runs: 250,
    balls_faced: 208,
    innings_played: 10,
    wickets: 8,
    overs_bowled: 40,
    runs_conceded: 240,
  },
  {
    name: "Avishka Mendis",
    university: "Eastern University",
    category: "All-Rounder",
    total_runs: 210,
    balls_faced: 175,
    innings_played: 7,
    wickets: 7,
    overs_bowled: 35,
    runs_conceded: 210,
  },
  {
    name: "Danushka Kumara",
    university: "University of the Visual & Performing Arts",
    category: "Batsman",
    total_runs: 780,
    balls_faced: 866,
    innings_played: 15,
    wickets: 0,
    overs_bowled: 5,
    runs_conceded: 35,
  },
  {
    name: "Praveen Vandersay",
    university: "Eastern University",
    category: "Batsman",
    total_runs: 329,
    balls_faced: 365,
    innings_played: 7,
    wickets: 0,
    overs_bowled: 3,
    runs_conceded: 24,
  },
];

// Convert the data to a JSON string and encode it to Base64
const jsonData = JSON.stringify(data);
const base64Data = Buffer.from(jsonData).toString("base64");

const question = "List down two best players in the team.";
// fetchChatbotReply(question, base64Data).then((response) => console.log(response));

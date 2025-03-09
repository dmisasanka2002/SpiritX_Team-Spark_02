# Spirit11 - Fantasy Cricket League

## Overview
Spirit11 is an inter-university fantasy cricket league platform developed for the **MoraSpirit Inter-University Cricket Tournament**. Users can create their dream teams, manage a budget, analyze player statistics, and compete for the top spot on the leaderboard. The platform features an **Admin Panel**, a **User Interface**, and an AI-powered chatbot called **Spiriter** to assist users in selecting players and providing insights.

## Project Structure
The project consists of three main folders:
- **frontend/** - User-facing fantasy league interface.
- **admin/** - Admin panel for managing players and statistics.
- **backend/** - Server-side logic, database interactions, and API endpoints.

## Features
### 1. **Admin Panel**
- Manage player data and statistics.
- CRUD operations for newly created players.
- Display overall tournament statistics:
  - Total Runs
  - Total Wickets
  - Highest Run Scorer
  - Highest Wicket Taker
- Admin-only authentication.

### 2. **User Interface**
- **User Authentication:** Sign-up with username, email and pasword and login with username and password.
- **Player Management:**
  - View all available players.
  - Select players for a team (11 players required, no duplicates in the same team).
- **Budget Tracking:**
  - Initial budget: Rs. 9,000,000.
  - Deduct player costs while selecting.
  - Refund player cost if removed from the team.
- **Leaderboard:** Displays users ranked by total team points.
- **Team Summary:** Shows selected players and total points (only after selecting 11 players).

### 3. **AI Chatbot (Spiriter)**
- Provides player details and statistics upon user query.
- Suggests the best team of 11 players based on points.
- Responds with "I don’t have enough knowledge to answer that question" for queries outside the dataset.
- Does **not** reveal individual player points.

## Technology Stack
- **Frontend:** React.js with Ant Design
- **Admin Panel:** React.js with Ant Design
- **Backend:** Node.js with Express.js
- **Database:** MongoDB Atlas
- **API Calls:** Axios for frontend-backend communication

## Installation

### Obtaining Gemini API Key
Spirit11 utilizes Google's Gemini AI for its chatbot feature. To use it, follow these steps to obtain an API key:
1. Go to [Google AI Developer Console](https://ai.google.dev/gemini-api/docs).
2. Sign in with your Google account.
3. Navigate to the **Get a Gemini API Keys** section.
4. Click **Generate API Key** and copy the key.
5. Add the following to your `.env` file in the backend directory:
   ```env
   GEMINI_API_KEY=your_generated_api_key
   ```

Ensure the key remains private and is not shared or exposed in public repositories.
### Prerequisites
- Node.js & npm installed
- MongoDB Atlas

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/dmisasanka2002/SpiritX_Team-Spark_02.git
   cd SpiritX_Team-Spark_02
   ```
2. **Install dependencies**
   ```sh
   cd backend && npm install
   cd ../frontend && npm install
   cd ../admin && npm install
   ```
3. **Configure environment variables**
   - Create a `.env` file in the backend directory and add:
     ```env
     MONGO_URI="your mongo db url here"
    JWT_SECRET="your secreate keys"
    CLIENT_URL=[Admin_URL, Frontend_URL]
    PORT=your backend port here, default 5000
    ADMIN_URL = your admin url here
    GEMINI_API_KEY = your gemini api key here
     ```

   - Create a `.env` file in both frontend, and admin directory and add:
     ```env
     VITE_API_URL=<your backend url>/api
     ```
     
4. **Start the backend**
   ```sh
   cd backend
   npm install
   npm run dev
   ```
5. **Start the frontend**
   ```sh
   cd frontend
   npm install
   npm run dev
   ```
6. **Start the admin panel**
   ```sh
   cd admin
   npm install
   npm run dev
   ```

## Usage
1. **Admin Login**
   - Manage players and tournament stats.
2. **User Signup/Login**
   - Create an account and get a Rs. 9,000,000 budget.
   - Select 11 players within the budget.
   - View leaderboard and track progress.
3. **AI Chatbot (Spiriter)**
   - Ask for player stats and best team suggestions.

## API Endpoints (Example)
| Method | Endpoint          | Description               |
|--------|------------------|---------------------------|
| POST   | /api/auth/signup | User registration        |
| POST   | /api/auth/login  | User login               |
| GET    | /api/players     | Fetch all players        |
| POST   | /api/team/add    | Add player to team       |
| GET    | /api/leaderboard | Fetch leaderboard        |
| GET    | /api/chatbot     | AI chatbot response      |

## Contribution
1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Commit changes
4. Push the branch and create a pull request

## License
This project is licensed under the MIT License.

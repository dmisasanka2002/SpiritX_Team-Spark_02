import Team from "../models/teamModel.js";
import User from "../models/userModel.js";

// Get team for a specific user
export const getUserTeam = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user and populate the team details
    const user = await User.findById(userId).populate("team");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.team) {
      return res.status(404).json({ message: "No team found for this user" });
    }

    res.status(200).json(user.team);
  } catch (error) {
    console.error("Error fetching team:", error);
    res.status(500).json({ message: "Server error" });
  }
};

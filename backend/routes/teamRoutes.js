import express from "express";
import { getUserTeam } from "../controllers/teamController.js";
import { protect } from "../middleware/authMiddleware.js"; // Middleware for authentication

const router = express.Router();

// Get the team of a specific user (Protected Route)
router.get("/:userId", protect, getUserTeam);

export default router;

import express from 'express';
import { 
  createPlayer, 
  getAllPlayers, 
  getPlayerById, 
  updatePlayer, 
  deletePlayer 
} from '../controllers/playerController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for player operations
router.get('/', getAllPlayers); // Public
router.get('/:id', getPlayerById); // Public

router.post('/add', protect, admin, createPlayer); // Only Admins can create players
router.put('/update/:id', protect, admin, updatePlayer); // Only Admins can update
router.delete('/delete/:id', protect, admin, deletePlayer); // Only Admins can delete

export default router;

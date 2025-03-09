import Player from '../models/playerModel.js';
import { calculatePlayerPoints, valueInRupees } from '../utils/playerUtils.js';

// Create a new player (Admin Only)
export const createPlayer = async (req, res) => {
    // console.log(req.body)
    try {
      const points = await calculatePlayerPoints(req.body);
      const valuePrice = await valueInRupees(points);

      console.log(points, valuePrice)

      console.log('Creating player...');
      const playerData = {
        ...req.body,
        points: points,
        valuePrice: valuePrice
      };

      const player = new Player(playerData);
      console.log(player)
      const result = await player.save();
      console.log(result)
  
      console.log('Player created, sending response...');
      return res.status(201);
    } catch (error) {
      console.log('Error occurred, sending error response...');
      return res.status(400).json({ error: error.message });
    }
  };
  

// Update a player (Admin Only)
export const updatePlayer = async (req, res) => {
    try {
      const points = await calculatePlayerPoints(req.body);
      const valuePrice = await valueInRupees(points);
      req.body.points = points;
      req.body.valuePrice = valuePrice;

      const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!player) {
        return res.status(404).json({ message: 'Player not found' });
      }
      res.status(200).json(player);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete a player (Admin Only)
  export const deletePlayer = async (req, res) => {
    try {
      const player = await Player.findByIdAndDelete(req.params.id);
      if (!player) {
        return res.status(404).json({ message: 'Player not found' });
      }
      res.status(200).json({ message: 'Player deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
// Get all players (Anyone can access)
export const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single player by ID (Anyone can access)
export const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

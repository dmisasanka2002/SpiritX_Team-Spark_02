import mongoose from 'mongoose';

// Define the Player Schema
const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Batsman', 'All-Rounder', 'Bowler'], // Assuming categories are limited to these types
  },
  totalRuns: {
    type: Number,
    required: true,
  },
  ballsFaced: {
    type: Number,
    required: true,
  },
  inningsPlayed: {
    type: Number,
    required: true,
  },
  wickets: {
    type: Number,
    default: 0, // Default value if not provided
  },
  oversBowled: {
    type: Number,
    default: 0, // Default value if not provided
  },
  runsConceded: {
    type: Number,
    default: 0, // Default value if not provided
  },
  points: {
    type: Number,
    required: true,
    default: 0, // Default value if not provided
  },
  valuePrice: {
    type: Number,
    required: true,
    default: 0, // Default value if not provided
  },
});

// Create the Mongoose model from the schema
const Player = mongoose.model('Player', playerSchema);

// Export the Player model
export default Player;

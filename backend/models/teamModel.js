import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player", // Assuming you have a Player schema
    },
  ],
}, { timestamps: true });

export default mongoose.model("Team", TeamSchema);

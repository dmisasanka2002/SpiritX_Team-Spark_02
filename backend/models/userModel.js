

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import Team from "./teamModel.js";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 8,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    avatar: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team", // Reference to another schema
      default: null, // Only assigned when `isAdmin` is false
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// After saving a new user, create a referenced document if `isAdmin` is false
UserSchema.post("save", async function (doc, next) {
  if (!doc.isAdmin && !doc.team) {
    try {
      // Create a new team/profile document
      const newTeam = await Team.create({ user: doc._id, players: [] });

      // Update the user document with the reference
      doc.team = newTeam._id;
      await doc.save();
    } catch (error) {
      console.error("Error creating linked document:", error);
    }
  }
  next();
});

// Match Password for Login
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", UserSchema);

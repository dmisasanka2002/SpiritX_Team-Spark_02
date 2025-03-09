import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

import User from "../models/userModel.js"; // Assuming you have a user model

export const protect = async (req, res, next) => {
  let token;

 
    // Extract token from cookies
    if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user to the request object (excluding the password)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Allow the request to proceed to the next middleware/route handler
    } catch (error) {
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
};

// Middleware for admin access only
export const admin = (req, res, next) => {
  next() // Remove this line to enable admin access only
  
  // if (req.user && req.user.isAdmin) {
  //   next(); // If user is an admin, allow the request to proceed
  // } else {
  //   res.status(403).json({ message: "Access denied. Admins only." });
  // }
};

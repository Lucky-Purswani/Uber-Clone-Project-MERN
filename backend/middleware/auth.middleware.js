const user = require("../models/user.model");
const jwt = require("jsonwebtoken");
const BlackListing = require("../models/blackListing.model");
const captainModel = require("../models/captain.model");

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    const blackListedToken = await BlackListing.findOne({ token: token });
    if (blackListedToken) {
        return res.status(401).json({ message: "Token is blacklisted" });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const userExists = await user.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = userExists; // Attach user to request object
        return next(); // Proceed to the next middleware or route handler
    }catch{
        return res.status(401).json({ message: "Unauthorized access" });
    }
}

const captainAuthMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    } 

    const blackListedToken = await BlackListing.findOne({ token: token });
    if (blackListedToken) {
        return res.status(401).json({ message: "Token is blacklisted" });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const captainExists = await captainModel.findById(userId);
        if (!captainExists) {
            return res.status(404).json({ message: "Captain not found" });
        }
        req.captain = captainExists; // Attach captain to request object
        return next(); // Proceed to the next middleware or route handler
    }catch{
        return res.status(401).json({ message: "Unauthorized access" });
    }

}

const optionalAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      // Invalid token, ignore and proceed unauthenticated
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
}

module.exports = {
    authMiddleware,
    captainAuthMiddleware,
    optionalAuthMiddleware
};
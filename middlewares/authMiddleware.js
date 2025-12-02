const jwt = require("jsonwebtoken");

module.exports = {
  // Verify User Login
  verifyToken: (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  },

  // Only Admin Can Access
  isAdmin: (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }
    next();
  }
};

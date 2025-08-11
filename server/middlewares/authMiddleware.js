const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });

    // 3. Attach decoded user to request object
    req.user = decodedUser; // now any route can access req.user
    next();
  });
};

module.exports = authMiddleware;

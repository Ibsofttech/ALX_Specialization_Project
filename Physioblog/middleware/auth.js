const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use JWT_SECRET from .env
    req.user = decoded; // Attach the decoded payload to the request object
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};

module.exports = auth;

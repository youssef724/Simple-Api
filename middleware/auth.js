const jwt = require("jsonwebtoken");

const VerifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json("Token Required");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (err) {
    res.status(401).json("Invalid Token");
  }
};

module.exports = VerifyToken;

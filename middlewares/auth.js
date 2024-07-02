const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(403).json({ error: "No token provided" });

  jwt.verify(token, "secret", (err, decoded) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Failed to authenticate token", message: err });

    req.userId = decoded.userId;
    next();
  });
};

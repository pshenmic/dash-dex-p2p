const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "default";

module.exports = (req, res, next) => {
  
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    ResponseErrorHandler(res, 400, "Not allowed to access this route")
  }
  
  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, secret);
  } catch (err) {
    ResponseErrorHandler(res, 401, "Not allowed to access this route")
  }

  req.userId = decodedToken.userId;
  return next();
};

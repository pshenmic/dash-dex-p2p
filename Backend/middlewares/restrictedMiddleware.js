const jwt = require("jsonwebtoken");
const { responseErrorHandler } = require("../errorsHandler/responseErrorHandler");
const { findByUsername } = require("../users/usersModels");

const secret = process.env.JWT_SECRET || "default";

module.exports = (req, res, next) => {

  try {

    const authHeader = req.get("Authorization");

    if (!authHeader) {
      responseErrorHandler(res, 400, "Not allowed to access this route")
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;

    decodedToken = jwt.verify(token, secret);

    findByUsername(decodedToken.username).then(users => {

      if (users.length > 0) {

        if (users[0]?.isBlocked) {

          return responseErrorHandler(res, 403, "Your Account has been Suspended")

        } else {
          req.userId = decodedToken.userId;
          return next();
        }
      } else {
        return responseErrorHandler(res, 401, "Not allowed to access this route")
      }
    })
  } catch (err) {
    responseErrorHandler(res, 401, "Not allowed to access this route")
  }
};

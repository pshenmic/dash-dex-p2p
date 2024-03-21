const jwt = require("jsonwebtoken");
const { ResponseErrorHandler } = require("../ErrorsHandler/responseErrorHandler");
const { findByUsername } = require("../users/usersModels");

const secret = process.env.JWT_SECRET || "default";

module.exports = (req, res, next) => {

  try {

    const authHeader = req.get("Authorization");

    if (!authHeader) {
      ResponseErrorHandler(res, 400, "Not allowed to access this route")
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;

    decodedToken = jwt.verify(token, secret);

    findByUsername(decodedToken.username).then(users => {

      if (users.length > 0) {

        if (users[0]?.isBlocked) {

          return ResponseErrorHandler(res, 403, "Your Account has been Suspended")

        } else {
          req.userId = decodedToken.userId;
          return next();
        }
      } else {
        return ResponseErrorHandler(res, 401, "Not allowed to access this route")
      }
    })
  } catch (err) {
    ResponseErrorHandler(res, 401, "Not allowed to access this route")
  }
};

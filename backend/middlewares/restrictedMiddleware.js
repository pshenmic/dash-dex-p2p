const { findByUsername } = require("../users/usersModels");


module.exports = (req, res, next) => {

  try {

    if (!req.session.user) {
      return responseErrorHandler(res, 400, "Not allowed to access this route")
    }

    findByUsername(req.session.user.username).then(users => {

      if (users.length > 0) {

        if (users[0]?.isBlocked) {
          return responseErrorHandler(res, 403, "Your Account has been Suspended")

        } else {
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

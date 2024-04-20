const CustomError = require("../errors/CustomError");
const { findByUsername } = require("../users/usersModels");


module.exports = (req, res, next) => {

  try {

    if (!req.session.user) {
      throw new CustomError("User not found", 404)
    }

    findByUsername(req.session.user.username).then(users => {

      if (users.length > 0) {

        if (users[0]?.isBlocked) {
          throw new CustomError("Your Account has been suspended", 403)
        } else {
          return next();
        }
      } else {
        throw new CustomError("User not found", 404)
      }
    })
  } catch (err) {
    throw new CustomError("Could not find user", 500)
  }
};

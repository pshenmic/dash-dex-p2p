const ForbiddenRequest = require("../errors/forbidden.error");
const InvalidInput = require("../errors/invalid.input");
const NotFoundError = require("../errors/not.found.error");
const { findByUsername } = require("../users/usersModels");


module.exports = (req, res, next) => {
    if (!req.session.user) {
      throw new InvalidInput("Unauthorized User")
    }

    findByUsername(req.session.user.username).then(users => {

      if (users.length > 0) {

        if (users[0]?.isBlocked) {
          throw new ForbiddenRequest("Your Account has been suspended")
        } else {
          return next();
        }
      } else {
        throw new NotFoundError("User not found")
      }
    })
};

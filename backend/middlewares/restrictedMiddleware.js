const NotFoundError = require("../errors/not.found.error");
const { findByUsername } = require("../users/usersModels");


module.exports = (req, res, next) => {

  try {

    if (!req.session.user) {
      throw new NotFoundError()
    }

    findByUsername(req.session.user.username).then(users => {

      if (users.length > 0) {

        if (users[0]?.isBlocked) {
          throw new NotFoundError()
        } else {
          return next();
        }
      } else {
        throw new NotFoundError()
      }
    })
  } catch (err) {
    throw new NotFoundError()
  }
};

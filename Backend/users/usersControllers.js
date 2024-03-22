const bcrypt = require("bcryptjs");
const User = require("./usersModels");
const { responseErrorHandler } = require("../errorsHandler/responseErrorHandler");

module.exports.signup = async (req, res) => {
  
  const { email, username, password } = req.body;

  const existingUser = await User.findExistingUser(username,email);

  if (existingUser.length !== 0) {
    return responseErrorHandler(res, 409, "User with provided email or username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.createUser({
    email,
    username,
    password: hashedPassword
  });

  res.status(201).json({
    message: "User created",
    sessionID: req.sessionID,
    user: newUser,
  });

};

module.exports.login = async (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    responseErrorHandler(res, 400, "Oops, username and password is required for login.")
  }

  const user = await User.findBy({ username });

  if (user && bcrypt.compare(password, user.password)) {

    if (user.isBlocked) {
      return res.status(403).json({
        message: "Your Account has been Suspended!",
        sucess: false
      })
    } else {
      req.session.user = user
      return res.status(200).json({
        sessionID: req.sessionID,
        userId: user.id,
        username: user.username,
      });
    }
  }

  responseErrorHandler(res, 401, "Oops, username or password is incorrect")
};

// just for auth user testing It will be removed 
module.exports.checkUser = async (req, res) => {
  return res.status(200).json({
    message: 'success'
  })

}
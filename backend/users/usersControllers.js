const bcrypt = require("bcryptjs");
const User = require("./usersModels");
const { userModel } = require("./usersHelper");
const CustomError = require("../errors/CustomError");

module.exports.signup = async (req, res, next) => {
  
  const { email, username, password } = userModel.fromJSON(req.body);

  const existingUser = await User.findExistingUser(username,email);

  if (existingUser.length !== 0) {
    throw new CustomError("User with provided email or username already exists!", 409)
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

  const { username, password } = userModel.fromJSON(req.body);

  if (!username || !password) {
    throw new CustomError('Oops, username and password is required for login.', 400)
  }

  const user = await User.findBy({ username });

  if (user && bcrypt.compare(password, user.password)) {

    if (user.isBlocked) {
     throw new CustomError("Your Account has been suspended", 403)
    } else {
      req.session.user = user
      return res.status(200).json({
        sessionID: req.sessionID,
        userId: user.id,
        username: user.username,
      });
    }
  }

  throw new CustomError("Something went wrong", 400)
};

// just for auth user testing It will be removed 
module.exports.checkUser = async (req, res) => {
  return res.status(200).json({
    message: 'success'
  })

}
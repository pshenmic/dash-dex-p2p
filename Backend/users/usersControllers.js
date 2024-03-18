const bcrypt = require("bcryptjs");
const User = require("./usersModels");
const { generateToken } = require("./usersHelper");
const { ResponseErrorHandler } = require("../ErrorsHandler/ResponseErrorHandler");
const { tryCatchHandler } = require("../ErrorsHandler/TryCatchHandler");

module.exports.signup = async (req, res) => {
  const tryFn = async () => {

    const { email, username, password, isBlock } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const credentials = {
      username,
      email,
      password: hashedPassword
    };

    const emailExist = await User.findBy({
      email: credentials.email,
    });

    const usernameExist = await User.findBy({
      username: credentials.username,
    });

    if (emailExist || usernameExist) {

      if (emailExist)
        ResponseErrorHandler(res, 409, "invalid credentials")

      else
        ResponseErrorHandler(res, 409, "invalid credentials")

    } else {
      const [newUser] = await User.createUser(credentials);

      res.status(201).json({
        message: "User created",
        token: generateToken(newUser.email, newUser.id),
        user: newUser,
      });

    }
  }
  return tryCatchHandler(tryFn)
};

module.exports.login = async (req, res) => {

  const tryFn = async () => {
    const { username, password } = req.body;

    if (!username || !password) {
      ResponseErrorHandler(res, 400, "Oops, username and password is required for login.")
    }

    const user = await User.findBy({ username });

    if (user && bcrypt.compare(password, user.password)) {
      req.session.user = user

      if (user.isBlocked) {
        return res.status(403).json({
          message: "Your Account has been Suspended!",
          sucess: false
        })
      } else {
        return res.status(200).json({
          token: generateToken(user.username, user.id),
          userId: user.id,
          username: user.username,
        });
      }
    }

    ResponseErrorHandler(res, 401, "Oops, username or password is incorrect")
  }

  return tryCatchHandler(tryFn)
};

module.exports.checkUser = async (req, res) => {
    return res.status(200).json({
      message:'success'
    })

}
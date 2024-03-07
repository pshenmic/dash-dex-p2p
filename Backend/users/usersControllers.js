const bcrypt = require("bcryptjs");
const User = require("./usersModels");
const { generateToken } = require("./usersHelper");

module.exports.signup = async (req, res) => {
  try {

    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const credentials = {
      username,
      email,
      password: hashedPassword,
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

  } catch (error) {
    ResponseErrorHandler(res, 500, "Oops, something went wrong while registering")
  }
};

module.exports.login = async (req, res) => {

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      ResponseErrorHandler(res, 400, "Oops, username and password is required for login.")
    }

    const user = await User.findBy({ username });

    if (user && bcrypt.compare(password, user.password)) {
      return res.status(200).json({
        token: generateToken(user.username, user.id),
        userId: user.id,
        username: user.username,
      });
    }

    ResponseErrorHandler(res, 401, "Oops, username or password is incorrect")

  } catch (err) {
    ResponseErrorHandler(res, 500, "Oops, something went wrong while loging in")
  }
};
